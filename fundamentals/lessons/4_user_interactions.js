// ============================================================
// Lesson 4: User Interactions (Events)
// Open fundamentals/lessons/index.html in a browser
// (set the script src to 4_user_interactions.js)
// ============================================================

// --- Events ---
// An event is something that happens in the page: a click, a key press,
// typing in a field, submitting a form, and so on.
// User interactions are handled by listening for those events and
// running a function (the "handler") when they occur.

// addEventListener(eventName, handler)
//   eventName — a string like "click", "input", "submit"
//   handler   — a function that runs when the event happens

// These APIs exist only in the browser — not in Node.

if (typeof document === "undefined") {
  console.log("Open fundamentals/lessons/index.html in a browser (load this file).");
} else {
  // --- Click ---
  // The most common interaction: the user clicks a button (or any element).

  const clickButton = document.getElementById("click-button");
  const clickMessage = document.getElementById("click-message");

  function handleClick() {
    clickMessage.textContent = "Button was clicked!";
    console.log("click");
  }

  clickButton.addEventListener("click", handleClick);

  // You can also pass an anonymous function:
  // clickButton.addEventListener("click", function () {
  //   clickMessage.textContent = "Clicked!";
  // });

  // --- The event object ---
  // The browser passes an event object into the handler.
  // Useful properties: type, target (the element that received the event).

  const colorButton = document.getElementById("color-button");
  const colorTarget = document.getElementById("color-target");

  colorButton.addEventListener("click", function (event) {
    console.log(event.type); // "click"
    console.log(event.target); // the button element
    colorTarget.style.backgroundColor = "#5b9fd4";
    colorTarget.textContent = "Color changed via click";
  });

  // --- Reading input values ---
  // Forms and fields store what the user typed in .value
  // "input" fires on every keystroke; "change" often fires when the field loses focus.

  const nameInput = document.getElementById("name-input");
  const nameOutput = document.getElementById("name-output");

  nameInput.addEventListener("input", function () {
    const typed = nameInput.value;
    nameOutput.textContent = "Hello, " + typed;
  });

  // --- Buttons that use data ---
  // Combine interactions with arrays/objects from earlier lessons:
  // listen → read or update data → redraw the page.

  const items = ["HTML", "CSS", "JavaScript"];
  const itemsList = document.getElementById("items-list");
  const addButton = document.getElementById("add-button");
  const itemInput = document.getElementById("item-input");

  function renderItems(list) {
    itemsList.innerHTML = "";
    for (let i = 0; i < list.length; i++) {
      const li = document.createElement("li");
      li.textContent = list[i];
      itemsList.appendChild(li);
    }
  }

  renderItems(items);

  addButton.addEventListener("click", function () {
    const text = itemInput.value;
    if (text === "") {
      return; // early exit — nothing to add
    }
    items[items.length] = text;
    itemInput.value = ""; // clear the field
    renderItems(items);
  });

  // --- Form submit ---
  // A <form> "submit" event fires when the user clicks submit (or presses Enter).
  // By default the browser reloads the page — call event.preventDefault() to stop that
  // so your JS can handle the data instead.

  const demoForm = document.getElementById("demo-form");
  const formResult = document.getElementById("form-result");

  demoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const note = document.getElementById("note-input").value;
    formResult.textContent = "Saved note: " + note;
    console.log("submit prevented; note =", note);
  });

  // --- Toggle with a click ---
  // classList.toggle is a common response to a user action.

  const toggleButton = document.getElementById("toggle-button");
  const toggleBox = document.getElementById("toggle-box");

  toggleButton.addEventListener("click", function () {
    toggleBox.classList.toggle("is-on");
    if (toggleBox.classList.contains("is-on")) {
      toggleBox.textContent = "On";
    } else {
      toggleBox.textContent = "Off";
    }
  });
}
