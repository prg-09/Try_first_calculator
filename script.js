
const challenge = document.getElementById("challenge");
const calculator = document.getElementById("calculator");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");

let a = 27, b = 4;

function showQuestion() {
  questionEl.textContent = a + " × " + b + " = ?";
  answerEl.value = "";
  feedbackEl.textContent = "";
  feedbackEl.className = "";
  nextBtn.classList.add("hidden");
  answerEl.focus();
}

function checkAnswer() {
  const guess = Number(answerEl.value);
  if (answerEl.value === "") return;
  if (guess === a * b) {
    feedbackEl.textContent = "Correct! You got it before the calculator did.";
    feedbackEl.className = "good";
  } else {
    feedbackEl.textContent = "Not quite! The answer is " + (a * b) + ".";
    feedbackEl.className = "bad";
  }
  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  a = Math.floor(Math.random() * 20) + 10;
  b = Math.floor(Math.random() * 8) + 2;
  showQuestion();
}

function openCalculator() {
  challenge.classList.add("hidden");
  calculator.classList.remove("hidden");
}

document.getElementById("checkBtn").addEventListener("click", checkAnswer);
answerEl.addEventListener("keydown", e => { if (e.key === "Enter") checkAnswer(); });
nextBtn.addEventListener("click", nextQuestion);
document.getElementById("skipBtn").addEventListener("click", openCalculator);

showQuestion();

const display = document.getElementById("display");
let current = "0";
let first = null;
let op = null;
let startNew = true;

function press(k) {
  if (k === "C") {
    current = "0"; first = null; op = null; startNew = true;
  } else if ("+-×÷".includes(k)) {
    first = parseFloat(current);
    op = k;
    startNew = true;
  } else if (k === "=") {
    if (op === null || first === null) return;
    const second = parseFloat(current);
    let res;
    if (op === "+") res = first + second;
    if (op === "-") res = first - second;
    if (op === "×") res = first * second;
    if (op === "÷") res = second === 0 ? "Error" : first / second;
    current = String(res);
    op = null;
    startNew = true;
  } else {
    if (startNew) { current = k === "." ? "0." : k; startNew = false; }
    else if (!(k === "." && current.includes("."))) current += k;
  }
  display.textContent = current;
}

document.querySelectorAll(".keys button").forEach(btn => {
  btn.addEventListener("click", () => press(btn.dataset.k));
});
