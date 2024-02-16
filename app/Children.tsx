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
  const accessToken = useAppSelector(selectAccessToken);
  const [showLogin, setShowLogin] = useState<boolean>(true);

  const [validateToken, { isSuccess }] = useValidateTokenMutation();

  useLayoutEffect(() => {
    const token = window.localStorage.getItem(TOKEN);

    setShowLogin(
      !token && !accessToken && !["/sign-in", "/sign-up"].includes(pathname)
    );

    const redirectToSignIn = () => {
      window.localStorage.removeItem(TOKEN);
      router.push("/sign-in");
    };

    const checkToken = async () => {
      try {
        if (token && !accessToken) {
          await validateToken(token);
        } else if (showLogin) {
          redirectToSignIn();
        }
      } catch (error) {
        redirectToSignIn();
        console.error("rejected", error);
      }
    };

    checkToken();
  }, [accessToken, pathname, router, validateToken]);

  return <>{showLogin ? <LoadingSpinner /> : children}</>;
}
