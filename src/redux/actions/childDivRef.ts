import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';

export namespace ChildDivRefActions {
  export enum Type {
    UPDATE_CHILD_DIV_REF = 'UPDATE_CHILD_DIV_REF'
  }

  export const updateChlidDivRef = createAction(Type.UPDATE_CHILD_DIV_REF)
}

export type ChildDivRefActions = Omit<typeof ChildDivRefActions, 'Type'>;
export const useChildDivRefActions = (dispatch: Dispatch) => {
  const { Type, ...actions } = ChildDivRefActions;
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as ChildDivRefActions;
}
