export default function plyrOptions(configs) {
  let options = {
    autoplay: false,
    muted: false,
    loop: {
      active: false,
    },
    captions: {
      active: true,
      update: true,
    },
    invertTime: true,
    seekTime: 10,
    storage: { enabled: true, key: "tplayerjs" },
  };

  return options;
}
