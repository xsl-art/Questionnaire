import { createContext, useContext } from 'react';

export type PreviewContextType = {
  isPreviewMode: boolean;
  mockAnswers: Record<string, unknown>;
  setMockAnswer: (fe_id: string, value: unknown) => void;
};

export const PreviewContext = createContext<PreviewContextType>({
  isPreviewMode: false,
  mockAnswers: {},
  setMockAnswer: () => {},
});

export const usePreviewContext = () => useContext(PreviewContext);
