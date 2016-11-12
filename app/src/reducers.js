import { combineReducers } from 'redux';
import globalReducer from 'containers/App/reducer';

const rootReducer = combineReducers({
  global: globalReducer,
});

export default rootReducer;
