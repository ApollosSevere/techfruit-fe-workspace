import { RootState } from "@/redux/store";
import { createSelector } from "@reduxjs/toolkit";
import { Chapter, Course, Purchase, UserProgress } from "./types";

const getUserId = (state: RootState) => state.auth.uuid;
const getDashboardCourses = (state: RootState) => state.course.dashboardCourses;

export const selectAllCourseData = (state: RootState) => state.course.currentCourse;
export const selectAllCategories = (state: RootState) => state.course.categories;

export const selectChapterData = (state: RootState) => state.course.currentCourse?.chapters;
export const selectAnalytics = (state: RootState) => {
   const result = state.course.analyticsCalculation;

  const formattedData = Object.entries(result.data).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));

  return {...result, data: formattedData}
};

export const selectGetChapter = createSelector(
  (state: RootState) => state.course.currentCourse,
  (_: RootState, chapterId: string) => chapterId,
  (state: RootState) => state.auth.uuid,
  (currentCourse, chapterId, userId) => {
    const chapter = currentCourse?.chapters.find((chap: Chapter) => chap.id === chapterId);
    const attachments = currentCourse?.attachments;
    const userProgress = chapter?.userProgress?.find((progress: UserProgress) => progress.userId === userId?.toString());
    const muxData = chapter?.muxData;
    const chapters = currentCourse?.chapters;
    const purchase = currentCourse?.purchases?.find((p: Purchase) => p.userId === userId?.toString());
    let nextChapter = chapter;

    function findIndexOfObject(chapters: Chapter[], obj: Chapter) {
      for (let i = 0; i < chapters.length; i++) {
        if (chapters[i] === obj) {
          return i;
        }
      }
      return -1;
    }

    if (chapter) {
      const nextIndex = findIndexOfObject(chapters || [], chapter) + 1;
      nextChapter = chapters && chapters[nextIndex];
    }

    return {
      chapter,
      chapters,
      course: currentCourse,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    };
  }
);

export const addProgress = (data: Course[], userId: string | null | undefined) : Course[] => {
  const dashboardCourses: Course[] = [];

  for (let course of (data || [])) {
    let isPurchased = false;

    const publishedChapterIds = course?.chapters.filter(
      (chapter) => chapter.isPublished
    );

    const validCompletedChapters = course?.chapters.filter(
      (chapter) =>
        chapter?.userProgress?.find(
          (progress) => { 
            const doesUserHaveProgress = progress.userId.toString() === userId?.toString()

            if (doesUserHaveProgress && !isPurchased) isPurchased = true;

            return doesUserHaveProgress && progress.isCompleted
          }
        ) && chapter.isPublished 
    ).length;

    const progressPercentage =
      (validCompletedChapters / publishedChapterIds?.length) * 100;

    dashboardCourses.push({ ...course, progress: isPurchased ? progressPercentage : null });
  }

  return dashboardCourses;
}

export const selectDashboardData = createSelector(
  [getUserId, getDashboardCourses],
  (userId, dashboardCourses) => {
    let completedCourses: Course[] = [];
    let coursesInProgress: Course[] = [];

    const userIdString = userId?.toString();
    const coursesWithProgress = addProgress(dashboardCourses, userIdString);

    completedCourses = coursesWithProgress.filter(
      (course: Course) => course?.progress === 100
    );
    coursesInProgress = coursesWithProgress.filter(
      (course: Course) => (course?.progress ?? 0) < 100
    );

    return {
      completedCourses,
      coursesInProgress,
    };
  }
);

