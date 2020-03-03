import './title.scss';
import { createElement } from '../lib/dom';

export function title() {
  const element = createElement('h1', {
    innerText: 'Pokedex',
    className: 'title'
  });

  return element;
}
