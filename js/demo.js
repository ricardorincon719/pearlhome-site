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
const isPortuguese = document.documentElement.lang.toLowerCase().startsWith("pt");

const copy = isPortuguese
  ? {
      appliedScene: "Cena {scene} aplicada",
      lightOn: "Luz acesa",
      lightOff: "Luz apagada",
      turnOn: "Acender luz",
      turnOff: "Apagar luz",
      brightness: "Ajustar brilho {value}%",
      brightnessSet: "Brilho definido em {value}%",
      temperature: "Alterar temperatura {value}",
      temperatureSet: "Temperatura {value} aplicada",
      changeColor: "Alterar cor da luz",
      colorUpdated: "Cor principal atualizada",
      searchMusic: "Buscar música {track}",
      trackReady: "Canal {track} preparado",
      searchSent: "Busca enviada ao motor de música",
      searchState: "Busca",
      alreadyOff: "A luz já está apagada",
      alreadyOn: "A luz já está acesa",
      commandReceived: "Comando recebido"
    }
  : {
      appliedScene: "Escena {scene} aplicada",
      lightOn: "Luz encendida",
      lightOff: "Luz apagada",
      turnOn: "Encender luz",
      turnOff: "Apagar luz",
      brightness: "Ajustar brillo {value}%",
      brightnessSet: "Brillo establecido en {value}%",
      temperature: "Cambiar temperatura {value}",
      temperatureSet: "Temperatura {value} aplicada",
      changeColor: "Cambiar color de luz",
      colorUpdated: "Color principal actualizado",
      searchMusic: "Buscar música {track}",
      trackReady: "Canal {track} preparado",
      searchSent: "Búsqueda enviada al motor de música",
      searchState: "Búsqueda",
      alreadyOff: "La luz ya esta apagada",
      alreadyOn: "La luz ya esta encendida",
      commandReceived: "Comando recibido"
    };

const scenes = {
  relax: {
    label: "Relax",
    color: "#5ce1ff",
    rgb: "92, 225, 255",
    stage: "#07111f",
    brightness: 78,
    command: isPortuguese ? "Ativar cena relax" : "Activar escena relax"
  },
  reading: {
    label: isPortuguese ? "Leitura" : "Lectura",
    color: "#ffd36a",
    rgb: "255, 211, 106",
    stage: "#17120a",
    brightness: 88,
    command: isPortuguese ? "Ativar cena leitura" : "Activar escena lectura"
  },
  night: {
    label: isPortuguese ? "Noite" : "Noche",
    color: "#9f7cff",
    rgb: "159, 124, 255",
    stage: "#080615",
    brightness: 34,
    command: isPortuguese ? "Ativar cena noite" : "Activar escena noche"
  },
  energy: {
    label: isPortuguese ? "Energia" : "Energía",
    color: "#8dffb8",
    rgb: "141, 255, 184",
    stage: "#06140d",
    brightness: 96,
    command: isPortuguese ? "Ativar cena energia" : "Activar escena energía"
  }
};

const temperatures = {
  warm: {
    color: "#ffd8a3",
    rgb: "255, 216, 163"
  },
  neutral: {
    color: "#fff7e8",
    rgb: "255, 247, 232"
  },
  cool: {
    color: "#d8f2ff",
    rgb: "216, 242, 255"
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

function setTemperature(temperatureName) {
  const temperature = temperatures[temperatureName];
  if (!temperature) return;

  body.style.setProperty("--lamp-color", temperature.color);
  body.style.setProperty("--lamp-rgb", temperature.rgb);
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

  addLog(scene.command, copy.appliedScene.replace("{scene}", scene.label.toLowerCase()));
}

powerButton.addEventListener("click", () => {
  lightOn = !lightOn;
  powerButton.classList.toggle("active", lightOn);
  powerButton.textContent = lightOn ? "ON" : "OFF";
  powerButton.setAttribute("aria-pressed", String(lightOn));
  body.classList.toggle("light-off", !lightOn);
  addLog(lightOn ? copy.turnOn : copy.turnOff, lightOn ? copy.lightOn : copy.lightOff);
});

brightnessSlider.addEventListener("input", (event) => {
  setBrightness(event.target.value);
});

brightnessSlider.addEventListener("change", (event) => {
  lightOn = true;
  body.classList.remove("light-off");
  powerButton.classList.add("active");
  powerButton.textContent = "ON";
  addLog(
    copy.brightness.replace("{value}", event.target.value),
    copy.brightnessSet.replace("{value}", event.target.value)
  );
});

document.querySelectorAll("[data-temperature]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-temperature]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    setTemperature(button.dataset.temperature);
    addLog(
      copy.temperature.replace("{value}", button.textContent),
      copy.temperatureSet.replace("{value}", button.textContent.toLowerCase())
    );
  });
});

document.querySelectorAll(".swatch").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".swatch").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const color = button.dataset.color;
    const rgb = color.match(/\w\w/g).map((hex) => parseInt(hex, 16)).join(", ");
    setAccent(color, rgb);
    addLog(copy.changeColor, copy.colorUpdated);
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
    addLog(
      copy.searchMusic.replace("{track}", button.dataset.track),
      copy.trackReady.replace("{track}", button.dataset.track)
    );
  });
});

musicSearch.addEventListener("change", () => {
  if (!musicSearch.value.trim()) return;
  trackState.textContent = copy.searchState;
  addLog(copy.searchMusic.replace("{track}", musicSearch.value.trim()), copy.searchSent);
});

commandForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const command = commandInput.value.trim();
  if (!command) return;

  const normalized = command.toLowerCase();

  if (normalized.includes("relax")) {
    activateScene("relax");
  } else if (normalized.includes("lectura") || normalized.includes("leitura")) {
    activateScene("reading");
  } else if (normalized.includes("noche") || normalized.includes("noite")) {
    activateScene("night");
  } else if (normalized.includes("energia") || normalized.includes("energía")) {
    activateScene("energy");
  } else if (normalized.includes("apagar")) {
    if (lightOn) powerButton.click();
    else addLog(command, copy.alreadyOff);
  } else if (normalized.includes("encender") || normalized.includes("acender")) {
    if (!lightOn) powerButton.click();
    else addLog(command, copy.alreadyOn);
  } else {
    addLog(command, copy.commandReceived);
  }

  commandInput.value = "";
});

setBrightness(brightnessSlider.value);
setTemperature(document.querySelector("[data-temperature].active")?.dataset.temperature || "warm");
