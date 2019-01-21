import AbstractView from '../view';
import {rules} from '../data/data';
import {countResults} from '../data/data';
import {getPoints} from '../data/data';
import {getExtraPoints} from '../data/data';
import {getTotalPoints} from '../data/data';
import dataResults from '../data/data-results';
import header from '../header';
import footer from '../footer';



export default class StatsView extends AbstractView {

    constructor(state) {
        super();
        this.state = state;
        this.stats = [this.state.results, ...dataResults];
    }

    _isGameFailed(results) {
        return (rules.maxLives - countResults(results, `wrong`)) < 0;
    }

    _templateBonus(bonus) {
     return (bonus.count === 0) ? `` : `\
        <tr>
            <td></td>
            <td class="result__extra">${bonus.title}:</td>
            <td class="result__extra">${bonus.count} <span class="stats__result stats__result--${bonus.name}"></span></td>
            <td class="result__points">× ${bonus.points}</td>
            <td class="result__total">${bonus.totalPoints}</td>
          </tr>`;
    }


   _templateTableResults(index, results) {

    let templateTableStat = ``;
    let templateTableExtra = ``;

       if (this._isGameFailed(results)) {


        templateTableStat = `\
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>`;
    } else {
        templateTableStat = `\
        <td class="result__points">× ${rules.points.correct}</td>
        <td class="result__total">${getPoints(results)}</td>`;

  templateTableExtra = `\
      ${getExtraPoints(results).map((item) => this._templateBonus(item)).join(``)}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${getTotalPoints(results)}</td>
      </tr>`;
}

    return `\
      <table class="result__table">
        <tr>
          <td class="result__number">${index}.</td>
          <td colspan="2">
            <ul class="stats">
              ${results.map((result) => {
                return `<li class="stats__result stats__result--${result}"></li>`;
              }).join(``)}
            </ul>
          </td>
          ${templateTableStat}
        </tr>
        ${templateTableExtra}
      </table>`;


 }
    get template() {
        return `\
        ${header()}
        <div class="result">
        <h1>${(this._isGameFailed(this.state.results)) ? `Fail` : `Победа!` }</h1>
        ${this.stats.map((results, index) => {
            return this._templateTableResults(index + 1, results);
        }).join(``)}
      </div>
    ${footer()}`;

    }

    bind() {
        const backButton = this.element.querySelector(`.back`);
        backButton.addEventListener(`click`, (evt) => {
            evt.preventDefault();
            this.onBackButtonClick();
        });
    }

    onBackButtonClick() {

    }

}
