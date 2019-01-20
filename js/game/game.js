import * as utils from './../utils';
import levels from './data-levels';
import ingameLevel from '../level/level';
import greetingScreen from '../greeting/greeting';
import statusScreen from '../stats/stats';


const extraPoints = {
  fast: `Бонус за скорость:`,
  heart: `Бонус за жизни:`,
  slow: `Штраф за медлительность:`
};


let levelTimer = null;

export const rules = Object.freeze({
    timePerLevel: 30,
    slowTime: 20,
    quickTime: 10,
    points: Object.freeze({
        correct: 100,
        fast: 50,
        slow: -50,
        heart: 50,
        wrong: 0,
        unknown: 0
    }),
    maxLives: 3,
    levelsCount: levels.length
});


export const state = Object.freeze({
    level: 0,
    lives: rules.maxLives,
    name: `Unknown`,
    results: Object.freeze(new Array(rules.levelsCount).fill(`unknown`))
});


export function renderScreen(screen) {
    const viewport = document.getElementById(`main`);

    viewport.innerHTML = ``;
    viewport.appendChild(screen.element);
}


export function loadLevel(onLoadComplete) {
    let count = levels.length;

    levels.forEach((level, index) => {
        utils.loadImages(level.src, (imgs) => {
            levels[index].img = imgs;

            count--;


        if(!count && typeof onLoadComplete === `function`) {
            onLoadComplete();
            }
        });
    });

}


export function renderLevel(curState){

    const levelScreen = ingameLevel(curState, levels[curState.level]);

    renderScreen(levelScreen);

    startLevel(curState, (timerTiks) => {
        levelScreen.levelTime = timerTiks;
    });
}

export function renderNextLevel(curState){

    if((curState.lives >=0) && (curState.level +1) < rules.levelsCount) {
        renderLevel(Object.assign({}, curState, {
            level: curState.level + 1
        }));
    }else{
       renderScreen(statusScreen(curState));
    }
}

export function getLevelResults(levelTime, levelPassed) {

    if (!levelPassed || levelTime <=0) {
        return `wrong`;
    } else if (levelPassed && levelTime < rules.quickTime) {
        return `fast`;
    } else if (levelPassed && levelTime > rules.slowTime) {
        return `slow`;
    } else if (levelPassed) {
        return `correct`;
    } else {
        return `wrong`;
    }
}


export function startLevel(curState, onLevelTime) {

    const TIMER = 1000;

    let timerTiks = rules.timePerLevel;

    levelTimer = setInterval(() => {
        timerTiks--;

        if (typeof onLevelTime === `function`) {
            onLevelTime(timerTiks);
        }

        if (!timerTiks) {
            finishLevel(curState);
        }
    }, TIMER);
}

export function finishLevel(curState, levelTime, levelPassed) {

    clearInterval(levelTimer);

    const result = getLevelResults(levelTime, levelPassed);

    const newState = Object.assign({}, curState, {
        lives: (result === `wrong`)
        ? curState.lives -1
        : curState.lives,
        results: curState.results.slice()
    });

    newState.results[curState.level] = result;

    renderNextLevel(newState);
}

export function countResults(results, value) {
    return results.filter((result) => result === value).length;
}

export function getLivesCount(results) {
    const lives = rules.maxLives - countResults(results, `wrong`);

    return (lives >= 0) ? lives : 0;
}

export function getPoints(results) {
    return results.filter((result) => {
        return Math.abs(rules.points[result]);
    }).length * rules.points.correct;
}


export function getTotalPoints(results) {
    return getPoints(results) + Object.keys(extraPoints).map((key) => {
        const keyCount = (key === `heart`)
        ? getLivesCount(results)
        : countResults(results, key);

        return keyCount * rules.points[key];
    }).reduce((pValue, cValue) => pValue + cValue);
}

export function getExtraPoints(results) {

    return Object.keys(extraPoints).map((key) => {
        const keyCount = (key === `heart`)
        ? getLivesCount(results)
        : countResults(results, key);

        return {
            name: key,
            title: extraPoints[key],
            count: keyCount,
            points: Math.abs(rules.points[key]),
            totalPoints: keyCount * rules.points[key]
        };
    });
}



export function startGame(curState, userName){

  loadLevel(() => {
    renderLevel(Object.assign({}, curState, {
      name: userName,
      results: curState.results.slice()
    }));
  });
}

export function resetGame(){
    clearInterval(levelTimer);
    renderScreen(greetingScreen());
}
