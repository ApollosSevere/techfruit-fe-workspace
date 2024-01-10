"use client";
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

  const token = window.localStorage.getItem(TOKEN);

  const [validateToken] = useValidateTokenMutation();

  // TODO: make into a mutation so that it is not ran in no token is there
  useGetAllCategoriesQuery({}, { refetchOnMountOrArgChange: true });

  useLayoutEffect(() => {
    if (token && !accessToken) {
      const fetchData = async () => {
        try {
          const payload = await validateToken(token).unwrap();
          console.log("fulfilled", payload);
        } catch (error) {
          window.localStorage.removeItem(TOKEN);
          console.error("rejected", error);
          router.push("/sign-in");
        }
      };
      fetchData();
      console.log("On Right");
      // if (!isSuccess && !["/sign-in", "/sign-up"].includes(pathname)) {
      //   // window.localStorage.removeItem(TOKEN);
      //   // redirect("/sign-in");
      // }
    } else if (
      !token &&
      !["/sign-in", "/sign-up"].includes(pathname) &&
      !accessToken
    ) {
      redirect("/sign-in");
    }
  }, [accessToken, pathname, router, token, validateToken]);

  return <>{children}</>;
}
