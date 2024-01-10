import "./globals.css";
import { Inter } from "next/font/google";
import { TOKEN } from "@/redux/auth/slice";
import { redirect } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { selectAccessToken } from "@/redux/auth/selector";
import { useValidateTokenMutation } from "@/redux/authService/authServiceEndpoints";
import { useAppSelector } from "@/redux/utils/hooks";
import { useGetAllCategoriesQuery } from "@/redux/courses/service/courseServiceEndpoints";
import { useRouter } from "next/navigation";

export default function Children({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = useAppSelector(selectAccessToken);

  const [validateToken] = useValidateTokenMutation();

  // TODO: make into a mutation so that it is not ran in no token is there
  // useGetAllCategoriesQuery({}, { refetchOnMountOrArgChange: true });

  useLayoutEffect(() => {
    const token = window.localStorage.getItem(TOKEN);

    const redirectToSignIn = () => {
      window.localStorage.removeItem(TOKEN);
      router.push("/sign-in");
    };

    const checkToken = async () => {
      try {
        if (token && !accessToken) {
          const payload = await validateToken(token).unwrap();
        } else if (
          !token &&
          !["/sign-in", "/sign-up"].includes(pathname) &&
          !accessToken
        ) {
          redirectToSignIn();
        }
      } catch (error) {
        redirectToSignIn();
        console.error("rejected", error);
      }
    };

    checkToken();
  }, [accessToken, pathname, router, validateToken]);

  return <>{children}</>;
}
