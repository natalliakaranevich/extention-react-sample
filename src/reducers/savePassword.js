import {
  OFFER_SAVE,
  SAVE_PASSWORD
} from '../constants/actions';

const initialState = {
  creads: []
};

export default function savePassword(state = initialState, action) {
  switch (action.type) {
    case OFFER_SAVE:
      return {...state};

    case SAVE_PASSWORD:
      return {...state, creads: action.data};

    default:
      return state || null;
  }
}
