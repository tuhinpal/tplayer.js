import Plyr from "plyr";
import dashjs from "dashjs";
import plyrOptions from "../helpers/plyrOptions";

export default function dashJS(configs) {
  try {
    var playerOptions = plyrOptions(configs);

    const dash = dashjs.MediaPlayer().create();

    if (configs.sourceHeaders.dash) {
      dash.extend("RequestModifier", () => {
        return {
          modifyRequestHeader: (xhr) => {
            Object.keys(configs.sourceHeaders.dash).forEach((key) => {
              xhr.setRequestHeader(key, configs.sourceHeaders.dash[key]);
            });

            return xhr;
          },
          modifyRequestURL: (url) => {
            return url;
          },
        };
      });
    }

    dash.initialize(configs.playerElem, configs.source, false); // false = !autoplay
    dash.updateSettings({
      streaming: {
        abr: {
          autoSwitchBitrate: {
            audio: false,
            video: false,
          },
        },
        lowLatencyEnabled: true,
      },
    });

    if (configs.drm) {
      let drmConfig = {};

      if (configs.drm.widevine) {
        let widevineConfig = {
          serverURL: configs.drm.widevine.url,
        };

        if (configs.drm.widevine.headers) {
          widevineConfig.httpRequestHeaders = configs.drm.widevine.headers;
        }

        drmConfig["com.widevine.alpha"] = widevineConfig;
      }

      if (configs.drm.playready) {
        let playreadyConfig = {
          serverURL: configs.drm.playready.url,
        };

        if (configs.drm.playready.headers) {
          playreadyConfig.httpRequestHeaders = configs.drm.playready.headers;
        }

        drmConfig["com.microsoft.playready"] = playreadyConfig;
      }

      dash.setProtectionData(drmConfig);
    }

    dash.on("streamInitialized", function () {
      const availableQualities = dash
        .getBitrateInfoListFor("video")
        .map((l) => l.height);
      playerOptions.quality = {
        default: availableQualities[0].height,
        options: availableQualities,
        forced: true,
        onChange: function (newQuality) {
          dash.getBitrateInfoListFor("video").forEach((level) => {
            if (level.height === newQuality) {
              dash.setQualityFor("video", level.qualityIndex);
            }
          });
        },
      };
      const player = new Plyr(configs.playerElem, playerOptions);
      window[`tplayer_${configs.refId}_player`] = player;
    });
    dash.attachView(configs.playerElem);
    window.dash = dash;
  } catch (error) {
    throw new Error("Dash.js error", error);
  }
}
