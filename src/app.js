import './app.scss';
import { createElement } from './lib/dom';
import { createInputSearch } from './components/search';
import { createTitle } from './components/title';
import { createSearchResults } from './components/pokemons';
import { appendContent } from './lib/dom';
import { filterPokemons } from './lib/pokemons';

export function app() {
  const header = createElement('header', {
    className: 'header'
  });
  const main = createElement('main', {
    className: 'main'
  });
  const title = createTitle('Pokedex');

  const searchInput = createInputSearch(sessionStorage.getItem('searchValue'));

  let searchResults = null;
  function setSearchResults() {
    const filteredPokemons = filterPokemons(searchInput.value);
    searchResults = createSearchResults(filteredPokemons);
    appendContent(main, searchResults);
  }
  setSearchResults();

  appendContent(header, [title]);
  appendContent(main, [searchInput, searchResults]);

  searchInput.addEventListener('input', event => {
    main.removeChild(searchResults);
    setSearchResults();

    const searchValue = event.target.value;
    sessionStorage.setItem('searchValue', searchValue);
  });

  return [header, main];
}
