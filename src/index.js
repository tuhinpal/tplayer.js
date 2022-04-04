import parseConfigs from "./helpers/parseConfigs";
import loadPlyrCss from "./helpers/loadPlyrCss";

/**
 * Initialize the tplayer https://github.com/tuhinpal/tplayer.js#options-
 *
 * @param {object} configurations - Configuration object
 * @property {string} id - The unique id of the player
 * @property {any} configurations.playerElem - The player element from the DOM
 * @property {object} obj.source - The source object
 * @property {string} obj.source.dash - DASH source url
 * @property {string} obj.source.hls - HLS source url
 * @property {object|null} obj.sourceHeaders - Additional XHR headers
 * @property {object|null} obj.sourceHeaders.dash - Additional XHR headers for DASH
 * @property {object|null} obj.sourceHeaders.hls - Additional XHR headers for HLS
 * @property {object|null} drm - DRM configuration object
 * @property {object|null} drm.widevine - Widevine DRM configuration object
 * @property {string} drm.widevine.url - Widevine DRM license server url
 * @property {object} drm.widevine.headers - Widevine DRM additional headers E.g. { 'X-Custom-Header': 'value' }
 * @property {object} drm.playready - Playready DRM configuration object
 * @property {string} drm.playready.url - Playready DRM license server url
 * @property {object} drm.playready.headers - Playready DRM additional headers E.g. { 'X-Custom-Header': 'value' }
 * @property {object} ui - UI configuration object
 * @property {object} ui.mainColor - Main color of the player
 *
 * Example configuration:
 * @example
 * const options = {
 *   id: "tplayerhtml",
 *   playerElem: document.getElementById("tplayer"),
 *   source: {
 *     dash: "https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/mpds/11331.mpd",
 *     hls: "https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/m3u8s/11331.m3u8",
 *   },
 *   drm: {
 *     widevine: {
 *       url: "https://widevine-proxy.appspot.com/proxy", // Widevine license URL
 *       headers: {
 *         // "T-Header": "You can send header like this",
 *       },
 *     },
 *     playready: {
 *       url: "https://playready.directtaps.net/pr/svc/rightsmanager.asmx?PlayRight=1&ContentKey=EAtsIJQPd5pFiRUrV9Layw==", // Playready license URL
 *       headers: {
 *         // "T-Header": "You can send header like this",
 *       },
 *     },
 *   },
 *   ui: {
 *     mainColor: "red",
 *   },
 * };
 */
export async function tplayer(configurations) {
  try {
    const configs = parseConfigs(configurations);
    await loadPlyrCss(configs);
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

export function getPlayer({ id }) {
  try {
    if (!id) throw new Error("id is required");
    const player = window[`tplayer_${id}_player`];
    if (player) {
      return player;
    } else {
      throw new Error("player is destroyed or not found");
    }
  } catch (e) {
    console.error("get tplayer error =>", e);
    return null;
  }
}

export default tplayer;

window.tplayer = tplayer;
window.destroyPlayer = destroyPlayer;
window.getPlayer = getPlayer;
