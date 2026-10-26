# Exercises: Function Return Values and Rendering Data from JSON

Based on `fundamentals/lessons/3_function_rendering_data.js`.

For rendering tasks, use a small HTML page in the browser (like `fundamentals/lessons/index.html`) and put your code in a linked `.js` file.

---

## Basic

1. Write `triple(n)` that returns `n * 3`. Store the result of `triple(4)` in a variable and log it.
2. Write `fullName(first, last)` that returns the two names joined with a space. Log the return value (do not only `console.log` inside the function).
3. Write `isTeen(age)` that returns `true` if age is between 13 and 19 (inclusive), otherwise `false`. Call it with a few ages.
4. Write `grade(score)` with early returns: `"A"` if score ≥ 90, `"B"` if ≥ 80, otherwise `"C"`.
5. Call a function that has no `return`. Log what you get back (it should be `undefined`).

---

## Easy

6. Write `makeProduct(name, price)` that returns an object `{ name, price }`. Log the returned object's `name`.
7. Create a JS array `team` of at least two `{ name, role }` objects. Write `formatPerson(person)` that returns `"name — role"`. Log one formatted string.
8. In the HTML page, select `#team-list`, clear it (`innerHTML = ""`), then use a classic `for` loop (`for (let i = 0; i < team.length; i++)`) to create an `<li>` for each person, set `textContent` with `formatPerson`, and `appendChild` it. Do not use array methods (`forEach`, `map`, etc.).
9. Put the first team member into `#person-info` (e.g. `"Ada works as engineer"`) using properties from the array — not hardcoded text only.
10. Write `getActive(people)` that returns only items with `active: true`, using a classic `for` loop (no `filter`). Call it with a small array and log what it returns.

---

## Medium

11. Given this JSON string: `'[{"title":"HTML"},{"title":"CSS"},{"title":"JS"}]'`, use `JSON.parse` and log the second course's `title`.
12. Start with a JS object `{ city: "Berlin", country: "Germany" }`. Use `JSON.stringify` and log the result and its `typeof`.
13. Parse a JSON string of people (`name`, `role`, `active`). Draw them into `#team-list` the same way as exercise 8 (parse first, then a classic `for` loop).
14. Render only active people into a list: call `getActive` on parsed JSON, then use a classic `for` loop over what it **returns** and append `<li>` elements.
15. Combine return + render: write `renderList(items, elementId)` that takes an array and an element id, clears that element, and with a classic `for` loop appends one `<li>` per item (use a returned format string for each item's text). Call it with your array and `"team-list"`.
