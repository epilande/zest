import { UPDATE_TEXT } from './constants';

const initialState = {
  text: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_TEXT:
      return {
        ...state,
        text: action.text
      };
    default:
      return state;
  }
}
