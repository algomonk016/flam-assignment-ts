import { combineReducers } from 'redux';
import { RootState } from './state'
import { parendDivRefReducer } from './parentDivRef'

export type { RootState };

export const rootReducer = combineReducers<RootState>({
  parentDivRef: parendDivRefReducer
});