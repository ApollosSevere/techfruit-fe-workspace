import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { coursesApi } from "../service/courseServiceEndpoints";

import { Course, Category, Chapter } from "./types";
// & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//     })[];
//   };

// const yo = auth();

export type AnalyticsCalc = {
  data: { [courseTitle: string]: number };
  totalRevenue: number;
  totalSales: number;
};

export const chapterInitialState: Chapter = {
  id: "",
  title: "",
  description: "",
  videoUrl: "",
  position: 0,
  isPublished: false,
  isFree: true,
  courseId: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  muxData: {
    id: "",
    assetId: "",
    playbackId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  userProgress: [],
};

interface CourseState {
  currentCourse: Course;
  dashboardCourses: Course[];
  analyticsCalculation: AnalyticsCalc;
  categories: Category[];
  // completedCourses: Course[];
  // coursesInProgress: Course[];
}

export const initialCourseState: CourseState = {
  categories: [],
  dashboardCourses: [],

  currentCourse: {
    id: "string",
    userId: "string",
    title: "string",
    description: "string",
    imageUrl: "",
    price: 0,
    isPublished: false,
    categoryId: null,
    category: {
      id: "",
      name: "",
    },
    progress: 0,
    chapters: [],
    attachments: [],
    purchases: [],
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  analyticsCalculation: {
    data: {},
    totalRevenue: 0,
    totalSales: 0,
  },

  // completedCourses: [],
  // coursesInProgress: [],
};

const courseSlice = createSlice({
  name: "auth",
  initialState: initialCourseState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      coursesApi.endpoints.getCourseDetails.matchFulfilled,
      (state, action) => {
        state.currentCourse = action.payload;
      }
    );
    builder.addMatcher(
      coursesApi.endpoints.editCourse.matchFulfilled,
      (state, action) => {
        state.currentCourse = action.payload;
      }
    );
    builder.addMatcher(
      coursesApi.endpoints.createSubDocumentItem.matchFulfilled,
      (state, action) => {
        state.currentCourse = action.payload;
      }
    );
    builder.addMatcher(
      coursesApi.endpoints.createChapter.matchFulfilled,
      (state, action) => {
        state.currentCourse = action.payload;
      }
    );
    builder.addMatcher(
      coursesApi.endpoints.editChapter.matchFulfilled,
      (state, action) => {
        state.currentCourse = action.payload;
      }
    );
    builder.addMatcher(
      coursesApi.endpoints.deleteDocumentItem.matchFulfilled,
      (state, action) => {
        state.currentCourse = action.payload;
      }
    );
    builder.addMatcher(
      coursesApi.endpoints.findCourseByPublishedChaptersAndUserId
        .matchFulfilled,
      (state, action) => {
        // console.log(action.payload);
        state.currentCourse = action.payload;
      }
    );

    builder.addMatcher(
      coursesApi.endpoints.updateUserProgress.matchFulfilled,
      (state, action) => {
        // console.log(action.payload);
        state.currentCourse = action.payload;
      }
    );

    builder.addMatcher(
      coursesApi.endpoints.getDashboardCourses.matchFulfilled,
      (state, action: PayloadAction<Course[]>) => {
        state.dashboardCourses = action.payload;
      }
    );

    // builder.addMatcher(
    //   coursesApi.endpoints.getPublishedCourses.matchFulfilled,
    //   (state, action: PayloadAction<Course[]>) => {
    //     state.dashboardCourses = action.payload;
    //   }
    // );

    builder.addMatcher(
      coursesApi.endpoints.getAnalyticsCalculation.matchFulfilled,
      (state, action: PayloadAction<AnalyticsCalc>) => {
        state.analyticsCalculation = action.payload;
      }
    );

    builder.addMatcher(
      coursesApi.endpoints.getAllCategories.matchFulfilled,
      (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
      }
    );

    builder.addMatcher(
      coursesApi.endpoints.addReviewToCourse.matchFulfilled,
      (state, action: PayloadAction<Course>) => {
        state.currentCourse = action.payload;
      }
    );
  },
});

export default courseSlice;
