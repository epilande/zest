import { UPDATE_TEXT } from './constants';

export function updateText(text) {
  return { type: UPDATE_TEXT, text };
}
