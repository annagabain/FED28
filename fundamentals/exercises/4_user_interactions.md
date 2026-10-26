# Exercises: User Interactions (Events)

Based on `fundamentals/lessons/4_user_interactions.js`.

Use a small HTML page in the browser (like `fundamentals/lessons/index.html`) with buttons, inputs, and lists, and put your code in a linked `.js` file. Point the script `src` at your file (or at `4_user_interactions.js` while studying the lesson).

---

## Basic

1. Select a button with `getElementById`. Add a `"click"` listener that logs `"clicked"` to the console.
2. On button click, set an element's `textContent` to `"Hello from the button"`.
3. Write a named function `sayHi` that sets a message element's text to `"Hi!"`. Pass `sayHi` to `addEventListener("click", sayHi)` (do not call it yourself with `()`).
4. In a click handler, log `event.type` and `event.target`. Confirm you see `"click"` and the button element.
5. Select a text `<input>`. On `"input"`, log `input.value` every time the user types.

---

## Easy

6. Mirror typing: on `"input"`, copy the input's `value` into a `<p>`'s `textContent` (e.g. `"You typed: …"`).
7. Add a click listener that changes an element's `style.backgroundColor` (pick any color).
8. Start with an array of at least two strings. Write `renderList(items)` that clears `#items-list` and, with a classic `for` loop, appends one `<li>` per item. Call it once on load.
9. Add an "Add" button and an input. On click, if the input is not `""`, append the value to the array with `items[items.length] = …`, clear the input, and call `renderList` again. Do not use `push`.
10. Give a box a class in CSS (e.g. `.is-on`). On button click, `classList.toggle("is-on")` and update the box text to show on/off.

---

## Medium

11. Listen for `"submit"` on a `<form>`. Call `event.preventDefault()`, then read a field's `value` and show it in a result element. Confirm the page does not reload.
12. Combine filter + click: keep an array of `{ name, done }` tasks. Render them into a list. Add a button that re-renders only items where `done` is `false` (classic `for` loop to build the filtered array — no `filter`).
13. Add a listener on the list (`#items-list`) for `"click"`. If `event.target` is an `<li>`, set that item's `textContent` to end with `" ✓"` (or toggle a class on it).
14. On `"keydown"` for an input, if `event.key === "Enter"`, run the same add-item logic as exercise 9 (and prevent the form submit if the input sits inside a form).
15. Write `wireButton(buttonId, messageId, text)` that finds both elements by id and adds a click listener so the message element shows `text`. Call it twice with different ids/strings.
