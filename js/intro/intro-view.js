import AbstractView from '../view';
import footer from '../footer';


export default class IntroView extends AbstractView {
    get template() {

        return `\
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
    }

}
