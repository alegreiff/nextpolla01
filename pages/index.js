import styles from "../styles/Home.module.css";

import logoQ from "../public/qatar.png";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.container}>
      <main>
        <Image src={logoQ} alt="Logo" />
      </main>
    </div>
  );
}

/* 
Integración Material UI Next.js
https://dev.to/hajhosein/nextjs-mui-v5-tutorial-2k35
*/
