import './favorites.scss';
import { createElement } from '../lib/dom';

export function createfavorites() {
  const container = createElement('section', {
    className: 'favorites'
  });
  return container;
}
