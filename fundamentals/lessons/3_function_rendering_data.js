// ============================================================
// Lesson 3: Function Return Values and Rendering Data from JSON
// Returns & JSON: node fundamentals/lessons/3_function_rendering_data.js
// Rendering: open fundamentals/lessons/index.html in a browser
// ============================================================

// --- Return values ---
// A function can send a result back with return.
// Whatever comes after return is the value of calling the function.
// Code after return in the same function does not run.

function add(a, b) {
  return a + b;
}

const sum = add(2, 3);
console.log(sum); // 5 — we stored the returned value

// You can use a return value right away (no variable needed)
console.log(add(10, 4)); // 14

// Functions can return any type: number, string, boolean, object, array…
function makeGreeting(name) {
  return "Hello, " + name;
}

function isAdult(age) {
  return age >= 18;
}

function createUser(name, age) {
  return {
    name: name,
    age: age,
  };
}

console.log(makeGreeting("Ada")); // "Hello, Ada"
console.log(isAdult(20)); // true
console.log(createUser("Ada", 36)); // { name: "Ada", age: 36 }

// Early return — leave the function as soon as you know the answer
function labelScore(points) {
  if (points >= 50) {
    return "pass";
  }
  return "fail";
}

console.log(labelScore(72)); // "pass"
console.log(labelScore(40)); // "fail"

// If you omit return, the function gives back undefined
function shout(message) {
  console.log(message.toUpperCase());
  // no return
}

const result = shout("hi");
console.log(result); // undefined

// Returning a value is different from only logging inside the function.
// return lets the caller decide what to do with the data.

function double(n) {
  return n * 2;
}

const doubled = double(7);
console.log(doubled + 1); // 15 — we can keep using the value

// --- Drawing an interface from an array ---
// UI is often built from data: loop an array, create elements, put them on the page.
// Start with a normal JS array of objects (no JSON yet).

const team = [
  { name: "Ada", role: "engineer", active: true },
  { name: "Grace", role: "lead", active: false },
  { name: "Alan", role: "researcher", active: true },
];

// Build a display string from one item and return it
function formatPerson(person) {
  return person.name + " — " + person.role;
}

console.log(formatPerson(team[0])); // "Ada — engineer"

// Helper that returns filtered data — caller can render or log it
// Use a classic for loop (index), not array methods like filter / map / forEach
function getActivePeople(list) {
  const active = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].active) {
      active[active.length] = list[i];
    }
  }
  return active;
}

console.log(getActivePeople(team));

// "Rendering" / "drawing" means turning data into HTML on the page.
// These APIs exist only in the browser — not in Node.
// Open index.html (which loads script.js) to see them live.

if (typeof document === "undefined") {
  console.log("DOM examples skipped — open fundamentals/lessons/index.html in a browser.");
} else {
  // 1) Draw a full list from the array
  const list = document.getElementById("team-list");
  list.innerHTML = ""; // clear old content

  for (let i = 0; i < team.length; i++) {
    const li = document.createElement("li");
    li.textContent = formatPerson(team[i]);
    list.appendChild(li);
  }

  // 2) Draw only what a function returns
  const activeList = document.getElementById("colors-list");
  activeList.innerHTML = "";

  const activeTeam = getActivePeople(team);
  for (let i = 0; i < activeTeam.length; i++) {
    const li = document.createElement("li");
    li.textContent = activeTeam[i].name + " (active)";
    activeList.appendChild(li);
  }

  // 3) Draw one object's fields into a single element
  const info = document.getElementById("person-info");
  info.textContent = team[0].name + " works as " + team[0].role;
}

// --- JSON ---
// Same idea as above, but data often arrives as text (API, file, string).
// JSON (JavaScript Object Notation) is that text format.
// It looks a lot like JS objects/arrays, but it is a string until you parse it.
// Common rules: double quotes for keys and strings; no functions; no trailing commas.

const jsonText = `[
  { "name": "Ada", "role": "engineer", "active": true },
  { "name": "Grace", "role": "lead", "active": false },
  { "name": "Alan", "role": "researcher", "active": true }
]`;

console.log(typeof jsonText); // "string"

// JSON.parse — turn a JSON string into a real JS value (array/object)
const people = JSON.parse(jsonText);
console.log(people);
console.log(people[0].name); // "Ada"

// After parse, you render the same way as with team above:
// loop people → createElement → textContent → appendChild

// JSON.stringify — turn a JS value into a JSON string (e.g. to save or send)
const asText = JSON.stringify(people);
console.log(typeof asText); // "string"
console.log(asText);

// Pretty-print with spacing (second argument null, third argument 2)
console.log(JSON.stringify(people[0], null, 2));

// Reuse the same helpers — they work on any matching array
console.log(getActivePeople(people));
console.log(formatPerson(people[0])); // "Ada — engineer"
