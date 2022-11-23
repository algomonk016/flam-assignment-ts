import { handleActions } from 'redux-actions'
import { RootState } from './state';
import { ParentDivRefActions } from 'redux/actions/'
import { DivRef } from 'redux/models';

const initialState: RootState.ParentDivRefState = {
  width: 0,
  height: 0,
  left: 0,
  right: 0,
  bottom: 0,
  top: 0
};

export const parendDivRefReducer = handleActions<RootState.ParentDivRefState, DivRef>(
  {
    [ParentDivRefActions.Type.UPDATE_PARENT_DIV_REF]: (state, action) => {
      const newState = (action as any).payload[0]
      return newState
    }
  },
  initialState
);