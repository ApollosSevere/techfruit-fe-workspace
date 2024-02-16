import { RootState } from "@/redux/store";

export const selectUser = (state: RootState) => state.auth;
export const selectUserId = (state: RootState) => state.auth.uuid;
export const selectUsername = (state: RootState) => state.auth.email;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectIsTeacher = (state: RootState) => state.auth.role === "TEACHER";





