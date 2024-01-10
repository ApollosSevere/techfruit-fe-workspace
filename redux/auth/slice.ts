import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { WritableDraft } from 'immer/dist/internal';
import { authServiceApi } from '../authService/authServiceEndpoints';

export const TOKEN = "token";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role: string;
  permissions: string[];
  uuid: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  permissions: string[] | null;
  email: string | null | undefined;
  role: string | null;
  uuid: string | null;
}

export const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  firstName: null,
  lastName: null,
  permissions: null,
  role: null,
  email: null,
  uuid: null,
};

const mapAuthResponseToState = (
  state: WritableDraft<AuthState>,
  action: PayloadAction<AuthResponse>
) => {
  const { payload } = action;
  state.uuid = payload.uuid;
  state.accessToken = payload.access_token;
  state.refreshToken = payload.refresh_token;
  state.firstName = payload.firstName;
  state.lastName = payload.lastName;
  state.email = payload.email;
  state.role = payload.role;
  state.permissions = payload.permissions;
  
  window.localStorage.clear();
  window.localStorage.setItem(TOKEN, payload.access_token);
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authServiceApi.endpoints.login.matchFulfilled,
      mapAuthResponseToState
    );
    builder.addMatcher(
      authServiceApi.endpoints.register.matchFulfilled,
      mapAuthResponseToState
    );
     builder.addMatcher(
      authServiceApi.endpoints.validateToken.matchFulfilled,
      mapAuthResponseToState
    );
  },
});
