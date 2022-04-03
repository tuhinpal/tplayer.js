export default async function loadPlyrCss(configs) {
  await new Promise((resolve) => {
    const plyrCss = document.createElement("link");
    plyrCss.rel = "stylesheet";
    plyrCss.href = "https://cdn.plyr.io/3.6.12/plyr.css";
    document.head.appendChild(plyrCss);
    plyrCss.onload = resolve;
  });

  applyAdditionalUiConfigs(configs);

  return true;
}

function applyAdditionalUiConfigs(configs) {
  if (configs.ui.mainColor) {
    applyStyle("--plyr-color-main", configs.ui.mainColor);
  }

  function applyStyle(name, value) {
    configs.playerElem.style.setProperty(name, value);
  }
}
