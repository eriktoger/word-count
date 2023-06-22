import { ChangeEvent, useState } from "react";
import "./App.css";

const createPaddedText = (text: string) => {
  const hashMap: { [key: string]: number } = {};
  const words = text.split(/\s+/);

  let maxWord = words[0] ?? "";
  let maxCount = 0;

  for (const word of words) {
    const cleanWord = word.replace(/[.?!,]$/, "").toLowerCase();
    if (cleanWord === "" || cleanWord === "\n" || !/[a-zA-Z]/.test(cleanWord)) {
      continue;
    }
    if (hashMap[cleanWord]) {
      hashMap[cleanWord]++;
      if (hashMap[cleanWord] > maxCount) {
        maxCount = hashMap[cleanWord];
        maxWord = cleanWord;
      }
    } else {
      hashMap[cleanWord] = 1;
    }
  }

  return text.replace(
    new RegExp(`\\b${maxWord}\\b`, "gi"),
    (match) => `foo${match}bar`
  );
};

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
