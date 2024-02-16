"use client";

import { CheckCircle, Clock } from "lucide-react";
import { CoursesList } from "@/components/courses-list";
import { InfoCard } from "./_components/info-card";
import { selectUserId } from "@/redux/auth/selector";
import { useAppSelector } from "@/redux/utils/hooks";
import { selectDashboardData } from "@/redux/courses/slice/selector";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { useGetDashboardCoursesQuery } from "@/redux/courses/service/courseServiceEndpoints";

export default function Dashboard() {
  const userId = useAppSelector(selectUserId);

  const { isLoading } = useGetDashboardCoursesQuery(userId);

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
