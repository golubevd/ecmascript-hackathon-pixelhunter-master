import levels from './levels';
import gameTask1 from './game-task-1';
import gameTask2 from './game-task-2';
import gameTask3 from './game-task-3';

import greetingScreen from './greeting';
import statusScreen from './stats';


export const rules = {
    timePerLevel: 30,
    slowTime: 25,
    quickTime: 8,
    pointsPerResult: 100,
    speedBonusPoint: 50,
    speedPenaltyPoint: -50,
    livesBonusPoint: 50,
    maxLives: 3,
    numberOfLevels: levels.length
};

export const statistic =[
    {
       name: `Mary`,
    results: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `unknown`, `fast`, `unknown`]
  }, {
    name: `Finn`,
    results: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `wrong`, `fast`, `wrong`]
  }, {
    name: `Alice`,
    results: [`wrong`, `fast`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `wrong`, `slow`, `slow`]
  }, {
    name: `Bob`,
    results: [`correct`, `fast`, `correct`, `correct`, `fast`, `correct`, `correct`, `slow`, `correct`, `correct`]
  }
];

export const initialState = Object.freeze({
    level: 0,
    lives: rules.maxLives,
    name: ``,
    results: Object.freeze(new Array(rules.numberOfLevels).fill(`unknown`))
});

const tasksTypes = {
    'task-1': gameTask1,
    'task-2': gameTask2,
    'task-3': gameTask3
};

const correctResults = new Set([`slow`, `fast`, `correct`]);
const viewport = document.querySelector(`.viewport`);

export function renderScreen(screen) {
    viewport.innerHTML = ``;
    viewport.appendChild(screen);
}

export function isCorrectResult(result){
    return correctResults.has(result);
}

export function renderLevel(state){
    const type = levels[state.level].type;
    const options = levels[state.level].options;

    const screen = tasksTypes[type](state,options);

    renderScreen(screen);
}

export function renderNextLevel(state){

    state.level++;

    if(state.level < rules.numberOfLevels){
        renderLevel(state);
    }else{
        statistic.unshift({
            name: state.name,
            results: state.results
        });

        renderScreen(statusScreen(statistic));
    }
}

export function startGame(userName = `Unknown`){
    renderLevel(Object.assign({},
        initialState, {
        'name': userName,
        'results': initialState.results.slice(0)
    }));
}

export function resetGame(){
    renderScreen(greetingScreen());
}
