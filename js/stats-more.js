import * as utils from './utils';
import * as game from './game';
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
    <div class="header__tabs">
      <button class="tab tab--active">Ты</button>
      <button class="tab">Топ 50</button>
    </div>
  </header>
  <div class="result">
    <p class="result__text">У тебя
      <span id="result__score">28 650 очков</span> и
      <span id="result__place">3</span> место в топе</p>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--unknown"></li>
          </ul>
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">1 <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">50</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">2 <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">-100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--wrong"></li>
          </ul>
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">3.</td>
        <td colspan="2">
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--unknown"></li>
          </ul>
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
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
const backButton = element.querySelector(`.back`);


backButton.addEventListener(`click`, () => {
    game.renderScreen(greetingScreen);
});

export default element;
