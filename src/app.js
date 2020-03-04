import './app.scss';
import { createElement } from './lib/dom';
import { createInputSearch } from './components/search';
import { createTitle } from './components/title';
import { createPokemons } from './components/pokemons';
import { appendContent } from './lib/dom';

const allPokemons = ['Pikachu', 'Pichu', 'Marwinchu', 'Juliachu', 'Johannachu'];

function filterPokemons(searchValue) {
  const lowerCaseSearchValue = searchValue.toLowerCase();

  const filteredPokemons = allPokemons.filter(pokemon => {
    return pokemon.toLowerCase().startsWith(lowerCaseSearchValue);
  });
  return filteredPokemons;
}

export function app() {
  const header = createElement('header', {
    className: 'header'
  });
  const main = createElement('main', {
    className: 'main'
  });
  const title = createTitle('Pokedex');

  const searchInput = createInputSearch(sessionStorage.getItem('searchValue'));

  let pokemons = null;
  function setSearchResults() {
    const filteredPokemons = filterPokemons(searchInput.value);
    pokemons = createPokemons(filteredPokemons);
    appendContent(main, pokemons);
  }
  setSearchResults();

  appendContent(header, [title]);
  appendContent(main, [searchInput, pokemons]);

  searchInput.addEventListener('input', event => {
    main.removeChild(pokemons);
    setSearchResults();

    const searchValue = event.target.value;
    sessionStorage.setItem('searchValue', searchValue);
  });

  return [header, main];
}
