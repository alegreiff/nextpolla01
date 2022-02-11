import styles from "../styles/Home.module.css";

import { signIn, signOut } from "next-auth/react";
import logoQ from "../public/qatar.png";
import Image from "next/image";
import { Button } from "@mui/material";

export default function Home() {
  const addData = async () => {
    const datas = {
      nombre: "Jaime",
      apellido: "De Greiff",
      tiempo: new Date(),
    };
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

  const createUser = async () => {
    const email = "alegreiff@gmail.com";
    const password = "jaime123";
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Algo salió remal");
    }
    console.log("DATA", data);
    return data;
  };
  const loggIn = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      email: "alegreiff@gmail.com",
      password: "jaime123",
    });
    console.log(result);
  };
  const logOUT = () => {
    signOut({ redirect: false });
  };
  const logGugol = async () => {
    const result = await signIn("google", {
      redirect: false,
    });
    console.log(result);
  };

  return (
    <div className={styles.container}>
      <main>{/* <Image src={logoQ} alt="Logo" /> */}</main>
      <Button onClick={addData}>Insert</Button>
      <Button onClick={createUser}>Create USER</Button>
      <Button onClick={loggIn}>Login</Button>
      <Button onClick={logOUT}>Logout</Button>
      <Button onClick={logGugol}>Googol</Button>
    </div>
  );
}

/* 
Integración Material UI Next.js
https://dev.to/hajhosein/nextjs-mui-v5-tutorial-2k35
*/
