// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { CourseProgress } from "@/components/course-progress";

import { CourseSidebarItem } from "./course-sidebar-item";
import { string } from "zod";
import { Key } from "react";
import { Course } from "@/redux/courses/slice/types";

interface CourseSidebarProps {
  course: Course;
  progressCount: number;
}

export const CourseSidebar = ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  // const { userId } = auth();

  // if (!userId) {
  //   return redirect("/");
  // }

  const purchase = {
    id: "string",
    userId: "string",
    courseId: "string",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      {/* sidebar */}
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map(
          // TODO: change this type
          (chapter: {
            id: string;
            title: string;
            userProgress: { isCompleted: any }[];
            isFree: any;
          }) => (
            <CourseSidebarItem
              key={chapter.id}
              id={chapter.id}
              label={chapter.title}
              isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
              courseId={course.id}
              isLocked={!chapter.isFree && !purchase}
            />
          )
        )}
      </div>
    </div>
  );
};
