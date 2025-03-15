import { useState } from "react";
import { Grid } from "../components/Grid/Grid";
import { Header } from "../components/Header/Header";
import styles from "./mint.module.css";
import FormData from "form-data";


export default function MintPage() {
  const [metadataUrl, setMetadataUrl] = useState(""); // New state for metadata URL
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  return (
    <div className={styles.wrap}>
      <Header />
      <Grid />    
    </div>
  );
}
