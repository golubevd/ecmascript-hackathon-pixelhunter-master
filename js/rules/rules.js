import * as game from '../game/game';
import RulesView from './rules-view';

export default () => {
    const  rulesScreen = new RulesView();

    rulesScreen.onContinueButtonClick = (userName) => {
        game.startGame(game.state, userName);
    };


    rulesScreen.onBackButtonClick = () => {
        game.resetGame();
    };

    return rulesScreen;
};
