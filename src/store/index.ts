import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userStore/userReducer';
import componentsReducer from './componentsStore/componentsReducer';
import pageInfoReducer from './pageInfoStore/pageInfoReducer';
import type { UserStateType } from './userStore/userReducer';
import type { ComponentsStateType } from './componentsStore/componentsReducer';
import type { PageInfoType } from './pageInfoStore/pageInfoReducer';
import undoable, { excludeAction, type StateWithHistory } from 'redux-undo';

export type StateType = {
  user: UserStateType;
  //components: ComponentsStateType;
  components: StateWithHistory<ComponentsStateType>;
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    user: userReducer,

    components: undoable(componentsReducer, {
      limit: 20, //最大撤销次数
      //排除重置所有组件的操作
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/moveUp',
        'components/moveDown',
      ]),
    }),

    pageInfo: pageInfoReducer,
  },
});
