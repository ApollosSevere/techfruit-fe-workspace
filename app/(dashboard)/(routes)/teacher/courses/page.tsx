"use client";

// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { useGetAllCoursesQuery } from "@/redux/courses/service/courseServiceEndpoints";
import { useAppSelector } from "@/redux/utils/hooks";
import { selectUserId } from "@/redux/auth/selector";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Course } from "@/redux/courses/slice/types";

const CoursesPage = () => {
  // TODO: This query has to be user specific!
  const userId = useAppSelector(selectUserId);
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    userId,
    { refetchOnMountOrArgChange: true } // TODO: figure out what this means
  );

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
