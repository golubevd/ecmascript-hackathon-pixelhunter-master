import * as utils from './utils';
import * as game from './game';
import greetingScreen from './greeting';
import gameTwoScreen from './game-2';

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
    <div class="game__timer">NN</div>
    <div class="game__lives">
      <img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
    </div>
  </header>
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
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

const gameContent = element.querySelector(`.game__content`);
const questions = [`question1`, `question2`];
const backButton = element.querySelector(`.back`);

function isAnswered(question) {
    const answers = gameContent.elements[question];
    return Array.from(answers).some((answer) => answer.checked);
}

gameContent.addEventListener(`click`, () => {
    if(questions.every((question) => isAnswered(question))) {
        game.renderScreen(gameTwoScreen);
    }
});

backButton.addEventListener(`click`, () => {
    game.renderScreen(greetingScreen);
});

export default element;
