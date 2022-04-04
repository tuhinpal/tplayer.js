import { useRef, useEffect } from "react";
import { tplayer, destroyPlayer } from "../../../index";

export default function Player({ config }) {
  const videoRef = useRef();

  useEffect(() => {
    tplayer({
      ...config,
      playerElem: videoRef.current,
    });

    return () => destroyPlayer({ id: config.id });
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
