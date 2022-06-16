export default async function setAdditionalConfigs(configs) {
  if (configs.captions) {
    // append a <track> element to video
    configs.captions.forEach((caption) => {
      const track = document.createElement("track");
      track.kind = "captions";
      track.label = caption.label;
      track.srclang = caption.language;
      track.src = caption.src;

      configs.playerElem.appendChild(track);
    });
  }

  return;
}
