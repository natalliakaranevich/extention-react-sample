import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import savePassword from './savePassword';


export default combineReducers({
  router: routerReducer,
  savePassword: savePassword
})