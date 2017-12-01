import {
  OFFER_SAVE,
  SAVE_PASSWORD
} from '../constants/actions';

import {getChromeStorageData} from "./../helpers";

export default getChromeStorageData(null).then((data) => {
debugger
  const initialState = {
    saved: false,
    inStorage: false
  };

   return function savePassword(state = initialState, action) {
    switch (action.type) {
      case OFFER_SAVE:
        return {...state};

      case SAVE_PASSWORD:
        return {...state, saved: true, creads: action.data};

      default:
        return state || null;
    }
  }
});
