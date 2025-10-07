let title = document.getElementById("title");
title.innerHTML = "Hello World!";
let input = document.getElementById("number-input");

let result = 0;

let resultOutput = document.getElementById("result");
resultOutput.textContent = `The result is: ${result}`;


function changeTitle() {
  title.innerHTML = "Title Changed!";
}

let fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

function listFruits() {
  let fruitListDiv = document.getElementById("fruit-list");
  for (let fruit of fruits) {
    let p = document.createElement("p");
    p.textContent = fruit;
    fruitListDiv.appendChild(p);
  }
}

listFruits();

function addOne() {
  result = result + 1;
  resultOutput.textContent = `The result is: ${result}`;
}

function subtractOne() {
  result = result - 1;
  resultOutput.textContent = `The result is: ${result}`;
}

function changeValue() {
  result = parseInt(input.value);
  resultOutput.textContent = `The result is: ${result}`;
}