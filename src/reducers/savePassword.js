import {
  OFFER_SAVE,
} from '../constants/actions';

const initialState = {
  saved: false,
  inStorage: false
};

export default function savePassword(state = initialState, action) {
  switch (action.type) {

    case 'OFFER_SAVE':
      return {...state};

    default:
      return state || null;
  }
}
