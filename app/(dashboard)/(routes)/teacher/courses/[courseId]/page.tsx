"use client";
// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Actions } from "./_components/actions";
import { useGetCourseDetailsQuery } from "@/redux/courses/service/courseServiceEndpoints";

import { useAppSelector } from "@/redux/utils/hooks";
import {
  selectAllCategories,
  selectAllCourseData,
} from "@/redux/courses/slice/selector";
import { LoadingSpinner } from "@/components/loading-spinner";

// interface Course {
//   id: string;
//   userId: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   price: null;
//   isPublished: null;
//   categoryId: null;
//   category: null;
//   chapters: null;
//   attachments: null;
//   purchases: null;
//   createdAt: null;
//   updatedAt: null;
// }

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  // const {
  //   isLoading,
  //   data: course,
  //   refetch,
  // } = useGetAllCoursesQuery(
  //   {},
  //   { refetchOnMountOrArgChange: true } // TODO: figure out what this means
  // );

  // TODO: add this back in
  // const categories = await db.category.findMany({
  //   orderBy: {
  //     name: "asc",
  //   },
  // });

  // const yo = auth();
  // console.log(yo);

  const { isLoading } = useGetCourseDetailsQuery(params.courseId);
  const course = useAppSelector(selectAllCourseData);
  const categories = useAppSelector(selectAllCategories);
  // const auth = getAuth();

  // console.log(auth);
  // console.log(course);

  // const course: Course & { chapters: Chapter[]; attachments: Attachment[] } =
  //   data;

  // if (!userId) {
  //   return redirect("/");
  // }

  // const course = await db.course.findUnique({
  //   where: {
  //     id: params.courseId,
  //     userId,
  //   },
  //   include: {
  //     chapters: {
  //       orderBy: {
  //         position: "asc",
  //       },
  //     },
  //     attachments: {
  //       orderBy: {
  //         createdAt: "desc",
  //       },
  //     },
  //   },
  // });
  // if (!course) {
  //   return redirect("/");
  // }
  // console.log(course);

  if (!isLoading && !course) {
    return redirect("/");
  }

  const requiredFields = [
    course?.title,
    course?.description,
    course?.imageUrl,
    course?.price,
    course?.categoryId,
    (course?.chapters || []).some(
      (chapter: { isPublished: any }) => chapter.isPublished
    ),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {!course?.isPublished && (
            <Banner label="This course is unpublished. It will not be visible to the students." />
          )}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Course setup</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <Actions
                disabled={!isComplete}
                courseId={params.courseId}
                isPublished={course?.isPublished || false}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} />
                  <h2 className="text-xl">Customize your course</h2>
                </div>
                <TitleForm initialData={course} courseId={course.id} />
                <DescriptionForm
                  initialData={course}
                  courseId={course.id || params.courseId}
                />
                <ImageForm
                  initialData={course}
                  courseId={course.id || params.courseId}
                />
                <CategoryForm
                  initialData={course}
                  courseId={course.id}
                  options={categories.map((category) => ({
                    label: category.name,
                    value: category.id,
                  }))}
                  // options={[
                  //   {
                  //     label: "First",
                  //     value: "1",
                  //   },
                  //   {
                  //     label: "Second",
                  //     value: "2",
                  //   },
                  //   {
                  //     label: "Third",
                  //     value: "3",
                  //   },
                  //   {
                  //     label: "Fourth",
                  //     value: "4",
                  //   },
                  // ]}
                />
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-x-2">
                    <IconBadge icon={ListChecks} />
                    <h2 className="text-xl">Course chapters</h2>
                  </div>
                  <ChaptersForm initialData={course} courseId={course.id} />
                </div>
                <div>
                  <div className="flex items-center gap-x-2">
                    <IconBadge icon={CircleDollarSign} />
                    <h2 className="text-xl">Sell your course</h2>
                  </div>
                  <PriceForm initialData={course} courseId={course.id} />
                </div>
                <div>
                  <div className="flex items-center gap-x-2">
                    <IconBadge icon={File} />
                    <h2 className="text-xl">Resources & Attachments</h2>
                  </div>
                  <AttachmentForm initialData={course} courseId={course.id} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseIdPage;
