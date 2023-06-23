import { ChangeEvent, useState } from "react";
import "./App.css";
import { createPaddedText } from "./createPaddedText";

function App() {
  const [rawText, setRawText] = useState("");
  const [paddedText, setPaddedText] = useState("");

  const readFile = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target) {
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result ?? "";
      if (typeof text === "string") {
        setRawText(text);
        setPaddedText(createPaddedText(text));
      }
    };
    e.target.files?.[0] && reader.readAsText(e.target.files[0]);
  };

  return (
    <>
      <input type="file" onChange={readFile} />
      <p> Raw Text: </p>
      <div style={{ whiteSpace: "pre-line" }}>{rawText}</div>
      <p> Padded Text: </p>
      <div style={{ whiteSpace: "pre-line" }}>{paddedText}</div>
    </>
  );
}

export default App;
