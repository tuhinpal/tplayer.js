import { useRef, useEffect } from "react";
import tplayer, { destroyPlayer } from "tplayer.js"; // "../../../index";

export default function Player({ id = "tplayer", source, drm = null }) {
  const videoRef = useRef();

  useEffect(() => {
    tplayer({
      id,
      playerElem: videoRef.current,
      source,
      drm,
    });

    return () => destroyPlayer({ id: "homeplayer" });
  }, []);

  return (
    <div
      style={{
        // style this however you want
        width: "60vw",
      }}
    >
      {/* use ref or document.getElementById */}
      <video ref={videoRef}></video>
    </div>
  );
}
