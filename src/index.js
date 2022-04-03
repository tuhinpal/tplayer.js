import parseConfigs from "./helpers/parseConfigs";
import loadPlyrCss from "./helpers/loadPlyrCss";

export default async function tplayer(
  configurations = {
    playerElem: null,
    source: { dash: null, hls: null },
    drm: {
      widevine: {
        url: "",
        headers: {},
      },
      playready: {
        url: "",
        headers: {},
      },
    },
  }
) {
  try {
    await loadPlyrCss();
    const configs = parseConfigs(configurations);
    console.log("tplayer configs parsed =>", configs);

    switch (configs.sourcetype) {
      case "hls": {
        let hlsJS = await import(
          /* webpackChunkName: "hls" */ "./providers/hls"
        );
        hlsJS.default(configs);
        break;
      }
      case "dash": {
        let dashJS = await import(
          /* webpackChunkName: "dash" */ "./providers/dash"
        );
        dashJS.default(configs);
        break;
      }
      default: {
        throw new Error(`${configs.sourcetype} is not supported`);
      }
    }
  } catch (error) {
    console.error("tplayer error =>", error);
  }
}

export function destroyPlayer({ id = null }) {
  try {
    if (id) {
      const player = window[`tplayer_${id}_player`];
      if (player) {
        console.log(player);
        player.destroy();
        delete window[`tplayer_${id}_player`];

        // also delete dash and hls instances
        if (window.dash) {
          window.dash.destroy();
          delete window.dash;
        }
        if (window.hls) {
          window.hls.destroy();
          delete window.hls;
        }
      }
      console.log("tplayer player destroyed =>", id);
    }
  } catch (_) {}
}

window.tplayer = tplayer;
window.destroyPlayer = destroyPlayer;
