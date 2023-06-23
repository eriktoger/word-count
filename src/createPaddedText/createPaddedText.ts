export const createPaddedText = (text: string) => {
  const hashMap: { [key: string]: number } = {};
  const words = text.split(/\s+/);

  let maxWord = words[0] ?? "";
  let maxCount = 0;

  for (const word of words) {
    const cleanWord = word.replace(/[.?!,]$/, "").toLowerCase();
    if (!/[a-zA-Z]/.test(cleanWord)) {
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
