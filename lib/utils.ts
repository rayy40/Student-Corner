interface Quiz {
  yourAnswer: string;
  answer: string;
  options?: string[] | undefined;
  question: string;
}

import { stemmer } from "./porterStemmingAlgo";
import { stopwords, contractionsDict } from "./helpers";

export const calculateScore = (quizData: Quiz[]): number => {
  let score = 0;

  quizData.forEach((question) => {
    if (question.yourAnswer.toLowerCase() === question.answer.toLowerCase()) {
      score += 1;
    }
  });

  return score;
};

export const PreProcessText = (text: string) => {
  const pattern = new RegExp(
    `\\b(${Object.keys(contractionsDict).join("|")})\\b`,
    "gi"
  );

  // Use replace with a function to replace contractions with their expanded forms
  let refinedText = text.replace(pattern, (match) => {
    return contractionsDict[match.toLowerCase()];
  });
  refinedText = refinedText.toLowerCase();
  refinedText = refinedText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'!]/g, " ");
  refinedText = refinedText.replace(/^[a-zA-Z0-9]+$/, " ");

  const words = refinedText.split(/\s+/);

  // Filter out stopwords from the words array
  const filteredWords = words
    .filter((word) => !stopwords.includes(word))
    .map((word) => stemmer(word));

  // Reconstruct the string without stopwords and with stemmed words
  const cleanedString = filteredWords.join(" ");

  return cleanedString;
};

export const TokenizeText = (text: string) => {
  text = text.replace(/\s+/g, "");
  text = text.toLowerCase();
  let words = text.split(/\W+/);
  words = [...new Set(words)];
  words = words.filter((word) => !stopwords.includes(word));
  let stemmedWords = words.map((word) => stemmer(word));
  return stemmedWords;
};
