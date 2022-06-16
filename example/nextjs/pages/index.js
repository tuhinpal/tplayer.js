import Head from "next/head";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
const Player = dynamic(import("../component/player"), { ssr: false });

export default function Home() {
  const playerConfig = {
    id: "tplayernext",
    source: {
      dash: "https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/mpds/11331.mpd",
      hls: "https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/m3u8s/11331.m3u8",
    },
    sourceHeaders: {
      dash: {
        // "T-Header": "You can send header like this",
      },
      hls: {
        // "T-Header": "You can send header like this",
      },
    },
    drm: {
      widevine: {
        url: "https://cwip-shaka-proxy.appspot.com/no_auth", // Widevine license URL
        headers: {
          // "T-Header": "You can send header like this",
        },
      },
      playready: {
        url: "https://playready.directtaps.net/pr/svc/rightsmanager.asmx?PlayRight=1&ContentKey=EAtsIJQPd5pFiRUrV9Layw==", // Playready license URL
        headers: {
          // "T-Header": "You can send header like this",
        },
      },
    },
    ui: {
      mainColor: "red",
    },
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>tplayer example</title>
        <meta name="description" content="A tplayer nextjs example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Player config={playerConfig} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/tuhinpal/tplayer"
          target="_blank"
          rel="noopener noreferrer"
        >
          tplayer on Github
        </a>
      </footer>
    </div>
  );
}
