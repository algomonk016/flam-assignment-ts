import { combineReducers } from 'redux';
import { RootState } from './state';
import { parendDivRefReducer } from 'redux/reducers/parentDivRef';
import { childDivRefReducer } from 'redux/reducers/childDivRef';

export type { RootState };

export const rootReducer = combineReducers<RootState>({
  parentDivRef: parendDivRefReducer,
  childDivRef: childDivRefReducer
});