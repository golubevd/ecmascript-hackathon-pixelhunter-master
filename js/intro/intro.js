import {renderScreen} from '../data/data';
import IntroView from './intro-view';


class IntroPresenter {
    constructor() {
        this.view = new IntroView();
    }

    init() {
        renderScreen(this.view);

        this.view.onContinueButtonClick = () =>{
            Application.showGreeting();
        };
    }

}
const instance = new IntroPresenter();

export default () => instance;
