const input = document.getElementById("searchInput");
const button = document.getElementById("searchButton");
const steps = [
  document.getElementById("step1"),
  document.getElementById("step2"),
  document.getElementById("step3"),
];

const defaultQuery = "how to search google";
const params = new URLSearchParams(window.location.search);
const incoming = params.get("q");
const query = (incoming && incoming.trim()) || defaultQuery;

let typingIndex = 0;
let typingTimer;

function setActiveStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });
}

function typeNextChar() {
  if (typingIndex <= query.length) {
    input.value = query.slice(0, typingIndex);
    typingIndex += 1;
    typingTimer = window.setTimeout(typeNextChar, 70);
  } else {
    const stepDelay = 3000 / 3;
    button.classList.add("clicked");
    window.setTimeout(() => setActiveStep(1), stepDelay);
    window.setTimeout(() => setActiveStep(2), stepDelay * 2);
    window.setTimeout(redirectToGoogle, 3000);
  }
}

function redirectToGoogle() {
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  window.location.href = url;
}

function startDemo() {
  input.value = "";
  typingIndex = 0;
  setActiveStep(0);
  window.setTimeout(typeNextChar, 500);
}

button.addEventListener("click", redirectToGoogle);

startDemo();
