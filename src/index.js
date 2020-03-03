import './index.scss';
import { pokemon } from './components/pokemon';
import { search } from './components/search';
import { title } from './components/title';

document.body.appendChild(title());
document.body.appendChild(pokemon());
document.body.appendChild(search());
