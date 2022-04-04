import dashjs from "dashjs";
import Hls from "hls.js";

export default function parseConfigs(configurations) {
  if (!configurations.playerElem) {
    throw new Error("No player element found");
  }

  let source = "",
    sourcetype = "normal",
    drm = null;

  if (!configurations.source.dash && !configurations.source.hls) {
    throw new Error("No source found");
  }

  // check #1: browser support
  const support = {
    hls: Hls.isSupported(),
    dash: dashjs.supportsMediaSource(),
  };

  // check #2: DRM
  // check which drm is supported
  if (configurations.drm) {
    if (!configurations.drm.widevine && !configurations.drm.playready)
      throw new Error(
        "No DRM found, please check your configuration or {drm: null}"
      );

    source = configurations.source.dash;
    sourcetype = "dash";
    drm = configurations.drm;
  } else {
    if (support.hls && configurations.source.hls) {
      source = configurations.source.hls;
      sourcetype = "hls";
    } else if (support.dash && configurations.source.dash) {
      source = configurations.source.dash;
      sourcetype = "dash";
    } else {
      throw new Error("Provider not supported");
    }
  }

  return {
    refId: configurations.id || "tplayer",
    playerElem: configurations.playerElem,
    source,
    sourcetype, // dash | hls
    drm,
    ui: {
      mainColor: configurations.ui?.mainColor || "#00b3ff", // The primary UI color.
    },
    sourceHeaders: {
      dash: configurations.sourceHeaders?.dash || null,
      hls: configurations.sourceHeaders?.hls || null,
    },
  };
}
