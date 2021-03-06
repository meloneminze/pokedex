import './search.scss';
import { createElement } from '../lib/dom';

export function createInputSearch(value) {
  const element = createElement('input', {
    className: 'search',
    type: 'search',
    placeholder: 'Enter Pokemon name...',
    value: value
  });
  return element;
}
