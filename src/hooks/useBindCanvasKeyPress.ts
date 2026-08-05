import { useKeyPress } from 'ahooks';
import {
  deleteSelectedComponent,
  copySelectedComponent,
  pasteSelectedComponent,
  moveUp,
  moveDown,
} from '../store/componentsStore/componentsReducer';
import { useDispatch } from 'react-redux';
import { ActionCreators as UndoCreators } from 'redux-undo';

/**
 * 判断activeElement组件是否合法
 * @returns boolean
 */
const isActiveElementValid = () => {
  const activeElement = document.activeElement;
  if (activeElement === document.body) return true; //没有选中input之类组件
  if (activeElement?.matches('div[role="button"]')) return true;
  return false;
};
export const useBindCanvasKeyPress = () => {
  const dispatch = useDispatch();
  //delete
  useKeyPress(['backspace', 'delete', 'esc'], () => {
    if (!isActiveElementValid()) return;
    dispatch(deleteSelectedComponent());
  });

  //copy
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return;
    dispatch(copySelectedComponent());
  });

  //paste
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return;
    dispatch(pasteSelectedComponent());
  });

  //up
  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return;
    dispatch(moveUp());
  });

  //down
  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return;
    dispatch(moveDown());
  });

  //undo
  useKeyPress(['ctrl.z', 'meta.z'], () => {
    if (!isActiveElementValid()) return;
    dispatch(UndoCreators.undo());
  });

  //redo
  useKeyPress(['ctrl.y', 'meta.y'], () => {
    if (!isActiveElementValid()) return;
    dispatch(UndoCreators.redo());
  });
};
