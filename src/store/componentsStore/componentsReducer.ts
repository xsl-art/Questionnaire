//存储组件列表数据
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ComponentPropsType, ConditionGroup } from '@/components/QuestionComponents/type';
import cloneDeep from 'lodash.clonedeep';
import { nanoid } from 'nanoid';
import { arrayMove } from '@dnd-kit/sortable';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
  visibleCondition?: ConditionGroup | null; //可见条件
};

export type ComponentsStateType = {
  selectedId: string;
  componentList: ComponentInfoType[];
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  //其他
  copiedComponent: null,
};

const getNextSelectedId = (fe_id: string, componentList: ComponentInfoType[]) => {
  const filterComponentList = componentList.filter(item => !item.isHidden);
  const index = filterComponentList.findIndex(item => item.fe_id === fe_id);
  if (index < 0) return '';

  const length = filterComponentList.length;
  if (length <= 1) return '';
  if (index + 1 === length) return filterComponentList[index - 1].fe_id;
  return filterComponentList[index + 1].fe_id;
};

const insertNewComponent = (state: ComponentsStateType, newComponent: ComponentInfoType) => {
  const index = state.componentList.findIndex(item => item.fe_id === state.selectedId);
  if (index < 0) {
    state.componentList.push(newComponent);
  } else {
    state.componentList.splice(index + 1, 0, newComponent);
  }
  state.selectedId = newComponent.fe_id;
};

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    //重置所有组件
    resetComponents: (_state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload;
    },
    //设置选中的组件id
    changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
    //添加组件
    addComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload;
      insertNewComponent(state, newComponent);
    },
    //同步更新状态
    updateComponent: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) => {
      const { fe_id, newProps } = action.payload;
      //当前修改组件
      const currentComponent = state.componentList.find(item => item.fe_id === fe_id);
      if (currentComponent) {
        currentComponent.props = {
          ...currentComponent.props,
          ...newProps,
        };
        // 确保组件引用变化，触发React重新渲染
        const index = state.componentList.findIndex(item => item.fe_id === fe_id);
        if (index >= 0) {
          state.componentList[index] = { ...currentComponent };
        }
      }
    },
    //删除选中组件
    deleteSelectedComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state;
      //更新选中id
      state.selectedId = getNextSelectedId(selectedId, componentList);
      const index = componentList.findIndex(item => item.fe_id === selectedId);
      if (index < 0) return;
      componentList.splice(index, 1);
    },
    //显示/隐藏选中组件
    hideSelectedComponent: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { componentList } = state;
      const { fe_id, isHidden } = action.payload;

      if (isHidden) {
        //隐藏
        //更新选中id
        state.selectedId = getNextSelectedId(fe_id, componentList);
      } else {
        //显示
        state.selectedId = fe_id;
      }
      const currentComponent = componentList.find(item => item.fe_id === fe_id);
      if (currentComponent) {
        currentComponent.isHidden = isHidden;
      }
    },
    //锁定/解锁选中组件
    lockSelectedComponent: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string }>
    ) => {
      const { componentList } = state;
      const { fe_id } = action.payload;
      //当前选择对象
      const currentComponent = componentList.find(item => item.fe_id === fe_id);
      if (currentComponent) {
        currentComponent.isLocked = !currentComponent.isLocked;
      }
    },
    //复制选中组件
    copySelectedComponent: (state: ComponentsStateType) => {
      const { componentList, selectedId } = state;
      const selectedIdComponent = componentList.find(item => item.fe_id === selectedId);
      if (selectedIdComponent == null) return;
      state.copiedComponent = cloneDeep(selectedIdComponent);
      //console.log('复制组件', state.copiedComponent);
    },
    //粘贴选中组件
    pasteSelectedComponent: (state: ComponentsStateType) => {
      const { copiedComponent } = state;
      if (copiedComponent == null) return;
      //修改fe_id
      copiedComponent.fe_id = nanoid();
      insertNewComponent(state, copiedComponent);
    },
    //up上一个
    moveUp: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state;
      const length = componentList.length;
      let selectedIndex = componentList.findIndex(item => item.fe_id === selectedId);
      if (selectedIndex < 0) return;
      if (selectedIndex <= 0) {
        selectedIndex = length - 1;
      } else {
        selectedIndex = selectedIndex - 1;
      }
      state.selectedId = componentList[selectedIndex].fe_id;
    },
    //down
    moveDown: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state;
      const length = componentList.length;
      let selectedIndex = componentList.findIndex(item => item.fe_id === selectedId);
      if (selectedIndex < 0) return;
      if (selectedIndex >= length - 1) {
        selectedIndex = 0;
      } else {
        selectedIndex = selectedIndex + 1;
      }
      state.selectedId = componentList[selectedIndex].fe_id;
    },
    //修改组件标题
    changeComponentTitle: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newTitle: string }>
    ) => {
      const { fe_id, newTitle } = action.payload;
      const currentComponent = state.componentList.find(item => item.fe_id === fe_id);
      if (currentComponent) {
        currentComponent.title = newTitle;
      }
    },
    //拖拽排序组件
    moveComponent: (
      state: ComponentsStateType,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { componentList: currentComponent } = state;
      const { oldIndex, newIndex } = action.payload;
      state.componentList = arrayMove(currentComponent, oldIndex, newIndex);
    },
    //更新组件可见条件
    updateVisibleCondition: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; visibleCondition: ConditionGroup | null }>
    ) => {
      const { fe_id, visibleCondition } = action.payload;
      const currentComponent = state.componentList.find(item => item.fe_id === fe_id);
      if (currentComponent) {
        currentComponent.visibleCondition = visibleCondition;
      }
    },
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  updateComponent,
  deleteSelectedComponent,
  hideSelectedComponent,
  lockSelectedComponent,
  copySelectedComponent,
  pasteSelectedComponent,
  moveUp,
  moveDown,
  changeComponentTitle,
  moveComponent,
  updateVisibleCondition,
} = componentsSlice.actions;
export default componentsSlice.reducer;
