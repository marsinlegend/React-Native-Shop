import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

export const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk),
  composeWithDevTools(),
);
