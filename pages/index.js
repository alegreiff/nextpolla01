import styles from "../styles/Home.module.css";

import logoQ from "../public/qatar.png";
import Image from "next/image";
import { Button } from "@mui/material";
import { ClosedCaptionDisabledOutlined } from "@mui/icons-material";

export default function Home() {
  const addData = async () => {
    const datas = { nombre: "Jaime", apellido: "De Greiff" };
    const response = await fetch("/api/mongo", {
      method: "POST",
      body: JSON.stringify(datas),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  };
  return (
    <div className={styles.container}>
      <main>
        <Image src={logoQ} alt="Logo" />
      </main>
      <Button onClick={addData}>Insert</Button>
    </div>
  );
}

/* 
Integración Material UI Next.js
https://dev.to/hajhosein/nextjs-mui-v5-tutorial-2k35
*/
