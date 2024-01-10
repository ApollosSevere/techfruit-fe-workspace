"use client";

// import { auth } from "@clerk/nextjs";
import { redirect, usePathname } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";

import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { selectAccessToken, selectUserId } from "@/redux/auth/selector";
import { useAppSelector } from "@/redux/utils/hooks";
import { useGetDashboardCoursesQuery } from "@/redux/courses/service/courseServiceEndpoints";
import { selectDashboardData } from "@/redux/courses/slice/selector";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { TOKEN } from "@/redux/auth/slice";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useValidateTokenMutation } from "@/redux/authService/authServiceEndpoints";

export default function Dashboard() {
  const userId = useAppSelector(selectUserId);
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = useAppSelector(selectAccessToken);
  const [validateToken] = useValidateTokenMutation();

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

  const { isLoading } = useGetDashboardCoursesQuery(userId, {
    refetchOnMountOrArgChange: true,
  });

  const { completedCourses, coursesInProgress } =
    useAppSelector(selectDashboardData);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
          isLoading={isLoading}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
          isLoading={isLoading}
        />
      </div>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <CoursesList items={[...coursesInProgress, ...completedCourses]} />
      )}
    </div>
  );
}
