import dashjs from "dashjs";
import Hls from "hls.js";

export default function parseConfigs(configurations) {
  if (!configurations.playerElem) {
    throw new Error("No player element found");
  }

  let source = "",
    sourcetype = "normal";

  if (!configurations.source.dash && !configurations.source.hls) {
    throw new Error("No source found");
  }

  // browser support
  const support = {
    hls: Hls.isSupported(),
    dash: dashjs.supportsMediaSource(),
  };

  console.log("tplayer support =>", support);

  if (support.hls && configurations.source.hls) {
    source = configurations.source.hls;
    sourcetype = "hls";
  } else if (support.dash && configurations.source.dash) {
    source = configurations.source.dash;
    sourcetype = "dash";
  } else {
    throw new Error("Provider not supported");
  }

  return {
    refId: configurations.id || "tplayer",
    playerElem: configurations.playerElem,
    source,
    sourcetype, // dash | hls
  };
}
