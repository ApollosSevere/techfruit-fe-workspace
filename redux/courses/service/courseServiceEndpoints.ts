import { apiSlice } from "@/redux/api/apiSlice";

// TODO: Before doing bottom todo, explore swagger docs auto generation
// TODO: Remove "course from the verbage here, maybe add it to an enum to make safe"
// Understand that api and courses folder should be combined
export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "course",
        method: "POST",
        body: data,
        // credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: (userId) => ({
        url: "course",
        method: "GET",
        params: { userId }
        // credentials: "include" as const,
      }),
    }),
    getPublishedCourses: builder.query({
      query: (data) => ({
        url: "course/getPublishedCourses",
        method: "GET",
        params: { title: data.title, categoryId: data.categoryId }
        // credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `course/${id}`,
        method: "DELETE",
        // credentials: "include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ courseId, values} ) => ({
        url: `course/${courseId}`,
        method: "PUT",
        body: values,
        // credentials: "include" as const,
      }),
    }),
    // getUsersAllCourses: builder.query({
    //   query: () => ({
    //     url: "get-courses",
    //     method: "GET",
    //     credentials: "include" as const,
    //   }),
    // }),
    getCourseDetails: builder.query({
      query: (id: string) => ({
        url: `course/${id}`,
        method: "GET",
        // credentials: "include" as const,
      }),
    }),
    createSubDocumentItem: builder.mutation({
      query: ({ documentItemName, data}) => ({
        url: `course/${data.courseId}/addSubDocumentItem/${documentItemName}`,
        method: "POST",
        body: data,
        // credentials: "include" as const,
      }),
    }),
    createChapter: builder.mutation({
      query: ({courseId, values}) => ({
        url: `course/${courseId}/chapter`,
        method: "POST",
        body: values,
        // credentials: "include" as const,
      }),
    }),
    editChapter: builder.mutation({
      query: ({ courseId, chapterId, values} ) => ({
        url: `course/${courseId}/chapter/${chapterId}`,
        method: "PUT",
        body: values,
        // credentials: "include" as const,
      }),
    }),
    deleteDocumentItem: builder.mutation({
      query: ({ courseId, documentItemName , itemId}) => ({
        url: `course/${courseId}/deleteSubDocumentItem/${documentItemName}/${itemId}`,
        method: "DELETE",
        // credentials: "include" as const,
      }),
    }),
    getCourseWithPublishedChapters: builder.query({
      query: (id: string) => ({
        url: `course/${id}/publishedChapters`,
        method: "GET",
        // credentials: "include" as const,
      }),
    }),

    updateUserProgress: builder.mutation({
      query: ({ courseId, chapterId, userId, isCompleted}) => ({
        url: `course/${courseId}/chapters/${chapterId}/user-progress`,
        method: "PUT",
        params: { userId, isCompleted }
        // credentials: "include" as const,
      }),
    }),
    getCourseWithChapterAndUserProgress: builder.query({
      query: ({ courseId, chapterId, userId}) => ({
        url: `course/${courseId}/chapter/${chapterId}/user-progress/${userId}`,
        method: "GET",
        // credentials: "include" as const,
      }),
    }),
    getCourseWithChaptersAndUserProgress: builder.query({
      query: ({ courseId,userId}) => ({
        url: `course/${courseId}/chapter/user-progress/${userId}`,
        method: "GET",
        // credentials: "include" as const,
      }),
    }),
    findCourseByPublishedChapters: builder.query({
      query: (courseId) => ({
        url: `course/${courseId}/publishedChapters`,
        method: "GET",
        // credentials: "include" as const,
      }),
    }),
    findCourseByPublishedChaptersAndUserId: builder.query({
      query: ({courseId, userId}) => ({
        url: `course/${courseId}/publishedChapters/${userId}`,
        method: "GET",
        // credentials: "include" as const,
      }),
    }),
    findCourse: builder.mutation({
      query: ({courseId, userId}) => ({
        url: `course/${courseId}/publishedChapters/${userId}`,
        method: "GET",
        // credentials: "include" as const,
      }),
    }),

    addPurchase: builder.mutation({
      query: ({ courseId, data}) => ({
        url: `course/${courseId}/addPurchase`,
        method: "POST",
        body: data,
        // credentials: "include" as const,
      }),
    }),

    getDashboardCourses: builder.query({
      query: (userId) => ({
        url: `course/${userId}/getDashboard`,
        method: "GET",
        // credentials: "include" as const,
      }),
    }),

    getAnalyticsCalculation: builder.query({
      query: (userId) => ({
        url: `course/${userId}/analyticsCalculation`,
        method: "GET",
        // credentials: "include" as const,
      }),
    }),

    getAllCategories: builder.query({
      query: () => ({
        url: "course/categories",
        method: "GET",
        // credentials: "include" as const,
      }),
    }),

    updateChapterPositions: builder.mutation({
      query: ({courseId, chapters}) => ({
        url: "course/updateChapterPositions",
        method: "POST",
        body: chapters,
        params: { courseId }
      }),
    }),

    addReviewToCourse: builder.mutation({
      query: ({courseId, review}) => ({
        url: `course/${courseId}/reviews`,
        method: "POST",
        body: review,
      }),

    
    }),

    
    // getCourseContent: builder.query({
    //   query: (id) => ({
    //     url: `get-course-content/${id}`,
    //     method: "GET",
    //     credentials: "include" as const,
    //   }),
    // }),
    // addNewQuestion: builder.mutation({
    //   query: ({ question, courseId, contentId }) => ({
    //     url: "add-question",
    //     body: {
    //       question,
    //       courseId,
    //       contentId,
    //     },
    //     method: "PUT",
    //     credentials: "include" as const,
    //   }),
    // }),
    // addAnswerInQuestion: builder.mutation({
    //   query: ({ answer, courseId, contentId, questionId }) => ({
    //     url: "add-answer",
    //     body: {
    //       answer,
    //       courseId,
    //       contentId,
    //       questionId,
    //     },
    //     method: "PUT",
    //     credentials: "include" as const,
    //   }),
    // }),
    // addReviewInCourse: builder.mutation({
    //   query: ({ review, rating, courseId }: any) => ({
    //     url: `add-review/${courseId}`,
    //     body: {
    //       review,
    //       rating,
    //     },
    //     method: "PUT",
    //     credentials: "include" as const,
    //   }),
    // }),
    // addReplyInReview: builder.mutation({
    //   query: ({ comment, courseId, reviewId }: any) => ({
    //     url: `add-reply`,
    //     body: {
    //       comment, courseId, reviewId
    //     },
    //     method: "PUT",
    //     credentials: "include" as const,
    //   }),
    // }),
  }),
});

export const {
  useFindCourseMutation,
  useCreateCourseMutation,
  useCreateSubDocumentItemMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useEditChapterMutation,
  useGetCourseDetailsQuery,
  useCreateChapterMutation,
  useDeleteDocumentItemMutation,
  useGetCourseWithPublishedChaptersQuery,
  useUpdateUserProgressMutation,
  useGetCourseWithChapterAndUserProgressQuery,
  useGetCourseWithChaptersAndUserProgressQuery,
  useFindCourseByPublishedChaptersQuery,
  useFindCourseByPublishedChaptersAndUserIdQuery,
  useAddPurchaseMutation,
  useGetDashboardCoursesQuery,
  useGetPublishedCoursesQuery,
  useGetAnalyticsCalculationQuery,
  useGetAllCategoriesQuery,
  useUpdateChapterPositionsMutation,
  useAddReviewToCourseMutation,
//   useGetCourseContentQuery,
//   useAddNewQuestionMutation,
//   useAddAnswerInQuestionMutation,
//   useAddReviewInCourseMutation,
//   useAddReplyInReviewMutation
} = coursesApi;
