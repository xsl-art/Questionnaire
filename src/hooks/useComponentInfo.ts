import { useSelector } from 'react-redux';
import type { StateType } from '../store';
import type { ComponentsStateType } from '@/store/componentsStore/componentsReducer';
export const useComponentInfo = () => {
  const components = useSelector(
    (state: StateType) => state.components.present
  ) as ComponentsStateType;
  const { componentList = [], selectedId, copiedComponent, adjacencyCache } = components;
  const selectedComponent = componentList.find(item => item.fe_id === selectedId);
  return { componentList, selectedId, selectedComponent, copiedComponent, adjacencyCache };
};
