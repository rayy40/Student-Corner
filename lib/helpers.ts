export const contractionsDict = {
  "won't": "will not",
  "can't": "cannot",
  "n't": " not",
  "'re": " are",
  "'s": " is",
  "'d": " would",
  "'ll": " will",
  "'t": " not",
  "'ve": " have",
  "'m": " am",
} as { [key: string]: string };

export const stopwords = [
  "i",
  "me",
  "my",
  "myself",
  "we",
  "our",
  "ours",
  "ourselves",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",
  "he",
  "him",
  "his",
  "himself",
  "she",
  "her",
  "hers",
  "herself",
  "it",
  "its",
  "itself",
  "they",
  "them",
  "their",
  "theirs",
  "themselves",
  "what",
  "which",
  "who",
  "whom",
  "this",
  "that",
  "these",
  "those",
  "am",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "having",
  "do",
  "does",
  "did",
  "doing",
  "a",
  "an",
  "the",
  "and",
  "but",
  "if",
  "or",
  "because",
  "as",
  "until",
  "while",
  "of",
  "at",
  "by",
  "for",
  "with",
  "about",
  "against",
  "between",
  "into",
  "through",
  "during",
  "before",
  "after",
  "above",
  "below",
  "to",
  "from",
  "up",
  "down",
  "in",
  "out",
  "on",
  "off",
  "over",
  "under",
  "again",
  "further",
  "then",
  "once",
  "here",
  "there",
  "when",
  "where",
  "why",
  "how",
  "all",
  "any",
  "both",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "no",
  "nor",
  "not",
  "only",
  "own",
  "same",
  "so",
  "than",
  "too",
  "very",
  "s",
  "t",
  "can",
  "will",
  "just",
  "don",
  "should",
  "now",
];

export const textColors = {
  default: "#37352F",
  gray: "#808080",
  brown: "#A52A2A",
  orange: "#FFA500",
  red: "#FF0000",
  green: "#008000",
  yellow: "#FFFF00",
  blue: "#0000FF",
  purple: "#800080",
  pink: "#FFC0CB",
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

export const essayOrBlogPrompt = (topic: string) => {
  return `${topic}.
  Format the response using Markdown, with '# Title','## Introduction','## Body' and '## Conclusion' headings to separate the paragraphs
  Also separate the heading under body using markdown.
  Word Limit should be maximum 400-500 words`;
};

export const creativeStoryPrompt = (topic: string) => {
  return `${topic}
  Format the response using Markdown, with '# Title' headings
  Word Limit should be maximum 400-500 words`;
};

export const prosAndCons = (topic: string) => {
  return `${topic}.
  Include up to 5 points for each category, with a brief description for each point. 
  Format the response using Markdown, with '## Pros' and '## Cons' headings to separate the lists`;
};

export const todoList = (topic: string) => {
  return `${topic}
  Format the response using Markdown, with '# Title' and list the tasks with checkboxes as shown below.
  - [ ]  Create a study schedule
  There should be a maximum of 10-12 tasks.
  `;
};

export const brainstormIdeas = (topic: string) => {
  return `${topic}
  Include up to 10 points with a brief description for each point.
  Format the response using Markdown.
  `;
};

export const pressRelease = (topic: string) => {
  return `${topic}
  Format the response using Markdown with '# Title' and '## Contact'.
  Contact(should be at the end):
  [Your Name]
  [Your Title]
  [Your Organization]
  [Phone number]
  [Email]
  Word Limit should be maximum 400-500 words
  `;
};
