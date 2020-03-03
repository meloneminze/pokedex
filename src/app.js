import './app.scss';
import { createElement } from './lib/dom';
import { search } from './components/search';
import { title } from './components/title';
import { pokemons } from './components/pokemons';

const allPokemons = ['Pikachu', 'Pichu', 'Marwinchu', 'Juliachu', 'Johannachu'];

export function app() {
  const header = createElement('header', {
    className: 'header'
  });
  const main = createElement('main', {
    className: 'main'
  });
  const titleElement = title('Pokedex');
  const searchElement = search();

  header.appendChild(titleElement);
  main.appendChild(searchElement);

  let searchResults = pokemons(allPokemons);
  main.appendChild(searchResults);

  searchElement.addEventListener('input', event => {
    main.removeChild(searchResults);

    const searchValue = event.target.value;
    const filteredPokemons = allPokemons.filter(pokemon => {
      return pokemon.startsWith(searchValue);
    });

    searchResults = pokemons(filteredPokemons);
    main.appendChild(searchResults);
  });

  return [header, main];
}
