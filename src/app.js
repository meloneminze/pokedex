import './app.scss';
import { createElement } from './lib/dom';
import { createInputSearch } from './components/search';
import { createTitle } from './components/title';
import { createSearchResults } from './components/pokemons';
import { appendContent } from './lib/dom';
import { filterPokemons } from './lib/pokemons';
import { createFavorites } from './components/favorites';

function refreshLocalStorage(item) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  // let favorites = JSON.parse(localStorage.getItem('favorites'));
  // if (!favorites) {
  //   favorites = [];
  // }

  if (!favorites.includes(item)) {
    favorites.push(item);
  } else {
    const itemIndex = favorites.indexOf(item);
    favorites.splice(itemIndex, 1);
  }

  if (favorites.length > 3) {
    // favorites.splice(0, 1);
    favorites = favorites.slice(1);
  }

  const favoritesJSON = JSON.stringify(favorites);
  localStorage.setItem('favorites', favoritesJSON);
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

  const favoritesContainer = createElement('div');
  let favorites = createFavorites({
    items: JSON.parse(localStorage.getItem('favorites')) || []
  });
  appendContent(favoritesContainer, favorites);

  function handleSearchResultClick(item) {
    refreshLocalStorage(item);
    favoritesContainer.removeChild(favorites);
    favorites = createFavorites({
      items: JSON.parse(localStorage.getItem('favorites')) || []
    });
    appendContent(favoritesContainer, favorites);
  }

  let searchResults = null;
  async function setSearchResults() {
    const filteredPokemons = await filterPokemons(searchInput.value);
    searchResults = createSearchResults({
      items: filteredPokemons,
      onSearchResultClick: handleSearchResultClick
    });
    appendContent(main, searchResults);
  }
  setSearchResults();

  appendContent(header, [title]);
  appendContent(main, [searchInput]);

  searchInput.addEventListener('input', event => {
    main.removeChild(searchResults);
    setSearchResults();

    const searchValue = event.target.value;
    sessionStorage.setItem('searchValue', searchValue);
  });

  return [header, main, favoritesContainer];
}
