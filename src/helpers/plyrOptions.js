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
    controls: [
      "play-large", // The large play button in the center
      "rewind", // Rewind by the seek time (default 10 seconds)
      "play", // Play/pause playback
      "fast-forward", // Fast forward by the seek time (default 10 seconds)
      "progress", // The progress bar and scrubber for playback and buffering
      "current-time", // The current time of playback
      "mute", // Toggle mute
      "volume", // Volume control
      "captions", // Toggle captions
      "settings", // Settings menu
      "fullscreen", // Toggle fullscreen
    ],
  };

  return options;
}
