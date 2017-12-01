import DataProvider from './data';
import {SAVE_PASSWORD} from '../constants/actions';

export default class SavePasswordProvider extends DataProvider {
  savePassword(data) {
    this.dispatch(SAVE_PASSWORD, data)
  }
}
