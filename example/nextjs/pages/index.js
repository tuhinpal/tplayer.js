import Head from "next/head";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
const Player = dynamic(import("../component/player"), { ssr: false });

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>tplyer example</title>
        <meta name="description" content="A tplayer nextjs example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Player
          source={{
            dash: "https://dash.akamaized.net/dash264/TestCases/2c/qualcomm/1/MultiResMPEG2.mpd",
            hls: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8", // if hls is supported it will be used
          }}
        />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/tuhinpal/tplayer.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          tplayer.js on Github
        </a>
      </footer>
    </div>
  );
}
