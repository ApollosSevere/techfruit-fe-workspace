"use client";

import { useAppSelector } from "@/redux/utils/hooks";
import { selectUserId } from "@/redux/auth/selector";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import { addProgress } from "@/redux/courses/slice/selector";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useFindCourseByPublishedChaptersAndUserIdQuery } from "@/redux/courses/service/courseServiceEndpoints";

const CourseLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const userId = useAppSelector(selectUserId);

  const { isLoading, data } = useFindCourseByPublishedChaptersAndUserIdQuery({
    courseId: params.courseId,
    userId,
  });

  const course = addProgress([data], userId)[0];
  const progressCount = course?.progress || 0;

  return (
    <>
      {isLoading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <div className="h-full">
            <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
              <CourseNavbar course={course} progressCount={progressCount} />
            </div>
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
              <CourseSidebar course={course} progressCount={progressCount} />
            </div>
            <main className="md:pl-80 pt-[80px] h-full">{children}</main>
          </div>
        </>
      )}
    </>
  );
};

export default CourseLayout;
