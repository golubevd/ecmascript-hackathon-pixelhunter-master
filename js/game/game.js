import gameModel from '../models/game-model';
import {Result} from '../data/data';
import {getLevelResults} from '../data/data';
import {state as initState} from '../data/data';
import {rules} from '../data/data';
import GameView from './game-view';
import Application from '../application';
import ModalPresenter from '../modal/game-modal';


class GamePresenter {
  constructor(userName) {

    this._state = Object.assign({}, initState, {
      name: userName,
      results: initState.results.slice()
    });

    this._gameTimer = null;

    this._level = gameModel.getLevel(this._state.level);

    this._view = new GameView(this._state, this._level);

    this._modal = new ModalPresenter();

    this._onTimeTickHandler = this._onTimeTickHandler.bind(this);
  }

  get element() {
    return this._view.element;
  }

  destroy() {
    clearInterval(this._gameTimer);

    this._view.onAnswered = null;
    this._view.onChosen = null;
    this._view.onBackButtonClick = null;
    this._modal.onConfirm = null;
    this._modal.onCancel =null;
    this._modal.onCloseBtnClick = null;
    this._view.remove();
  }

  show(viewport = this._viewport) {

    this._viewport = viewport;

    this._view.show(viewport);

    this._view.onAnswered = (time, answers) => {
      this._endGame(rules.gameTime - time, this._isQuestionsAnswerRight(answers));
    };

    this._view.onChosen = (time, answer) => {
      this._endGame(rules.gameTime - time, this._isChoosenAnswerRight(answer));
    };

    this._view.onBackButtonClick = () => {

      clearInterval(this._gameTimer);
        //this._view.hide();
        this._modal.show(this._viewport);
        const section = this._viewport.querySelectorAll(`section`);
        for(let i=0; i< section.length;i++){
            for (let x =0; x< section[i].children.length;x++){
                if(section[i].children[x].classList.contains(`modal__inner`)){
               section[i].classList.remove(`central`);
                section[i].classList.add(`modal`);
            } else {
               section[i].classList.add(`central`);
            }
            }
        }

    };

      this._modal.onConfirm = (result) => {

          if (result) {
              this._modal.hide();
              Application.showGreeting();
            }
      };

       this._modal.onCancel = (result) => {
           if (result) {
              this._modal.hide();
              this._view.show(this._viewport);
              this._gameTimer = setInterval(this._onTimeTickHandler, 1000);
          }
      };


       this._modal.onCloseBtnClick = (result) => {
           if (result) {
              this._modal.hide();
              this._view.show(this._viewport);
              this._gameTimer = setInterval(this._onTimeTickHandler, 1000);
          }
      };

    this._startGame();
  }

  _onTimeTickHandler() {

    if (this._view.gameTime <= 0) {
      this._endGame();
    } else {
      this._view.gameTime = this._view.gameTime - 1;
    }
  }

  _startGame() {

    const TIMER_DELAY = 1000;

    this._view.gameTime = rules.gameTime - 1;

    this._gameTimer = setInterval(this._onTimeTickHandler, TIMER_DELAY);
  }

  _endGame(time = 0, passed = false) {

    clearInterval(this._gameTimer);

    const result = getLevelResults(time, passed);

    this._state.lives = (result === Result.WRONG)
        ? this._state.lives - 1
        : this._state.lives;

    this._state.results[this._state.level] = result;

    this._nextGame();
  }

  _nextGame() {

    if ((this._state.lives >= 0) && ((this._state.level + 1) < gameModel.levelsCount)) {

      this._level = gameModel.getLevel(++this._state.level);

      this.destroy();

      this._view = new GameView(this._state, this._level);

      this.show();

    } else {

      const name = this._state.name;
      const lives = this._state.lives;
      const results = this._state.results;

      Application.showStats({name, lives, results});
    }
  }

  _isQuestionsAnswerRight(answers) {
    return answers.map((answer, index) => {
      return answer === this._level.answers[index].type;
    }).every((answer) => answer);
  }

  _isChoosenAnswerRight(answer) {

    const isShouldChoosePhoto = this._level.answers.filter((item) => {
      return item.type === `photo`;
    }).length === 1;

    return answer === ((isShouldChoosePhoto) ? `photo` : `painting`);
  }
}

export default (args = {name: `Unknown`}) => new GamePresenter(args.name);
