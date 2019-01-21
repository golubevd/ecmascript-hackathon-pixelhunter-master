import {renderScreen} from '../data/data';
import {getLevelResults} from '../data/data';
import {state as initState} from '../data/data';
import {rules} from '../data/data';
import {types} from '../data/data';
import Levels from '../data/data-levels';
import GameView from './game-view';
import Application from '../application';

class GamePresenter {
    constructor(state = initState) {
        this.state = state;
        this.gameTimer = null;

        this._createGameView();
    }

    _createGameView() {
        this.level = Levels.getLevel(this.state.level);

        this.view = new GameView(this.state, Object.assign({},
        this.level,                                                         types[this.level.type]
        ));
    }

    _startGame() {

        const TIMER = 1000;

        let timeTiks = rules.gameTime - 1;

        this.gameTimer = setInterval(() => {
            this.view.gameTime = --timeTiks;

            if (!timeTiks) {
                this._endGame();
            }
        }, TIMER);
    }

    _endGame(time = 0, passed = false) {
        clearInterval(this.gameTimer);

        const result = getLevelResults(time, passed);

        this.state.lives = (result === `wrong`)
        ? this.state.lives -1
        : this.state.lives;

        this.state.results[this.state.level] = result;

        this._nextGame();
    }

    _nextGame() {

        if ((this.state.lives >= 0) && (this.state.level + 1) < Levels.count) {
            this.state.level++;

            this._createGameView();
            this.init();
        } else {
            Application.showStats(this.state);
        }
    }

    _isQuestionAnswerRight(answers) {
        return answers.map((answer, index) => {
            return answer === this.level.options[index];
        }).every((answer) => answer);
    }


     _isChoosenAnswerRight(answer) {
        return answer === types[this.level.type].choose;
    }

    init() {
        renderScreen(this.view);

        this.view.onAnswered = (time, answers) => {
            this._endGame(time, this._isQuestionAnswerRight(answers));
        };


        this.view.onChosen = (time, answer) => {
            this._endGame(time, this._isChoosenAnswerRight(answer));
        };

        this.view.onBackButtonClick = () => {
            clearInterval(this.gameTimer);
            Application.showGreeting();
        };

        this._startGame();
    }

}

export default GamePresenter;
