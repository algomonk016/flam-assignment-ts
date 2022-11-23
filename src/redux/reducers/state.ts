import { DivRef } from 'redux/models/'

export interface RootState {
  parentDivRef: RootState.ParentDivRefState;
  childDivRef: RootState.ChildDivRefState;
}

export namespace RootState {
  export type ParentDivRefState = DivRef;
  export type ChildDivRefState = DivRef;
}