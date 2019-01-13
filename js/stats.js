import * as utils from './utils';
import * as game from './game';
import gameStats from './game-stats'
import footer from './footer';


const countResults=(results, result) =>{
    return results.filter((item) => item===result).length;
};


const getPoints = (resluts) =>{
    const conut = resluts.filter((reslut) =>{
        return game.isCorrectResult(reslut);
    }).length;
}


const templateSpeedBonus=(count)=>{
    return (count === 0) ? `` : `\
    <tr>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${count} <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× ${game.rules.speedBonusPoint}</td>
        <td class="result__total">${count * game.rules.speedBonusPoint}</td>
      </tr>`;
};

const templateLivesBonus=(count)=>{
    return (count === 0) ? `` : `\
  <tr>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${count} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× ${game.rules.livesBonusPoint}</td>
        <td class="result__total">${count * game.rules.livesBonusPoint}</td>
      </tr>`;
};


const templatePenaltyPoint=(count) =>{
    return (count===0) ? `` : `\
    <tr>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${count} <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× ${-game.rules.speedPenaltyPoint}</td>
        <td class="result__total">${count * game.rules.speedPenaltyPoint}</td>
      </tr>`;
};


const templateTableResults = (index, results) =>{
    const livesCount = (game.rules.maxLives - countResults(results, `wrong`));

    let templateTableStat = ``;
    let templateTableExtra = ``;

    if(livesCount < 0){
        templateTableStat = `\
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>`;
    } else {
        let totalPoints = getPoints(results);
        templateTableStat = `\
        <td class="result__points">× ${game.rules.pointsPerResult}</td>
        <td class="result__total">${totalPoints}</td>`;


        const speedBonusCount = countResults(results, `fast`);
        const speedPenaltyPoints = countResults(results, `slow`);

        totalPoints += livesCount * game.rules.livesBonusPoint +
            speedBonusCount * game.rules.speedBonusPoint+
            speedPenaltyPoints * game.rules.speedPenaltyPoint;

        templateTableExtra =`\
            ${templateSpeedBonus(speedBonusCount)}
            ${templateLivesBonus(livesCount)}
            ${templatePenaltyPoint(speedPenaltyPoints)}
            <tr>
        <td colspan="5" class="result__total  result__total--final">${totalPoints}</td>
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
    <h1>Победа!</h1>
    ${stats.map((stat, index) => {
      return templateTableResults(index + 1, stat.results);
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
    game.reset();
});

    return element;

}





