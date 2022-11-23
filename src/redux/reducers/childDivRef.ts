import { handleActions } from 'redux-actions'
import { RootState } from './state';
import { ChildDivRefActions } from 'redux/actions/'
import { DivRef } from 'redux/models';

const initialState: RootState.ChildDivRefState = {
  width: 0,
  height: 0,
  left: 0,
  right: 0,
  bottom: 0,
  top: 0
};

export const childDivRefReducer = handleActions<RootState.ChildDivRefState, DivRef>(
  {
    [ChildDivRefActions.Type.UPDATE_CHILD_DIV_REF]: (state, action) => {
      return action.payload;
    }
  },
  initialState
);