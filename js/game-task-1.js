import * as utils from './utils';
import * as game from './game';
import gameHeader from './game-header';
import gameStats from './game-stats';
import footer from './footer';

const templateGameOption=(option, index) => `\
    <div class="game__option">
        <img data-src="${option.src}" alt="Option ${index}" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question${index}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question${index}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`;

const templateGame = (state, options) => `\
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      ${options.map((option, index) => templateGameOption(option,  index+1)).join(``)}
    </form>
    <ul class="stats">
     ${gameStats(state.results)}
    </ul>
  </div>`;

const template= (state, options) => `\
${gameHeader(state)}
${templateGame(state, options)}
${footer()}`;

const questions = [`question1`, `question2`];
const IMG_WIDTH = 468;
const IMG_HEIGHT = 458;

export default (state, options) =>{


const element = utils.getScreensFromTemplate(template(state, options));

const gameContent = element.querySelector(`.game__content`);

const backButton = element.querySelector(`.back`);

utils.loadImages(gameContent, IMG_WIDTH,IMG_HEIGHT);

const isAnswered=(question)=> {
    return Array.from(gameContent.elements[question]).some((answer) => answer.checked);
};

gameContent.addEventListener(`click`, () => {
    if(questions.every((question) => isAnswered(question))) {
        game.renderNextLevel(state);
    }
});

backButton.addEventListener(`click`, () => {
    game.resetGame();
});

    return element;
};
