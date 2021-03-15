import { initFoxPositionX, initFoxPositionY, sizeOfFox } from './foxConstants';
import { ActionSignal, Signal } from './types/Signals';
import { MoveType } from './types/MoveType';
import { FoxPosition, FoxType } from './types/FoxType';

import img from '../img/fox.png';
import img1 from '../img/food.png';
import img2 from '../img/fox2.png';
import board from './boardConstants';
import foxL from '../img/rotate/foxL.png';
import foxUp from '../img/rotate/foxUp.png';
import foxDown from '../img/rotate/foxDown.png';
import fox2L from '../img/rotate/fox2L.png';
import fox2Up from '../img/rotate/fox2Up.png';
import fox2Down from '../img/rotate/fox2Down.png';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
const btn = document.getElementsByClassName("restartBtn");

let position: string;

let fox: FoxType = {
    x: initFoxPositionX,
    y: initFoxPositionY,
    sizeOfFox: sizeOfFox
};

const foxImg: HTMLImageElement = new Image(fox.sizeOfFox, fox.sizeOfFox);
foxImg.src = img;

const fox1Img: HTMLImageElement = new Image(fox.sizeOfFox, fox.sizeOfFox);
fox1Img.src = img2;

const foodImg: HTMLImageElement = new Image(40, 40);
foodImg.src = img1;

const foxLImg: HTMLImageElement = new Image(fox.sizeOfFox, fox.sizeOfFox);
foxLImg.src = foxL;

const foxUpImg: HTMLImageElement = new Image(fox.sizeOfFox, fox.sizeOfFox);
foxUpImg.src = foxUp;

const foxDownImg: HTMLImageElement = new Image(fox.sizeOfFox, fox.sizeOfFox);
foxDownImg.src = foxDown;

const fox2LImg: HTMLImageElement = new Image(fox.sizeOfFox, fox.sizeOfFox);
fox2LImg.src = fox2L;

const fox2UpImg: HTMLImageElement = new Image(fox.sizeOfFox, fox.sizeOfFox);
fox2UpImg.src = fox2Up;

const fox2DownImg: HTMLImageElement = new Image(fox.sizeOfFox, fox.sizeOfFox);
fox2DownImg.src = fox2Down;

let foxPic: HTMLImageElement = foxImg;
let foxPic2: HTMLImageElement = fox1Img;

function initFoxImg() {
    foxImg.onload = function () {
        drawFox(ctx);
    };
}

function initFoodImg() {
    foodImg.onload = function () {
        drawFood(ctx)
    };
}

function drawFox(ctx: CanvasRenderingContext2D | null) {    
    if (ctx) {
        ctx.drawImage(foxPic, fox.x, fox.y, fox.sizeOfFox, fox.sizeOfFox);
    }
}

function drawFlyFox(ctx: CanvasRenderingContext2D | null) {    
    if (ctx) {
        ctx.drawImage(foxPic2, fox.x, fox.y, fox.sizeOfFox, fox.sizeOfFox);
    }
}

function drawFood(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
        ctx.drawImage(foodImg, 605, 455, 40, 40);
    }
}


function getNewFoxPosition(position: MoveType) : FoxPosition {
    const newPosition: FoxPosition = {x: fox.x, y: fox.y};
    if (position === ActionSignal.ArrowUp) {
        newPosition.y = newPosition.y - board.sizeOfSingleField;
        foxPic = foxUpImg;
        foxPic2 = fox2UpImg;
    }
    else if (position === ActionSignal.ArrowDown) {
        newPosition.y = newPosition.y + board.sizeOfSingleField;
        foxPic = foxDownImg;
        foxPic2 = fox2DownImg;
    }

    else if (position === ActionSignal.ArrowLeft) {
        newPosition.x = newPosition.x - board.sizeOfSingleField;
        foxPic = foxLImg;
        foxPic2 = fox2LImg;
    }
    else if (position === ActionSignal.ArrowRight) {
        newPosition.x = newPosition.x + board.sizeOfSingleField;
        foxPic = foxImg;
        foxPic2 = fox1Img;
    }

    return newPosition;
}
function moveFox( newFoxPosition: FoxPosition) {
    const lastY = fox.y;
    const lastX = fox.x;
    fox.x = newFoxPosition.x;
    fox.y = newFoxPosition.y;
    drawFox(ctx);
    clearFox(lastX, lastY);
}


function turn() {
    window.addEventListener(Signal.Keydown, (e) => {
        position = e.key;

        const newPosition = getNewFoxPosition(position as MoveType);
        if (position in ActionSignal && !stopTheFox(newPosition)){
            clearFox(fox.x, fox.y);
            drawFlyFox(ctx);
            setTimeout(function(){ moveFox(newPosition);}, 100);
        }
    });
}


function clearFox(lastX: number, lastY: number) {
    if (ctx) {
        ctx.clearRect(lastX, lastY, fox.sizeOfFox, fox.sizeOfFox)
    } 
}
function resetFox() {
    fox.x = initFoxPositionX;
    fox.y = initFoxPositionY;
}

function stopTheFox(predictedFoxPosition :FoxPosition): boolean {
    let  stopTheFox = false;
    if (predictedFoxPosition.x > board.canvasHeight ||
        predictedFoxPosition.x < board.canvasMinHeight||
        predictedFoxPosition.y > board.canvasWidth ||
        predictedFoxPosition.y < board.canvasMinWidth) {
        stopTheFox = true;
    }

    return stopTheFox;
}

function initRestartBtn() {
    if (btn) {
        btn[0].addEventListener(Signal.Click, () => {
            if (ctx) {
                ctx.clearRect(fox.x, fox.y, fox.sizeOfFox, fox.sizeOfFox);
                resetFox()
                ctx.drawImage(foxImg, fox.x, fox.y, fox.sizeOfFox, fox.sizeOfFox);
            }
        });
    }
}

function boardInit() {
    initFoxImg();
    drawFox(ctx);
    initFoodImg();
    drawFood(ctx);
    initRestartBtn();
    turn();
}

boardInit();