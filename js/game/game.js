import {renderScreen} from '../data/data';
import {getLevelResults} from '../data/data';
import {state as initState} from '../data/data';
import {rules} from '../data/data';
import GameView from './game-view';
import Application from '../application';

class GamePresenter {
    constructor(useName) {
        this.data = Application.data;

        this.state = Object.assign({}, initState, {
            name: useName,
            results: initState.results.slice()
        });

        this.gameTimer = null;

        this._createGameView();
    }

    _createGameView() {
        this.level = this.data[this.state.level];

        this.view = new GameView(this.state, this.level);
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

        if ((this.state.lives >= 0) && (this.state.level + 1) < this.data.length) {
            this.state.level++;

            this._createGameView();
            this.init();
        } else {
            Application.showStats({name: this.state.name, results: this.state.results});
        }
    }

    _isQuestionAnswerRight(answers) {
        return answers.map((answer, index) => {
            return answer === this.level.answers[index].type;
        }).every((answer) => answer);
    }


     _isChoosenAnswerRight(answer) {


         const isShouldChoosePhoto = this.level.answers.filter((it) => {
      return it.type === `photo`;
    }).length === 1;

return answer === ((isShouldChoosePhoto) ? `photo` : `painting`);
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

export default (args = {name: `Unknown`}) => new GamePresenter(args.name);
