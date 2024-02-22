"use client";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { useGetAllCoursesQuery } from "@/redux/courses/service/courseServiceEndpoints";
import { useAppSelector } from "@/redux/utils/hooks";
import { selectUserId } from "@/redux/auth/selector";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Course } from "@/redux/courses/slice/types";

const CoursesPage = () => {
  const userId = useAppSelector(selectUserId);
  const { isLoading, data } = useGetAllCoursesQuery(userId);

  const courses: Course[] = data;

  return (
    <div className="p-6">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable columns={columns} data={courses} />
      )}
    </div>
  );
};

export default CoursesPage;
