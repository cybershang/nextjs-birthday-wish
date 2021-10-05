import React from "react";
import Head from "next/head";
import styles from "../styles/Name.module.css";
import { useRouter } from "next/router";
import ConfettiGenerator from "confetti-js";
import messages from "../utils/birthdayWishes.js";
import useTheme from '../hooks/useTheme'
import CopyLinkButton from '../components/CopyLinkButton'

const title = (name) => {

  const wish = 'Happy Birthday ' + name + "!"
  const letters = []

  for (let i = 0; i < wish.length; i++) {
    const letter = wish.charAt(i)

    if (i > 14)
      letters.push(<span key={i} style={{ "--i": i + 1 }} className={styles.span}>{letter}</span>)
    else
      letters.push(<span key={i} style={{ "--i": i + 1 }}>{letter}</span>)
  }

  return (
    <h1 className={styles.title} style={{ "--wish-length": wish.length }}>
      {letters.map((letter) => letter)}
    </h1>
  )
}

const Wish = ({ history }) => {

  const router = useRouter();
  const { name } = router.query; // gets both name & color id in form of array [name,colorId]
  const color = name ? name[1] : 0;//extracting colorId from name

  const { setTheme } = useTheme();

  React.useEffect(() => {
    // Theme Change
    setTheme(color);
    // Confetti
    const confettiSettings = {
      target: "canvas",
      start_from_edge: true,
    };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    return () => confetti.clear();
  }, [color]);
  // function for randomly picking the message from messages array
  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Happy Birthday {name && name[0]}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <canvas className={styles.canvas} id="canvas"></canvas>

      <main className={styles.animate}>
        <div className={styles.main}>
          {title(name && name[0])}
        </div>
        <p className={styles.desc}>
          {messages[randomNumber(0, messages.length)].value}
        </p>
        <div className={styles.buttonContainer}>
          {history[0] == "/" ? <CopyLinkButton /> : ""}
          <button onClick={() => router.push('/')} className={styles.button}>&larr; Create a wish</button>
        </div>
      </main>
    </div>
  );
};

export default Wish;
