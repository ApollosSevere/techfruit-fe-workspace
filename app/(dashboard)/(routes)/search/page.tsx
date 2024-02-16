"use client";

import { SearchInput } from "@/components/search-input";
import { CoursesList } from "@/components/courses-list";

import { Categories } from "./_components/categories";
import {
  useGetAllCategoriesQuery,
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
import { useMemo } from "react";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const userId = useAppSelector(selectUserId);
  const categories = useAppSelector(selectAllCategories);
  const { isLoading: isCategoriesLoading } = useGetAllCategoriesQuery({});

  const { isLoading, data } = useGetPublishedCoursesQuery({
    title: searchParams.title,
    categoryId: searchParams.categoryId,
  });

  const courses: Course[] = useMemo(
    () => addProgress(data, userId?.toString()),
    [data, userId]
  );

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
