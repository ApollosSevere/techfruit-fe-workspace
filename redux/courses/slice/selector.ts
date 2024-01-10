import { selectUserId } from "@/redux/auth/selector";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/utils/hooks";
import { AnalyticsCalc, ChapterType, CourseType } from "./courseSlice";

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


// TODO: Change this name!
export const selectGetChapter = (state: RootState, chapterId: string ) => {

  const course = state.course.currentCourse;
  const chapter = course.chapters.find(chapter => chapter.id === chapterId);
  const attachments = course.attachments;
  const userProgress = chapter?.userProgress?.find(progress => progress.userId === state.auth.uuid?.toString());
  const muxData = chapter?.muxData;
  const chapters = course.chapters;
  const purchase = course.purchases?.find(purchase => purchase.userId === state.auth.uuid?.toString()); // TODO: change this
  let nextChapter = chapter;

  // console.log(chapter?.userProgress)

  function findIndexOfObject(chapters: ChapterType[], obj:ChapterType) {
      for (let i = 0; i < chapters.length; i++) {
          if (chapters[i] === obj) {
              return i;
          }
      }
      return -1; // Return -1 if the object is not found in the array
  }

  if (chapter) {
    let nextIndex = findIndexOfObject(chapters, chapter) + 1;
    nextChapter = course.chapters[nextIndex];
  }


  return {
      chapter,
      chapters,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    };

};

export const addProgress = (data: CourseType[], userId: string | undefined) : CourseType[] => {
  const dashboardCourses: CourseType[] = [];


  for (let course of (data || [])) {
    let isPurchased = false;
    const publishedChapterIds = course.chapters.filter(
      (chapter) => chapter.isPublished
    );

    const validCompletedChapters = course.chapters.filter(
      (chapter) =>
        chapter?.userProgress?.find(
          (progress) => { 
            if (course.userId === "1") {
              console.log(progress.userId === userId, progress.userId)
            }
            const doesUserHaveProgress = progress.userId === userId
            if (doesUserHaveProgress && !isPurchased) isPurchased = true;

            return doesUserHaveProgress && progress.isCompleted
          }
        ) && chapter.isPublished 
    ).length;


    const progressPercentage =
      (validCompletedChapters / publishedChapterIds.length) * 100;

    dashboardCourses.push({ ...course, progress: isPurchased ? progressPercentage : null });
  }

  return dashboardCourses;
}


export const selectDashboardData = (state: RootState) => {
  let completedCourses: CourseType[] = [];
  let coursesInProgress: CourseType[] = [];

  const userId = state.auth.uuid;
  const dashboardCourses: CourseType[] = addProgress(state.course.dashboardCourses, userId?.toString());

  // for (let course of state.course.dashboardCourses) {
  //   const publishedChapterIds = course.chapters.filter(
  //     (chapter) => chapter.isPublished
  //   );

  //   const validCompletedChapters = course.chapters.filter(
  //     (chapter) =>
  //       chapter?.userProgress?.find(
  //         (progress) => progress.userId === userId?.toString()
  //       ) && chapter.isPublished
  //   ).length;

  //   const progressPercentage =
  //     (validCompletedChapters / publishedChapterIds.length) * 100;

  //   dashboardCourses.push({ ...course, progress: progressPercentage });
  // }

  completedCourses = dashboardCourses.filter(
    (course: CourseType) => course?.progress === 100
  );
  coursesInProgress = dashboardCourses.filter(
    (course: CourseType) => (course?.progress ?? 0) < 100
  );

  return {
    completedCourses,
    coursesInProgress,
  };
};

