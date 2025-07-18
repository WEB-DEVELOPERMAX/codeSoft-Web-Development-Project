// script.js

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const backspace = document.getElementById('backspace');
const clear = document.getElementById('clear');
const equal = document.getElementById('equal');
const modeToggle = document.getElementById('modeToggle');
const clickSound = document.getElementById('clickSound');

let currentInput = "";

// Handle button click
buttons.forEach(button => {
  const value = button.getAttribute('data-value');
  if (value) {
    button.addEventListener('click', () => {
      playClick();
      currentInput += value;
      display.value = currentInput;
    });
  }
});

// Clear input
clear.addEventListener('click', () => {
  playClick();
  currentInput = "";
  display.value = "";
});

// Equal (=) click
equal.addEventListener('click', () => {
  playClick();
  try {
    const result = eval(currentInput);
    display.value = result;
    currentInput = result.toString();
  } catch (e) {
    display.value = "Error";
    currentInput = "";
  }
});

// Backspace ⌫
backspace.addEventListener('click', () => {
  playClick();
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput;
});

// Keyboard input support
document.addEventListener('keydown', (e) => {
  const allowedKeys = "0123456789+-*/.";
  if (allowedKeys.includes(e.key)) {
    playClick();
    currentInput += e.key;
    display.value = currentInput;
  } else if (e.key === 'Enter') {
    playClick();
    try {
      const result = eval(currentInput);
      display.value = result;
      currentInput = result.toString();
    } catch {
      display.value = "Error";
      currentInput = "";
    }
  } else if (e.key === 'Backspace') {
    playClick();
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  } else if (e.key === 'Escape') {
    playClick();
    currentInput = "";
    display.value = "";
  }
});

// Theme Toggle
modeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

// Button click sound
  function playClick() {
  const sound = document.getElementById("clickSound");
  if (sound) {
    // Try playing only after user interaction
    const playPromise = sound.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Autoplay blocked. Waiting for user interaction.");
      });
    }
  }
}
