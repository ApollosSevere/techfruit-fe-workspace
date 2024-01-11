"use client";

import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import {
  useFindCourseByPublishedChaptersQuery,
  useGetCourseWithChaptersAndUserProgressQuery,
  useFindCourseByPublishedChaptersAndUserIdQuery,
} from "@/redux/courses/service/courseServiceEndpoints";
import { selectAllCourseData } from "@/redux/courses/slice/selector";
import { useAppSelector } from "@/redux/utils/hooks";
import { selectUserId } from "@/redux/auth/selector";
import { LoadingSpinner } from "@/components/loading-spinner";

const CourseLayout = ({
  children,
  // isLoading,
  params,
}: {
  children: React.ReactNode;
  // isLoading: boolean;
  params: { courseId: string };
}) => {
  // const { userId } = auth();

  // if (!userId) {
  //   return redirect("/");
  // }

  // const course = await db.course.findUnique({
  //   where: {
  //     id: params.courseId,
  //   },
  //   include: {
  //     chapters: {
  //       where: {
  //         isPublished: true,
  //       },
  //       include: {
  //         // Just give me progress from signed in user!
  //         userProgress: {
  //           where: {
  //             userId,
  //           },
  //         },
  //       },
  //       orderBy: {
  //         position: "asc",
  //       },
  //     },
  //   },
  // });

  // const { isLoading, data, refetch } =
  //   useGetCourseWithChaptersAndUserProgressQuery(
  //     { courseId: params.courseId, userId: "1" },
  //     { refetchOnMountOrArgChange: true } // TODO: figure out what this means
  //   );

  // const course = data;

  // const { isLoading, data, refetch } =
  //   useFindCourseByPublishedChaptersAndUserIdQuery({
  //     courseId: params.courseId,
  //     userId: "1",
  //   });

  // const course = data;

  // if (!isLoading && !course) {
  //   return redirect("/");
  // }

  // const course = useAppSelector(selectAllCourseData);
  const userId = useAppSelector(selectUserId);

  const { isLoading, data, refetch } =
    useFindCourseByPublishedChaptersAndUserIdQuery(
      {
        courseId: params.courseId,
        userId,
      },
      { refetchOnMountOrArgChange: true }
    );

  const course = data;

  // const progressCount = getProgress("1", course.id);
  const progressCount = 50;

  // console.log(course, "Hyyyyy");

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
