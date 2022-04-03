import Plyr from "plyr";
import dashjs from "dashjs";

export default function dashJS(configs) {
  try {
    const dash = dashjs.MediaPlayer().create();
    dash.initialize(configs.playerElem, configs.source, false); // false = !autoplay

    var defaultOptions = {
      autoplay: false,
      muted: false,
      loop: {
        active: false,
      },
      captions: {
        active: true,
        update: true,
      },
    };

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

    dash.on("streamInitialized", function () {
      const availableQualities = dash
        .getBitrateInfoListFor("video")
        .map((l) => l.height);
      defaultOptions.quality = {
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
      const player = new Plyr(configs.playerElem, defaultOptions);
      window[`tplayer_${configs.refId}_player`] = player;
    });
    dash.attachView(configs.playerElem);
    window.dash = dash;
  } catch (error) {
    throw new Error("Dash.js error", error);
  }
}
