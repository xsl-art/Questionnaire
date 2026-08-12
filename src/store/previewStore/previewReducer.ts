import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type PreviewStateType = {
  isPreviewMode: boolean;
  mockAnswers: Record<string, unknown>;
};

const INIT_STATE: PreviewStateType = {
  isPreviewMode: false,
  mockAnswers: {},
};

export const previewSlice = createSlice({
  name: 'preview',
  initialState: INIT_STATE,
  reducers: {
    togglePreviewMode: (state: PreviewStateType) => {
      state.isPreviewMode = !state.isPreviewMode;
    },
    setPreviewMode: (state: PreviewStateType, action: PayloadAction<boolean>) => {
      state.isPreviewMode = action.payload;
    },
    setMockAnswer: (
      state: PreviewStateType,
      action: PayloadAction<{ fe_id: string; value: unknown }>
    ) => {
      const { fe_id, value } = action.payload;
      state.mockAnswers[fe_id] = value;
    },
    resetMockAnswers: (state: PreviewStateType) => {
      state.mockAnswers = {};
    },
  },
});

export const { togglePreviewMode, setPreviewMode, setMockAnswer, resetMockAnswers } =
  previewSlice.actions;
export default previewSlice.reducer;
