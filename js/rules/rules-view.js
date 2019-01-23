import AbstractView from '../view';
import {rules} from '../data/data';
import header from '../header';
import footer from '../footer';

export default class RulesView extends AbstractView {

    _getUserName(input) {
        return input.value.trim().replace(/[#//]/g, ``);
    }

    get template() {
        return `\
          ${header()}
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
          </div>
        ${footer()}`;
    }

    bind() {
        const backButton = this.element.querySelector(`.back`);
        const rulesForm = this.element.querySelector(`.rules__form`);
        const rulesInput = rulesForm.querySelector(`.rules__input`);
        this.rulesButton = rulesForm.querySelector(`.rules__button`);


        rulesForm.addEventListener(`submit`, (evt) => {
            evt.preventDefault();
            rulesInput.disabled = true;
            this.rulesButton.disabled = true;

            this.onContinueButtonClick(this._getUserName(rulesInput));
        });

        rulesInput.addEventListener(`input`, () => {
            this.rulesButton.disabled = (rulesInput.value.length === 0);
        });

        backButton.addEventListener(`click`, (evt) => {
            evt.preventDefault();
            this.onBackButtonClick();
        });
    }


    setProgress(progress) {
        this.rulesButton.textContent = `${progress}%`;
    }

    onContinueButtonClick(userName) {

    }
    onBackButtonClick() {

    }

}
