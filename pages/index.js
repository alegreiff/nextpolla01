import { Button } from "@mui/material";
import styles from "../styles/Home.module.css";
import { estadoHora } from "../zustand/horaPolla";

export default function Home() {
  const { hora, horaCatar, horaColombia, pais } = estadoHora();
  const handleButtonCatar = () => {
    horaCatar();
  };
  const handleButtonColombia = () => {
    horaColombia();
  };
  return (
    <div className={styles.container}>
      <main>
        <h4>NP 2022</h4>
        <h5>{pais}</h5>
        {hora > 0 ? (
          <Button variant="contained" onClick={handleButtonCatar}>
            Catar {hora}
          </Button>
        ) : (
          <Button variant="contained" onClick={handleButtonColombia}>
            Colombia {hora}
          </Button>
        )}
      </main>
    </div>
  );
}

/* 
Integración Material UI Next.js
https://dev.to/hajhosein/nextjs-mui-v5-tutorial-2k35
*/
