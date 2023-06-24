import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { createPaddedText } from "./createPaddedText";
import init, { create_padded_text } from "wasm-lib";

function App() {
  const [rawText, setRawText] = useState("");
  const [paddedText, setPaddedText] = useState("");
  const [paddedTextRust, setPaddedTextRust] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const readFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target) {
      return;
    }

    setIsLoading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result ?? "";
        if (typeof text === "string") {
          setRawText(text);
          console.time("Typescript");
          setPaddedText(createPaddedText(text));
          console.timeEnd("Typescript");
          console.time("Rust");
          setPaddedTextRust(create_padded_text(text));
          console.timeEnd("Rust");
          setIsLoading(false);
        }
      };
      e.target.files?.[0] && reader.readAsText(e.target.files[0]);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Is loading...</p>;
  }

  return (
    <>
      <input type="file" onChange={readFile} />
      <p> Raw Text: </p>
      <div style={{ whiteSpace: "pre-line" }}>{rawText}</div>
      <p> Padded Text: </p>
      <div style={{ whiteSpace: "pre-line" }}>{paddedText}</div>
      <p> Padded Text Rust: </p>
      <div style={{ whiteSpace: "pre-line" }}>{paddedTextRust}</div>
    </>
  );
}

export default App;
