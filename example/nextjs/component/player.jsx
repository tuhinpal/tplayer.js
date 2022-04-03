import { useRef, useEffect } from "react";
import tplayer, { destroyPlayer } from "../../../index"; // import tplayer, { destroyPlayer } from 'tplayer';

export default function Player({ id = "tplayer", source }) {
  const videoRef = useRef();

  useEffect(() => {
    tplayer({
      id,
      playerElem: videoRef.current,
      source,
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
