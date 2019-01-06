import * as utils from './utils';
import * as game from './game';
import greetingScreen from './greeting';

const template = `\
  <div id="main" class="central__content">

    <div class="intro" id="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      <button class="intro__top top" type="button">
        <img src="img/icon-top.svg" width="71" height="79" alt="Топ игроков">
      </button>
    </div>

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
const introAsterisk = element.querySelector(`.intro__asterisk`);


introAsterisk.addEventListener(`click`, () => {
    game.renderScreen(greetingScreen);
});

export default element;
