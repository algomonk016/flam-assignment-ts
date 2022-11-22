import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';

export namespace ParentDivRefActions {
  export enum Type {
    UPDATE_PARENT_DIV_REF = 'UPDATE_PARENT_DIV_REF'
  }

  export const updateParentDivRef = createAction(Type.UPDATE_PARENT_DIV_REF)
}

export type ParentDivRefActions = Omit<typeof ParentDivRefActions, 'Type'>;
export const useParentDivRefActions = (dispatch: Dispatch) => {
  const { Type, ...actions } = ParentDivRefActions;
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as ParentDivRefActions;
}
