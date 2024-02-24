import "./globals.css";
import { TOKEN } from "@/redux/auth/slice";
import { useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { selectAccessToken } from "@/redux/auth/selector";
import { useValidateTokenMutation } from "@/redux/authService/authServiceEndpoints";
import { useAppSelector } from "@/redux/utils/hooks";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function Children({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduxToken = useAppSelector(selectAccessToken);
  const [showLogin, setShowLogin] = useState<boolean>(true);

  const [validateToken] = useValidateTokenMutation();

  useLayoutEffect(() => {
    const localStorageToken = window.localStorage.getItem(TOKEN);

    setShowLogin(
      !localStorageToken &&
        !reduxToken &&
        !["/sign-in", "/sign-up"].includes(pathname)
    );

    const redirectToSignIn = () => {
      window.localStorage.removeItem(TOKEN);
      router.push("/sign-in");
    };

    const checkToken = async () => {
      if (localStorageToken && !reduxToken) {
        try {
          await validateToken(localStorageToken).unwrap();
        } catch (error) {
          redirectToSignIn();
          console.error("rejected", error);
        }
      } else if (showLogin) {
        redirectToSignIn();
      }
    };

    checkToken();
  }, [reduxToken, pathname, router, validateToken, showLogin]);

  return <>{showLogin ? <LoadingSpinner /> : children}</>;
}
