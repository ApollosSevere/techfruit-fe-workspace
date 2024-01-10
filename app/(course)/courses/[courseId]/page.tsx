"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import { db } from "@/lib/db";
import { selectUserId } from "@/redux/auth/selector";
import {
  useFindCourseByPublishedChaptersQuery,
  useFindCourseByPublishedChaptersAndUserIdQuery,
} from "@/redux/courses/service/courseServiceEndpoints";
import { useAppSelector } from "@/redux/utils/hooks";
import { redirect } from "next/navigation";

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  // With redux, load the full thing here!

  // const { isLoading, data, refetch } = useFindCourseByPublishedChaptersQuery(
  //   params.courseId
  // );

  // const course = data;
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

  // This component is here just to check if the jawn actually here
  // const course = await db.course.findUnique({
  //   where: {
  //     id: params.courseId,
  //   },
  //   include: {
  //     chapters: {
  //       where: {
  //         isPublished: true,
  //       },
  //       orderBy: {
  //         position: "asc",
  //       },
  //     },
  //   },
  // });

  // if (!isLoading && !course) {
  //   return redirect("/");
  // }

  // console.log("ONNNNN MEEEEEEEEEE");

  // return <>here {JSON.stringify(course)}</>;

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    redirect(`/courses/${course?.id}/chapters/${course?.chapters[0].id}`)
  );
};

export default CourseIdPage;
