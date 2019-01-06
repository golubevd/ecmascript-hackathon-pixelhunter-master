import * as utils from './utils';
import * as game from './game';
import gameOneScreen from './game-1';
import greetingScreen from './greeting';

const template = `\
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
      <li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>
 <footer class="footer">
  <a href="https://htmlacademy.ru" class="social-link">
    <span class="visually-hidden">HTML Academy</span>
    <svg class="icon" width="108" height="37" viewBox="0 0 108 37" fill="#000000">
      <use xlink:href="img/sprite.svg#logo-htmla"></use>
    </svg>
  </a>
  <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2018</span>
  <div class="footer__social-links">
    <a href="https://twitter.com/htmlacademy_ru" class="social-link">
      <span class="visually-hidden">Твиттер</span>
      <svg class="icon" width="29" height="29" viewBox="0 0 29 29" fill="#000000">
        <use xlink:href="img/sprite.svg#icon-tw"></use>
      </svg>
    </a>
    <a href="https://www.instagram.com/htmlacademy/" class="social-link">
      <span class="visually-hidden">Инстаграм</span>
      <svg class="icon" width="29" height="29" viewBox="0 0 29 29" fill="#000000">
        <use xlink:href="img/sprite.svg#icon-ig"></use>
      </svg>
    </a>
    <a href="https://www.facebook.com/htmlacademy" class="social-link">
      <span class="visually-hidden">Фейсбук</span>
      <svg class="icon" width="29" height="29" viewBox="0 0 29 29" fill="#000000">
        <use xlink:href="img/sprite.svg#icon-fb"></use>
      </svg>
    </a>
    <a href="https://vk.com/htmlacademy" class="social-link">
      <span class="visually-hidden">ВКонтакте</span>
      <svg class="icon" width="29" height="29" viewBox="0 0 29 29" fill="#000000">
        <use xlink:href="img/sprite.svg#icon-vk"></use>
      </svg>
    </a>
  </div>
</footer>`;

const element = utils.getScreensFromTemplate(template);

const rulesForm = element.querySelector(`.rules__form`);
const rulesInput = rulesForm.querySelector(`.rules__input`);
const rulesButton = rulesForm.querySelector(`.rules__button`);
const backButton = element.querySelector(`.back`);

rulesForm.addEventListener(`submit`, () => {
    game.renderScreen(gameOneScreen);
});

rulesInput.addEventListener(`input`, () => {
    rulesButton.disabled = (rulesInput.value.length === 0);
});

backButton.addEventListener(`click`, () => {
    game.renderScreen(greetingScreen);
});

export default element;

