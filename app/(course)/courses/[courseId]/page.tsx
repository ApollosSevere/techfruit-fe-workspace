"use client";
import { redirect } from "next/navigation";
import { selectUserId } from "@/redux/auth/selector";
import { useAppSelector } from "@/redux/utils/hooks";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useFindCourseByPublishedChaptersAndUserIdQuery } from "@/redux/courses/service/courseServiceEndpoints";

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  const userId = useAppSelector(selectUserId);

  const { isLoading, data: course } =
    useFindCourseByPublishedChaptersAndUserIdQuery({
      courseId: params.courseId,
      userId,
    });

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    redirect(`/courses/${course?.id}/chapters/${course?.chapters[0].id}`)
  );
};

export default CourseIdPage;
