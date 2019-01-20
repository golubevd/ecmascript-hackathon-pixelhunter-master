import * as utils from './utils';
import * as game from './game';
import resultTable from './data-results';
import gameStats from './game-stats';
import footer from './footer';


const templateBonus=(bonus)=>{
    return (bonus.count === 0) ? `` : `\
    <tr>
        <td></td>
        <td class="result__extra">${bonus.title}:</td>
        <td class="result__extra">${bonus.count} <span class="stats__result stats__result--${bonus.name}"></span></td>
        <td class="result__points">× ${bonus.points}</td>
        <td class="result__total">${bonus.totalPoints}</td>
      </tr>`;
};


const templateTableResults = (index, results) =>{

    let templateTableStat = ``;
    let templateTableExtra = ``;

    if(game.getLivesCount(results) < 0){
        templateTableStat = `\
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>`;
    } else {
        templateTableStat = `\
        <td class="result__points">× ${game.rules.points.correct}</td>
        <td class="result__total">${game.getPoints(results)}</td>`;

  templateTableExtra = `\
      ${game.getExtraPoints(results).map((item) => templateBonus(item)).join(``)}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${game.getTotalPoints(results)}</td>
      </tr>`;
}


return `\
    <table class="result__table">
      <tr>
        <td class="result__number">${index}.</td>
        <td colspan="2">
          ${gameStats(results)}
        </td>
        ${templateTableStat}
      </tr>
      ${templateTableExtra}
    </table>`;
};

const templateResults =(stats) =>`\
<div class="result">
    <h1>${(stats.lives >= 0) ? `Победа!` : `Fail`}</h1>
    ${templateTableResults(1, stats.results)}
    ${resultTable.map((results, index) => {
        return templateTableResults(index + 2, results);
    }).join(``)}
  </div>`;


const template = (stats) => `\
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
${templateResults(stats)}
${footer()}`;


export default (stats) =>{
const element = utils.getScreensFromTemplate(template(stats));
const backButton = element.querySelector(`.back`);
backButton.addEventListener(`click`, () => {
    game.resetGame();
});

    return element;
};
