// ============================================================
// 1. GET THE HTML ELEMENTS WE NEED
// ============================================================
// getElementById() finds an element using its id in the HTML.
// We save each element in a variable so we can work with it later.
const display = document.getElementById("display"); // The large number on screen
const history = document.getElementById("history"); // The smaller calculation above it
const keys = document.getElementById("keys"); // The container holding all buttons
// ============================================================
// 2. REMEMBER THE CALCULATOR'S CURRENT STATE
// ============================================================
// current is a STRING because button presses are typed one digit at a time.
// For example, pressing "1" and then "2" should give "12", not 1 + 2 = 3.
let current = "0";
// previous stores the FIRST number when the user chooses an operator.
// null means we do not have a first number saved yet.
let previous = null;
// operator stores "+", "-", "*", or "/".
// null means no operation has been selected.
let operator = null;
// This is true after an operator or "=" is pressed.
// It tells us to REPLACE the display with the next digit, rather than append it.
let startNewNumber = false;
// ============================================================
// 3. SHOW THE CURRENT NUMBER
// ============================================================
function updateDisplay() {
// textContent changes the text inside the HTML element.
// Whenever current changes, call this to update what the user sees.
    display.textContent = current;
}
// ============================================================
// 4. CLEAR EVERYTHING (AC)
// ============================================================
function clearAll() {
// Reset the variables to the same values they had on page load.
    current = "0";
    previous = null;
    operator = null;
    startNewNumber = false;
// Also clear the old calculation shown above the main display.
    history.textContent = "";
// Changing a variable does not automatically update the HTML.
    updateDisplay();
}
// ============================================================
// 5. HANDLE NUMBER BUTTONS (0-9)
// ============================================================
function inputDigit(digit) {
// If the previous answer was invalid (for example, division by zero),
// reset before accepting a new number.
    if (current === "Error") clearAll();
    if (startNewNumber) {
// Example: press 8, +, 2.
// After +, we want "2", not "82".
        current = digit;
        startNewNumber = false;
// If there is no operator, we are starting a completely new problem
// after a previous "=" result, so remove the old calculation history.
        if (operator === null) history.textContent = "";
    } else if (current === "0") {
// Replace the initial zero, so pressing 5 displays "5", not "05".
        current = digit;
    } else if (current === "-0") {
// If the user changed 0 to -0, keep the minus sign when typing.
        current = "-" + digit;
    } else if (current.length < 15) {
// Build a multi-digit number by adding the new digit to the string.
// Example: "1" + "2" becomes "12".
// Limit the length to keep the number readable on the screen.
        current += digit;
    }
    updateDisplay();
}
// ============================================================
// 6. HANDLE THE DECIMAL POINT
// ============================================================
function inputDecimal() {
    if (current === "Error") clearAll();
    if (startNewNumber) {
// If the user begins the next number with '.', show '0.' instead.
        current = "0.";
        startNewNumber = false;
        if (operator === null) history.textContent = "";
    } else if (!current.includes(".")) {
// Only add a decimal point if one does not already exist.
// Without this check, users could type an invalid number like "2.3.4".
        current += ".";
    }
    updateDisplay();
}
// ============================================================
// 7. MAKE OPERATORS LOOK NICE IN THE HISTORY
// ============================================================
function symbol(value) {
// JavaScript uses * and / for multiplication and division,
// but × and ÷ are easier for people to read on the display.
    if (value === "*") return "×";
    if (value === "/") return "÷";
    if (value === "-") return "−";
    return "+";
}
// ============================================================
// 8. HANDLE +, -, ×, ÷ BUTTONS
// ============================================================
function selectOperator(nextOperator) {
    if (current === "Error") return;
// Allow calculations to be chained, such as 5 + 2 + 3.
// When the second + is pressed, calculate 5 + 2 first.
    if (operator !== null && !startNewNumber) {
        calculate();
        if (current === "Error") return;
    }
// Convert the displayed STRING into a NUMBER before doing arithmetic.
// We save it because the next digits will replace current.
    previous = Number(current);
// Remember which calculation the user wants to perform.
    operator = nextOperator;
// The NEXT digit should start the second number.
    startNewNumber = true;
// Example history: "8 +".
    history.textContent = current + " " + symbol(operator);
}
// ============================================================
// 9. CALCULATE THE ANSWER (=)
// ============================================================
function calculate() {
// We need a first number, an operator, and a second number.
// startNewNumber is still true if the user has not typed the second one.
// return stops the function early when the expression is incomplete.
    if (operator === null || previous === null || startNewNumber) return;
// current is text, so turn it into a number for actual arithmetic.
    const second = Number(current);
// Save a readable version of the expression BEFORE we clear any variables.
    const expression = previous + " " + symbol(operator) + " " + current + " =";
// We declare result here so every operator can assign to it.
    let result;
    if (operator === "+") result = previous + second;
    if (operator === "-") result = previous - second;
    if (operator === "*") result = previous * second;
    if (operator === "/") result = previous / second;
// Division by zero produces Infinity (or NaN for 0 / 0).
// Number.isFinite() checks that the answer is a normal, finite number.
// toPrecision(12) also removes most visible floating-point artifacts,
// such as 0.30000000000000004 instead of 0.3.
// Convert back to a string because the display and digit input use text.
    if (Number.isFinite(result)) {
        current = String(Number(result.toPrecision(12)));
    } else {
        current = "Error";
    }
// Keep the completed expression above the answer.
    history.textContent = expression;
// The calculation is finished, so forget the saved first number/operator.
    previous = null;
    operator = null;
// If the user presses another digit, start a NEW number instead of
// appending that digit to the answer. (A new operator can reuse the answer.)
    startNewNumber = true;
    updateDisplay();
}
// ============================================================
// 10. DELETE THE LAST DIGIT (BACKSPACE)
// ============================================================
function backspace() {
    if (current === "Error") {
        clearAll();
        return;
    }
// If we are waiting for the next number, there is nothing new to delete.
    if (startNewNumber) return;
// slice(0, -1) returns the text without its last character.
// If deleting would leave nothing (or just '-'), show 0 instead.
    if (current.length <= 1 || (current.length === 2 && current[0] === "-")) {
        current = "0";
    } else {
        current = current.slice(0, -1);
    }
    updateDisplay();
}
// ============================================================
// 11. CHANGE THE SIGN (+/-)
// ============================================================
function changeSign() {
    if (current === "Error") return;
// If it starts with '-', remove that sign; otherwise add one.
// Example: "25" becomes "-25", and "-25" becomes "25".
    if (current[0] === "-") {
        current = current.slice(1);
    } else {
        current = "-" + current;
    }
    updateDisplay();
}
// ============================================================
// 12. CONVERT TO A PERCENTAGE (%)
// ============================================================
function percent() {
    if (current === "Error") return;
// Basic calculator percentage: divide the displayed number by 100.
// Example: 25 becomes 0.25.
    const result = Number(current) / 100;
    current = String(Number(result.toPrecision(12)));
    updateDisplay();
}
// ============================================================
// 13. SEND SPECIAL BUTTONS TO THE RIGHT FUNCTION
// ============================================================
function runAction(action) {
// HTML buttons use data-action values like "clear" or "equals".
// This function translates those strings into function calls.
    if (action === "clear") clearAll();
    if (action === "decimal") inputDecimal();
    if (action === "equals") calculate();
    if (action === "backspace") backspace();
    if (action === "sign") changeSign();
    if (action === "percent") percent();
}
// ============================================================
// 14. LISTEN FOR MOUSE / TOUCH CLICKS
// ============================================================
// Instead of adding a separate event listener to every button,
// we listen once on the parent element containing ALL the buttons.
// Click events "bubble up" from a clicked button to its parent.
keys.addEventListener("click", function (event) {
// event.target is the part of the page that was clicked.
// closest("button") finds the button even if its child was clicked.
    const button = event.target.closest("button");
// Ignore clicks on the empty space between buttons.
    if (!button) return;
// data-digit="7" in HTML becomes button.dataset.digit === "7".
// !== undefined matters because the digit "0" must also work.
    if (button.dataset.digit !== undefined) {
        inputDigit(button.dataset.digit);
    } else if (button.dataset.operator) {
// Example HTML: <button data-operator="+">+</button>
        selectOperator(button.dataset.operator);
    } else {
// Example HTML: <button data-action="clear">AC</button>
        runAction(button.dataset.action);
    }
});
// ============================================================
// 15. ALSO SUPPORT PHYSICAL KEYBOARD INPUT
// ============================================================
// This is separate from mouse clicks, but calls the SAME calculator
// functions so both input methods always behave consistently.
document.addEventListener("keydown", function (event) {
// Leave system/browser shortcuts such as Ctrl+C alone.
    if (event.ctrlKey || event.metaKey || event.altKey) return;
// event.key tells us which key the user pressed.
    const key = event.key;
    if (key >= "0" && key <= "9" && key.length === 1) {
        inputDigit(key);
    } else if (key === ".") {
        inputDecimal();
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        selectOperator(key);
    } else if (key === "Enter" || key === "=") {
        calculate();
    } else if (key === "Backspace") {
        backspace();
    } else if (key === "Escape" || key === "Delete") {
        clearAll();
    } else if (key === "%") {
        percent();
    } else {
// A key not used by the calculator should behave normally.
        return;
    }
// Prevent the browser's default response to recognized calculator keys.
    event.preventDefault();
});