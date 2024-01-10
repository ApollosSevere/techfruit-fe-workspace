import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Attachment, Chapter, Course, Purchase } from ".prisma/client";
import { coursesApi } from "../service/courseServiceEndpoints";
import { UserProgress } from "@prisma/client";

import {
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/nextjs/dist/types/server";
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

export type Category = {
  id: string;
  name: string;
};

export type ChapterType = Chapter & {
  userProgress: UserProgress[] | null;
  muxData: {
    assetId: string;
    playbackId: string;
  };
};
export type CourseType = Course & {
  attachments: Attachment[];
  chapters: ChapterType[];
  purchases: Purchase[];
  progress: number | null;
  category: Category | null;
};

export const chapterInitialState = {
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
};

interface CourseState {
  currentCourse: CourseType;
  dashboardCourses: CourseType[];
  analyticsCalculation: AnalyticsCalc;
  categories: Category[];
  // completedCourses: CourseType[];
  // coursesInProgress: CourseType[];
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
    price: null,
    isPublished: false,
    categoryId: null,
    category: null,
    progress: 0,
    chapters: [],
    attachments: [],
    purchases: [],
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
      (state, action: PayloadAction<CourseType[]>) => {
        state.dashboardCourses = action.payload;
      }
    );

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
  },
});

export default courseSlice;
