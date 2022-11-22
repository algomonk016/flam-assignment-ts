import { DivRef } from 'redux/models/'

export interface RootState {
  parentDivRef: RootState.ParentDivRefState;
}

export namespace RootState {
  export type ParentDivRefState = DivRef;
}