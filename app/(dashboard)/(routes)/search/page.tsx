"use client";

// import { auth } from "@clerk/nextjs";
// import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import {
  CoursesList,
  CourseWithProgressWithCategory,
} from "@/components/courses-list";

import { Categories } from "./_components/categories";
import {
  useGetAllCategoriesQuery,
  useGetAllCoursesQuery,
  useGetPublishedCoursesQuery,
} from "@/redux/courses/service/courseServiceEndpoints";
import { useAppSelector } from "@/redux/utils/hooks";
import { selectUserId } from "@/redux/auth/selector";
import {
  addProgress,
  selectAllCategories,
} from "@/redux/courses/slice/selector";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { Course } from "@/redux/courses/slice/types";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const userId = useAppSelector(selectUserId);
  const categories = useAppSelector(selectAllCategories);
  // This probably can populate the other jawn
  const { isLoading, data, refetch } = useGetPublishedCoursesQuery(
    { title: searchParams.title, categoryId: searchParams.categoryId },
    { refetchOnMountOrArgChange: true } // TODO: figure out what this means
  );

  const { isLoading: isCategoriesLoading } = useGetAllCategoriesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const courses: Course[] = addProgress(data, userId?.toString());

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block ">
        <SearchInput />
      </div>
      <div className="p-6 pl-20 pr-20 space-y-4 transition-all">
        {isCategoriesLoading ? (
          <div className=" transition-all h-10  mb-12 bg-slate-100 rounded-lg animate-pulse"></div>
        ) : (
          <Categories items={categories} />
        )}
        {isLoading ? <SkeletonLoader /> : <CoursesList items={courses} />}
      </div>
    </>
  );
};

export default SearchPage;
