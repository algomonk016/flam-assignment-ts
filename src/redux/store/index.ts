import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState, rootReducer } from 'redux/reducers/';
import { logger, thunk } from 'redux/middleware/';

export const configureStore = (initialState?: RootState): Store<RootState> => {
  let middleware = applyMiddleware(thunk, logger);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer as any, initialState as any, middleware) as Store<RootState>;

  if ((module as any).hot) {
    (module as any).hot.accept('redux/reducers', () => {
      const nextReducer = require('redux/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}