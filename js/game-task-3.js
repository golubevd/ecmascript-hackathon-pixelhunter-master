import * as utils from './utils';
import * as game from './game';
import gameHeader from './game-header'
import gameStats from './game-stats'
import footer from './footer';


const templateGameOption(option, index) => `\
 <div class="game__option">
        <img data-src="${option.srx}" alt="Option ${index}" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option ${index}" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option ${index}" width="304" height="455">
      </div>`;



const templateGame=(state, options) =`\
<div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      ${options.map((option, index)=>templateGameOption(option, index+1)).join(``)}
    </form>
    <ul class="stats">
    ${gameStats(state.results)}
    </ul>
  </div>`;


const template= (state, options) = `\
${gameHeader(state)}
${templateGame(state, options)}
${footer()}`;


const IMG_WIDTH = 304;
const IMG_HEIGHT = 455;

export default (state, options) => {


const element = utils.getScreensFromTemplate(template);

const gameContent = element.querySelector(`.game__content`);
const gameAnswers = gameContent.querySelectorAll(`.game__option`);
const backButton = element.querySelector(`.back`);
utils.loadImages(gameContent, IMG_WIDTH,IMG_HEIGHT);

Array.from(gameAnswers).forEach((answer) => {
    answer.addEventListener(`click`, () => {
        game.renderNextLevel(state);
    });
});

backButton.addEventListener(`click`, () => {
    game.reset();
});

return element;

}
