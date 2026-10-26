# Exercises: Objects, Arrays, and the DOM

Based on `fundamentals/lessons/2_objects_arrays_dom.js`.

For DOM tasks, use a small HTML page in the browser (like `fundamentals/lessons/index.html`) and put your code in a linked `.js` file.

---

## Basic

1. Create an array `fruits` with `"apple"`, `"banana"`, and `"cherry"`. Log the first item and `fruits.length`.
2. Add `"date"` at the end with `fruits[fruits.length] = "date"`. Remove the last item by setting `fruits.length = fruits.length - 1`. Log the array after each change. Do not use `push` / `pop`.
3. Loop over `fruits` with a classic `for` loop (`for (let i = 0; i < fruits.length; i++)`) and log each index and value.
4. Create an object `book` with `title`, `author`, and `pages`. Log `book.title` (dot) and `book["author"]` (brackets).
5. Change `book.pages` to a new number and add a `genre` property. Log the whole object.

---

## Easy

6. Loop over `fruits` again with a classic `for` loop and log only each fruit value (no index needed in the log).
7. Create an array `pets` of objects, each with `name` and `type` (at least two). Log the first pet's name and the second pet's type.
8. In the HTML page, select the element with id `heading` using `getElementById`. Set its `textContent` to `"Hello DOM"`.
9. Select the first element with class `mainText` using `querySelector`. Change its text. Then select all `.mainText` with `querySelectorAll` and log how many there are.
10. Create a new `<li>` with `createElement`, set its `textContent` to a fruit name, and `appendChild` it to an existing `<ul>` (give that list an id in your HTML).

---

## Medium

11. Write a function `listNames(people)` that takes an array of objects with a `name` property and logs each name with a classic `for` loop (no `forEach`). Call it with your `pets` or `team` array.
12. For each item in `querySelectorAll(".mainText")`, set `style.color` to `"blue"` for the first one and `"gray"` for the rest (use a `for` loop and an `if`).
13. Select a heading, `classList.add("highlight")`, then `toggle` it twice and `remove` it. Check in DevTools that the class comes and goes.
14. Set a heading with `innerHTML` so it contains a word wrapped in a `<span>`. Then try the same idea with `textContent` and notice the difference in the page.
15. Build a list from an array of objects: with a classic `for` loop over a `team` array of `{ name, role }`, create an `<li>`, set `textContent` to `"Name — role"`, and append it to `#team-list`.
