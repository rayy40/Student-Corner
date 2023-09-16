interface Quiz {
  yourAnswer: string;
  answer: string;
  options?: string[] | undefined;
  question: string;
}

import { stemmer } from "@/lib/porterStemmingAlgo";
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
export const MCQformat = [
  {
    question: "Who is Luke Skywalker's father?",
    options: ["Obi-Wan Kenobi", "Emperor Palpatine", "Darth Vadar", "Yoda"],
    answer: "Darth Vadar",
  },
];

export const ShortAnswerformat = [
  {
    question: "How do amphibians breathe?",
    answer:
      "Most amphibians breathe through their skin, which allows them to absorb oxygen directly from the environment. They also have lungs for breathing when on land.",
  },
];

export const TrueFalseformat = [
  {
    question:
      "Amphibians are cold-blooded animals, meaning their body temperature varies with their environment.",
    options: ["True", "False"],
    answer: "True",
  },
];

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
  text = text.toLowerCase();
  let words = text.split(/\W+/);
  words = [...new Set(words)];
  words = words.filter((word) => !stopwords.includes(word));
  let stemmedWords = words.map((word) => stemmer(word));
  return stemmedWords;
};
