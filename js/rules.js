import * as utils from './utils';
import * as game from './game';
import footer from './footer';


const tempalteRules = (rules) =>`\
  <header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
  </header>
  <div class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>Угадай ${rules.levelsCount} раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится ${rules.timePerLevel} секунд.</li>
      <li>Ошибиться можно не более ${rules.maxLives} раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>`;

const template =(rules) => `\
${tempalteRules(rules)}
 ${footer()}`;


export default () => {

const element = utils.getScreensFromTemplate(template(game.rules));

const rulesForm = element.querySelector(`.rules__form`);
const rulesInput = rulesForm.querySelector(`.rules__input`);
const rulesButton = rulesForm.querySelector(`.rules__button`);
const backButton = element.querySelector(`.back`);

rulesForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    game.startGame(game.initialState, rulesInput.value);
});

rulesInput.addEventListener(`input`, () => {
    rulesButton.disabled = (rulesInput.value.length === 0);
});

backButton.addEventListener(`click`, () => {
    game.resetGame();
});

return element;

};

