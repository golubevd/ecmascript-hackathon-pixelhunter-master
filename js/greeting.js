import * as utils from './utils';
import * as game from './game';
import rulesScreen from './rules';

const template = `\
  <div class="greeting central--blur">
    <img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
    <div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
    <div class="greeting__challenge">
      <h3 class="greeting__challenge-title">Лучшие художники-фотореалисты бросают тебе вызов!</h3>
      <p class="greeting__challenge-text">Правила игры просты:</p>
      <ul class="greeting__challenge-list">
        <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
        <li>Задача кажется тривиальной, но не думай, что все так просто.</li>
        <li>Фотореализм обманчив и коварен.</li>
        <li>Помни, главное — смотреть очень внимательно.</li>
      </ul>
    </div>
    <button class="greeting__continue" type="button">
      <span class="visually-hidden">Продолжить</span>
      <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-right"></use>
      </svg>
    </button>
    <button class="greeting__top top" type="button">
      <img src="img/icon-top.svg" width="71" height="79" alt="Топ игроков">
    </button>
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

const greetingContinue = element.querySelector(`.greeting__continue`);

greetingContinue.addEventListener(`click`, () => {
    game.renderScreen(rulesScreen);

});

export default element;
