import Model from './model';
import dataAdapter from './data/data-adapter';
import IntroPresenter from './intro/intro';
import GreetingPresenter from './greeting/greeting';
import RulesPresenter from './rules/rules';
import GamePresenter from './game/game';
import StatsPresenter from './stats/stats';


const PresenterID = {
    GREETING: ``,
    RULES: `rules`,
    GAME: `game`,
    STATS: `stats`
};

class Application {

    constructor() {

        this.showIntro();

        this.model = new class extends Model {
            get urlRead(){
                return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`;
            }

            get urlWrite(){
                return ``;
            }
        }();

        this.model.load(dataAdapter)
        .then((data) => this._setup(data))
        .then(() => this._changePresenter(this._parseLocationHash()))
        .catch(window.console.error);
    }

    _parseLocationHash() {
        const hashArgs = location.hash.replace(`#`, ``).split(`?`);
        const route = hashArgs[0] || ``;
        const params = (hashArgs[1] && hashArgs[1].split(`&`)) || [];

        const args = params.reduce((obj, param) => {
            const arg = param.split(`=`);
            const argKey = arg[0] || ``;
            const argValue = arg[1] || ``;

            obj[argKey] = argValue;

            return obj;
        }, {});

        return {route, args};
    }


    _setLocationHash(hash) {
        const route = (hash && hash.route) || ``;

        const args = hash && hash.args && Object.keys(hash.args).map((key) => {
            return `${key}=${hash.args[key]}`;
        }).join(`&`);

        location.hash = `${route}${(route && args) ? `?${args}` : ``}`;
    }

    _changePresenter(hash) {
        this.routes[hash.route](hash.args).init();
    }

    _setup(data) {
        this.data =data;

        this.routes = {
            [PresenterID.GREETING]: GreetingPresenter,
            [PresenterID.RULES]: RulesPresenter,
            [PresenterID.GAME]: GamePresenter,
            [PresenterID.STATS]:StatsPresenter
        };

        window.onhashchange = () => {
            this._changePresenter(this._parseLocationHash());
        };
    }

    showIntro() {
        IntroPresenter().init();
    }

   showGreeting() {
       this._setLocationHash({route: PresenterID.GREETING});
    }

     showRules() {
        this._setLocationHash({route: PresenterID.RULES});
    }

    showGame(args) {
       this._setLocationHash({route: PresenterID.GAME, args});
    }

    showStats(args) {
        this._setLocationHash({route: PresenterID.STATS, args});
    }
}

const instance = new Application();

export default instance;
