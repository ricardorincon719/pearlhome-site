const body = document.body;
const powerButton = document.querySelector("#powerButton");
const brightnessSlider = document.querySelector("#brightnessSlider");
const brightnessValue = document.querySelector("#brightnessValue");
const activeSceneLabel = document.querySelector("#activeSceneLabel");
const terminal = document.querySelector("#terminal");
const commandForm = document.querySelector("#commandForm");
const commandInput = document.querySelector("#commandInput");
const trackState = document.querySelector("#trackState");
const musicSearch = document.querySelector("#musicSearch");

const scenes = {
  relax: {
    label: "Relax",
    color: "#5ce1ff",
    rgb: "92, 225, 255",
    stage: "#07111f",
    brightness: 78,
    command: "Activar escena relax"
  },
  reading: {
    label: "Lectura",
    color: "#ffd36a",
    rgb: "255, 211, 106",
    stage: "#17120a",
    brightness: 88,
    command: "Activar escena lectura"
  },
  night: {
    label: "Noche",
    color: "#9f7cff",
    rgb: "159, 124, 255",
    stage: "#080615",
    brightness: 34,
    command: "Activar escena noche"
  },
  energy: {
    label: "Energía",
    color: "#8dffb8",
    rgb: "141, 255, 184",
    stage: "#06140d",
    brightness: 96,
    command: "Activar escena energía"
  }
};

let lightOn = true;

function addLog(command, response) {
  const commandLine = document.createElement("p");
  const responseLine = document.createElement("p");

  commandLine.innerHTML = `<span>&gt;</span> ${command}`;
  responseLine.className = "ok";
  responseLine.textContent = `✓ ${response}`;

  terminal.append(commandLine, responseLine);
  terminal.scrollTop = terminal.scrollHeight;
}

function setBrightness(value) {
  brightnessValue.textContent = `${value}%`;
  body.style.setProperty("--brightness", value / 100);
}

function setAccent(color, rgb) {
  body.style.setProperty("--primary", color);
  body.style.setProperty("--primary-rgb", rgb);
}

function activateScene(sceneName) {
  const scene = scenes[sceneName];

  document.querySelectorAll(".scene-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.scene === sceneName);
  });

  setAccent(scene.color, scene.rgb);
  body.style.setProperty("--stage", scene.stage);
  activeSceneLabel.textContent = scene.label;
  brightnessSlider.value = scene.brightness;
  setBrightness(scene.brightness);
  lightOn = true;
  body.classList.remove("light-off");
  powerButton.classList.add("active");
  powerButton.textContent = "ON";
  powerButton.setAttribute("aria-pressed", "true");

  addLog(scene.command, `Escena ${scene.label.toLowerCase()} aplicada`);
}

powerButton.addEventListener("click", () => {
  lightOn = !lightOn;
  powerButton.classList.toggle("active", lightOn);
  powerButton.textContent = lightOn ? "ON" : "OFF";
  powerButton.setAttribute("aria-pressed", String(lightOn));
  body.classList.toggle("light-off", !lightOn);
  addLog(lightOn ? "Encender luz" : "Apagar luz", lightOn ? "Luz encendida" : "Luz apagada");
});

brightnessSlider.addEventListener("input", (event) => {
  setBrightness(event.target.value);
});

brightnessSlider.addEventListener("change", (event) => {
  lightOn = true;
  body.classList.remove("light-off");
  powerButton.classList.add("active");
  powerButton.textContent = "ON";
  addLog(`Ajustar brillo ${event.target.value}%`, `Brillo establecido en ${event.target.value}%`);
});

document.querySelectorAll("[data-temperature]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-temperature]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    addLog(`Cambiar temperatura ${button.textContent}`, `Temperatura ${button.textContent.toLowerCase()} aplicada`);
  });
});

document.querySelectorAll(".swatch").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".swatch").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const color = button.dataset.color;
    const rgb = color.match(/\w\w/g).map((hex) => parseInt(hex, 16)).join(", ");
    setAccent(color, rgb);
    addLog("Cambiar color de luz", "Color principal actualizado");
  });
});

document.querySelectorAll(".scene-button").forEach((button) => {
  button.addEventListener("click", () => activateScene(button.dataset.scene));
});

document.querySelectorAll("[data-track]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-track]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    trackState.textContent = button.dataset.track;
    musicSearch.value = button.dataset.track;
    addLog(`Buscar música ${button.dataset.track}`, `Canal ${button.dataset.track} preparado`);
  });
});

musicSearch.addEventListener("change", () => {
  if (!musicSearch.value.trim()) return;
  trackState.textContent = "Search";
  addLog(`Buscar música ${musicSearch.value.trim()}`, "Búsqueda enviada al Music Engine");
});

commandForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const command = commandInput.value.trim();
  if (!command) return;

  const normalized = command.toLowerCase();

  if (normalized.includes("relax")) {
    activateScene("relax");
  } else if (normalized.includes("lectura")) {
    activateScene("reading");
  } else if (normalized.includes("noche")) {
    activateScene("night");
  } else if (normalized.includes("energia")) {
    activateScene("energy");
  } else if (normalized.includes("apagar")) {
    if (lightOn) powerButton.click();
    else addLog(command, "La luz ya esta apagada");
  } else if (normalized.includes("encender")) {
    if (!lightOn) powerButton.click();
    else addLog(command, "La luz ya esta encendida");
  } else {
    addLog(command, "Comando recibido");
  }

  commandInput.value = "";
});

setBrightness(brightnessSlider.value);
