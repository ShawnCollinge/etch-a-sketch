function calcSize(column) {
    return 500 / column;
}

function createGrid(width) {
    const size = calcSize(width);
    for (let i = 0; i < width; i++) {
        const outerDiv = document.createElement("div");
        outerDiv.classList.add("row", "unselectable");
        for (let j = 0; j < width; j++) {
            const innerDiv = document.createElement("div");
            innerDiv.classList.add("column", "unselectable");
            innerDiv.style.width = size + "px";
            innerDiv.style.height = size + "px";
            outerDiv.appendChild(innerDiv);
        }
        etchASketch.appendChild(outerDiv);
    }
    const rows = document.querySelectorAll(".column");
    rows.forEach((row) => {
        row.addEventListener('mouseover', (e) => {
            e.preventDefault();
            if (e.buttons == 1) {
                if (randomColour) {
                    chosenColour = getRandomColour();
                }
                row.style.backgroundColor = chosenColour;
            }
        });
    });
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getRandomColour() {
   return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function clear() {
    const rows = document.querySelectorAll(".column");
    rows.forEach((row) => {
        row.style.backgroundColor = "lightgrey";
    });
}

function updateBoard() {
    removeAllChildNodes(etchASketch);
    createGrid(rangeInput.value);
}

function initializeBoard() {
    updateBoard();
    rangeLabel.innerText = rangeInput.value + " x " + rangeInput.value;
}

function changeMode(newMode, name) {
    currentButton.classList.remove("selected");
    currentButton = newMode;
    currentButton.classList.add("selected");
    if (name === "rainbow") {
        randomColour = true;
    } else {
        randomColour = false;
        if (name === "eraser") {
            chosenColour = "lightgrey";
        } else {
            chosenColour = colourChoice.value;
        }
    }
}


const etchASketch = document.querySelector(".etch-a-sketch");
const rangeInput = document.querySelector("#rangeinput");
const clearBoard = document.querySelector("#clear");
const colourChoice = document.querySelector("#colorpicker");
const rangeLabel = document.querySelector("#rangeValue");
const colourMode = document.querySelector("#colour");
const rainbowMode = document.querySelector("#rainbow");
const eraserMode = document.querySelector("#eraser");
let randomColour = false;
let currentButton = colourMode;
currentButton.classList.add("selected");


let chosenColour = colourChoice.value;

initializeBoard();

eraserMode.onclick = (e) => changeMode(e.target, "eraser");
colourMode.onclick = (e) => changeMode(e.target, "colour");
rainbowMode.onclick = (e) => changeMode(e.target, "rainbow");

rangeInput.oninput = () => rangeLabel.innerText = rangeInput.value + " x " + rangeInput.value;
rangeInput.onchange = () => updateBoard();
clearBoard.onclick = () => clear();
colourChoice.oninput = (e) => chosenColour = e.target.value;
