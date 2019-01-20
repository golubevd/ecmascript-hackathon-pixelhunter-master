import AbstractView from '../view';
import {resizeImage} from '../utils';
import {rules} from '../game/game';
import header from './level-header';
import footer from '../footer';

export default class LevelView extends AbstractView {
    constructor(state, level) {
        super();

        this.state= state;
        this.level = level;
    }

    _getElements(question) {
        return Array.from(this.gameContent.elements[question]);
    }

    _isAnswered() {
        return this.level.questions.every((question) => {
            return this._getElements(question).some((item) => item.checked);
        });
    }

    _hasQuestions() {
        return this.level.questions.length;
    }

    _isQuestionAnswerRight() {
        return this.level.questions.map((question, index) => {
          return this._getElements(question)
            .find((item) => item.checked)
            .value === this.level.options[index];
        }).every((answer) => answer);
    }

    _isChoosenAnswerRight(optionIndex) {
        return this.level.options[optionIndex] === this.level.choose;
    }

    _getOptionImage(optionIndex) {
        const img = this.level.img[optionIndex];

        const actualSize = resizeImage(this.level.frame, {
            width: img.naturalWidth,
            height: img.naturalHeight
        });

        img.width = actualSize.width;
        img.height = actualSize.height;
        img.alt = `Option ${optionIndex}`;

        return img;
    }

    _templateQuestion(question) {
        return `\
         <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="${question}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="${question}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>`;
    }

    _templateOption(question) {
        return `\
        <div class="game__option">
        <img> ${(question) ? this._templateQuestion(question) : ``}
       </div>`;
    }

    get template() {
        return `\
        ${header(this.state)}
           <div class="game">
            <p class="game__task">${this.level.title}</p>
            <form class="${this.level.formClass}">
              ${this.level.options.map((option, index) => {
                return this._templateOption(this.level.questions[index]);
              }).join(``)}
            </form>
            <div class="stats">
              <ul class="stats">
                ${this.state.results.map((result) => {
                  return `<li class="stats__result stats__result--${result}"></li>`;
                }).join(``)}
              </ul>
            </div>
        </div>
      ${footer()}`;
    }

    get levelTime() {
        return rules.timePerLevel - parseInt(this.gameTimer.textContent, 10);
    }

    set levelTime(time) {
        this.gameTimer.textContent = time;
    }

    bind() {
        this.gameContent = this.element.querySelector(`.game__content`);
        this.gameTimer = this.element.querySelector(`.game__timer`);

        const gameOptions = this.gameContent.querySelectorAll(`.game__option`);
        Array.from(gameOptions).forEach((option, optionIndex) => {
            const optionImgTag = option.querySelector(`img`);
            const optionImg = this._getOptionImage(optionIndex);

            optionImgTag.parentNode.replaceChild(optionImg, optionImgTag);

            option.addEventListener(`click`, (evt) => {
                if (this._hasQuestions() && this._isAnswered()) {
                    this.onLevelFinished(this.state, this.levelTime, this._isQuestionAnswerRight());
                }

                if (!this._hasQuestions()) {
                    this.onLevelFinished(this.state, this.levelTime, this._isChoosenAnswerRight(optionIndex));
                }
            });
        });

        const backButton = this.element.querySelector(`.back`);

        backButton.addEventListener(`click`, (evt) => {
            evt.preventDefault();
            this.onBackButtonClick();
        });
    }


   onLevelFinished(state, levelTime, isAnswerRight) {

   }

    onBackButtonClick() {

}

}
