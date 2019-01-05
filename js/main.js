const getScreens = (ids) => {
    return ids.map((item) => {

        const template = document.getElementById(item);

        return (template.content) ? template.content.querySelector(`.central`) : template.querySelector(`.central`);
    });
};

const isAltLeftKeyDown = (evt) => {
    const leftKey = 37;
    return evt.altKey && evt.keyCode === leftKey;
};

const isAltRightKeyDown = (evt) => {
    const rightKey=39;
    return evt.altKey && evt.keyCode === rightKey;
};

const screenIds = [
    `intro`,
    `greeting`,
    `rules`,
    `game-1`,
    `game-2`,
    `game-3`,
    `stats`
];

const viewport = document.querySelector(`.viewport`);
const screens = getScreens(screenIds);

let screenIndex = 0;

const showScreen = (index) => {
    if(viewport.hasChildNodes()){
        viewport.replaceChild(screens[index], viewport.firstChild);
    }else {
        viewport.appendChild(screens[index]);
    }

};

const shiftScreen = (offset = 0) => {

    screenIndex = ((screenIndex + offset) < 0) ? screens.length - 1 : (screenIndex + offset) % screens.length;

    showScreen(screenIndex);
};

showScreen(screenIndex);

window.addEventListener(`keydown`, (evt) => {

    if(isAltLeftKeyDown(evt)) {
        shiftScreen(-1);
    }

    if(isAltRightKeyDown(evt)) {
        shiftScreen(1);
    }
});
