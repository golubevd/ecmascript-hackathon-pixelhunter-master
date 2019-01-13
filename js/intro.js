import * as utils from './utils';
import * as game from './game';
import greetingScreen from './greeting';

import footer from './footer';

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
${footer()}`;

export default () =>{

const element = utils.getScreensFromTemplate(template);
const introAsterisk = element.querySelector(`.intro__asterisk`);
const playerTop = element.querySelector(`.intro__top`);


introAsterisk.addEventListener(`click`, () => {
    game.renderScreen(greetingScreen);
});

playerTop.addEventListener(`click`, () => {
    game.renderScreen(moreStats);
});

return element;

}
