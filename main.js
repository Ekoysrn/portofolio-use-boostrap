(() => {
  "use strict";

  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = (theme) => {
    if (theme === "auto") {
      document.documentElement.setAttribute(
        "data-bs-theme",
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
    updateImageTheme(theme); //memperbarui image
  };

  setTheme(getPreferredTheme());

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector("#bd-theme");

    if (!themeSwitcher) {
      return;
    }

    const themeSwitcherText = document.querySelector("#bd-theme-text");
    const activeThemeIcon = document.querySelector(".theme-icon-active use");
    const btnToActive = document.querySelector(
      `[data-bs-theme-value="${theme}"]`
    );
    const svgOfActiveBtn = btnToActive
      .querySelector("svg use")
      .getAttribute("href");

    document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
      element.classList.remove("active");
      element.setAttribute("aria-pressed", "false");
    });

    btnToActive.classList.add("active");
    btnToActive.setAttribute("aria-pressed", "true");
    activeThemeIcon.setAttribute("href", svgOfActiveBtn);
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
    themeSwitcher.setAttribute("aria-label", themeSwitcherLabel);

    if (focus) {
      themeSwitcher.focus();
    }
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });

  window.addEventListener("DOMContentLoaded", () => {
    showActiveTheme(getPreferredTheme());

    document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const theme = toggle.getAttribute("data-bs-theme-value");
        setStoredTheme(theme);
        setTheme(theme);
        showActiveTheme(theme, true);
      });
    });
  });
})();

// function to change icon theme techstack
function updateImageTheme(selectedTheme) {
  // get all element image
  const images = document.querySelectorAll(".techs");
  const most = document.querySelector(".most");

  // mendeteksi apakah tema gelap diaktifkan
  const theme =
    selectedTheme === "auto"
      ? window.matchMedia("(prefers-color-scheme : dark)").matches
        ? "dark"
        : "light"
      : selectedTheme;

  images.forEach((img) => {
    if (img.src.includes("?theme=")) {
      img.src = img.src.replace(/(theme=)(light|dark)/, `$1${theme}`);
    }
  });
}


document.addEventListener("DOMContentLoaded", () =>
  updateImageTheme(getPreferredTheme())
);

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => updateImageTheme(getPreferredTheme()));

// setInterval

setInterval(myTime, 1000);

function myTime() {
  const d = new Date();
  document.getElementById("time").innerHTML = d.toLocaleTimeString();
}

// Array of texts to display with auto writing effect
const texts = ["Software Engineer", "Web Developer"];

// DOM element to display the text
const targetElement = document.getElementById("type");

let currentTextIndex = 0;
let charIndex = 0;
const delay = 100; // Delay between each character
const pauseBetweenTexts = 2000; // Pause between texts

// Function to clear the current text
function clearText() {
  targetElement.innerHTML = "";
}

// Function to simulate typing effect
function autoWrite() {
  if (charIndex < texts[currentTextIndex].length) {
    targetElement.innerHTML += texts[currentTextIndex].charAt(charIndex);
    charIndex++;
    setTimeout(autoWrite, delay);
  } else {
    setTimeout(() => {
      currentTextIndex = (currentTextIndex + 1) % texts.length;
      charIndex = 0;
      clearText();
      setTimeout(autoWrite, delay);
    }, pauseBetweenTexts);
  }
}

// Start the auto writing effect
autoWrite();
