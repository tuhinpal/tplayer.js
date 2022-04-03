import Head from "next/head";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
const Player = dynamic(import("../component/player"), { ssr: false });

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>tplayer example</title>
        <meta name="description" content="A tplayer nextjs example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Player
          source={{
            dash: "https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/mpds/11331.mpd",
            hls: "https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/m3u8s/11331.m3u8",
          }}
          drm={{
            widevine: {
              url: "https://widevine-proxy.appspot.com/proxy",
              headers: {
                // "T-Header": "You can send header like this",
              },
            },
            playready: {
              url: "https://playready.directtaps.net/pr/svc/rightsmanager.asmx?PlayRight=1&ContentKey=EAtsIJQPd5pFiRUrV9Layw==",
              headers: {
                // "T-Header": "You can send header like this",
              },
            },
          }}
        />

        {/* Normal without drm (HLS is preferred) */}

        {/* <Player
          source={{
            dash: "https://dash.akamaized.net/dash264/TestCases/2c/qualcomm/1/MultiResMPEG2.mpd",
            hls: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
          }}
        /> */}
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
