// ============================================================
// Lesson 2: Objects, Arrays, and the DOM
// Arrays & objects: node fundamentals/lessons/2_objects_arrays_dom.js
// DOM: open fundamentals/lessons/index.html in a browser
// ============================================================

// --- Arrays ---
// An array is an ordered list of values, written with [].
// Items are numbered from 0 (the index).

const colors = ["red", "green", "blue"];
const mixed = [1, "two", true];

console.log(colors[0]); // "red"
console.log(colors.length); // 3

// Common ways to change an array (no array methods — use index and length)
colors[colors.length] = "yellow"; // add at the end
console.log(colors); // ["red", "green", "blue", "yellow"]

colors.length = colors.length - 1; // remove the last item
console.log(colors); // ["red", "green", "blue"]

// Loop over each item with a classic for loop
for (let i = 0; i < colors.length; i++) {
  console.log(i, colors[i]);
}

// --- while loops ---
// A while loop repeats code as long as a condition is true.
// You must update something inside the loop, or it never stops.

let count = 0;
while (count < 3) {
  console.log(count); // 0, then 1, then 2
  count = count + 1; // move toward ending the loop
}

// --- Objects ---
// An object stores related data as key/value pairs, written with {}.
// Keys are like labels; values are the data.

const person = {
  name: "Ada",
  age: 36,
  isStudent: false,
  // A function stored on an object is called a method
  greet: function () {
    return "Hi";
  },
};

console.log(person.name); // "Ada" — dot notation
console.log(person["age"]); // 36 — bracket notation
console.log(person.greet()); // "Hi, I'm Ada" — call the method

// Change or add properties
person.age = 37;
person.city = "London";
console.log(person);

// Objects can hold arrays, and arrays can hold objects
const team = [
  { name: "Ada", role: "engineer" },
  { name: "Grace", role: "lead" },
];

console.log(team[0].name); // "Ada"
console.log(team[1].role); // "lead"

// --- The DOM ---
// The DOM (Document Object Model) is how JavaScript talks to the HTML page.
// These APIs exist only in the browser — not in Node.
// Open index.html (which loads script.js) to see them live.

if (typeof document === "undefined") {
  console.log("DOM examples skipped — open fundamentals/lessons/index.html in a browser.");
} else {
  // getElementById — find one element by its id attribute
  const heading = document.getElementById("heading");
  console.log(heading);

  // querySelector — first element that matches a CSS selector
  const firstParagraph = document.querySelector(".mainText");
  console.log(firstParagraph);

  // querySelectorAll — all elements that match (a NodeList, like an array)
  const paragraphs = document.querySelectorAll(".mainText");
  console.log(paragraphs.length);

  // textContent — plain text inside the element (safe, no HTML)
  heading.textContent = "Welcome";

  // innerHTML — HTML string inside the element (can create nested tags)
  heading.innerHTML = "Welcome <span>guest</span>";

  // classList — add, remove, or toggle CSS classes
  heading.classList.add("headingClass");
  heading.classList.toggle("headingClass"); // remove if present, add if not
  heading.classList.remove("headingClass");

  // createElement — make a new element in memory (not on the page yet)
  const newParagraph = document.createElement("p");
  newParagraph.textContent = "Our new paragraph";

  // appendChild — put the new element into the page
  heading.appendChild(newParagraph);

  // Example: style each .mainText differently
  for (let i = 0; i < paragraphs.length; i++) {
    if (i === 0) {
      paragraphs[i].textContent = "this is the first paragraph";
      paragraphs[i].style.color = "blue";
    } else {
      paragraphs[i].style.color = "yellow";
    }
  }
}
