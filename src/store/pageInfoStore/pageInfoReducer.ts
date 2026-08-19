import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type PageInfoType = {
  title: string;
  desc?: string;
  js?: string;
  css?: string;
  isPublished?: boolean;
};

const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: '',
  isPublished: false,
};

export const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (_state: PageInfoType, action: PayloadAction<PageInfoType>) => {
      return action.payload;
    },
    //修改标题
    updateTitle: (state: PageInfoType, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    //保存用户自定义css
    saveCustomCss: (state: PageInfoType, action: PayloadAction<string>) => {
      state.css = action.payload;
      //console.log('用户css', state.css);
    },
  },
});

export const { resetPageInfo, updateTitle, saveCustomCss } = pageInfoSlice.actions;
export default pageInfoSlice.reducer;
