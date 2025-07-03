let display = document.getElementById("display");
let historyList = document.getElementById("historyList");
let justEvaluated = false; // Flag to detect if last action was "="

// Append number to display
function appendNumber(number) {
  if (justEvaluated) {
    display.value = "";
    justEvaluated = false;
  }
  display.value += number;
  animateButton(event);
}

// Append operator
function appendOperator(operator) {
  const lastChar = display.value.slice(-1);
  if (justEvaluated) {
    justEvaluated = false;
  }
  if ("+-*/%".includes(lastChar)) return;
  display.value += operator;
  animateButton(event);
}

// Decimal support
function appendDecimal() {
  const parts = display.value.split(/[\+\-\*\/\%]/);
  if (!parts[parts.length - 1].includes(".")) {
    if (justEvaluated) display.value = "";
    display.value += ".";
  }
  animateButton(event);
}

// Clear the display
function clearDisplay() {
  display.value = "";
  justEvaluated = false;
  animateButton(event);
}

// Square
function square() {
  if (display.value) {
    try {
      const result = eval(display.value);
      const squared = result * result;
      addToHistory(`${result}² = ${squared}`);
      display.value = squared;
      justEvaluated = true;
    } catch {
      display.value = "Error";
    }
  }
  animateButton(event);
}

// Square root
function sqrt() {
  try {
    const result = Math.sqrt(eval(display.value));
    addToHistory(`√(${display.value}) = ${result}`);
    display.value = result;
    justEvaluated = true;
  } catch {
    display.value = "Error";
  }
  animateButton(event);
}

// Exponential
function exp() {
  try {
    const result = Math.exp(eval(display.value));
    addToHistory(`e^(${display.value}) = ${result}`);
    display.value = result;
    justEvaluated = true;
  } catch {
    display.value = "Error";
  }
  animateButton(event);
}

// Logarithm
function log() {
  try {
    const result = Math.log10(eval(display.value));
    addToHistory(`log(${display.value}) = ${result}`);
    display.value = result;
    justEvaluated = true;
  } catch {
    display.value = "Error";
  }
  animateButton(event);
}

// Perform the final calculation
function calculate() {
  try {
    const result = eval(display.value);
    addToHistory(`${display.value} = ${result}`);
    display.value = result;
    justEvaluated = true;
  } catch {
    display.value = "Error";
  }
  animateButton(event);
}

// Add entry to history list
function addToHistory(entry) {
  const li = document.createElement("li");
  li.textContent = entry;
  li.classList.add("list-group-item", "py-1", "px-2");
  historyList.prepend(li);
}

// Handle history click event
function useHistory(e) {
  if (e.target.tagName === "LI") {
    const text = e.target.textContent;
    const parts = text.split("=");
    if (parts.length === 2) {
      display.value = parts[0].trim(); // Put expression back to display
      justEvaluated = false;
    }
  }
}
function power() {
  try {
    const input = display.value.split('^');

    // If there's already a ^ symbol, calculate directly
    if (input.length === 2) {
      const base = parseFloat(input[0]);
      const exponent = parseFloat(input[1]);
      const result = Math.pow(base, exponent);
      addToHistory(`${base}^${exponent} = ${result}`);
      display.value = result;
      justEvaluated = true;
    } else {
      // If not, add the ^ symbol to allow input like 2^3
      if (justEvaluated) {
        justEvaluated = false;
        display.value = "";
      }
      display.value += "^";
    }
  } catch {
    display.value = "Error";
  }
  animateButton(event);
}
function appendDoubleZero() {
  if (justEvaluated) {
    display.value = "";
    justEvaluated = false;
  }
  display.value += "00";
  animateButton(event);
}



// Animate button click
function animateButton(e) {
  const button = e.target;
  button.classList.add("clicked");
  setTimeout(() => {
    button.classList.remove("clicked");
  }, 150);
}
