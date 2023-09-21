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

const essayOrBlogPrompt = `You are a helpful assistant that writes essays or blogs on the topic provided with.
  Format the response using Markdown, with '# Title','## Introduction','## Body' and '## Conclusion' headings to separate the paragraphs.
  Also separate the heading under body using markdown.
  Keep your words within 400-500.`;

const creativeStoryPrompt = `You are a helpful assistant that writes creatives stories on the topic provided with.
  Format the response using Markdown, with '# Title' headings
  Keep your words within 400-500.`;

const prosAndCons = `You are a helpful assistan that writes pros and cons on the topic provided with.
  Include up to 5 points for each category, with a brief description for each point. 
  Format the response using Markdown, with '## Pros' and '## Cons' headings to separate the lists`;

const todoList = `You are a helpful assistant that provides me with a todo list on the topic provided with.
  Format the response using Markdown, with '# Title' and list the tasks with checkboxes as shown below.
  - [ ]  Create a study schedule
  Keep your lists within 10.
  `;

const brainstormIdeas = `You are an English professor that provides me with brainstorm ideas on the topic provided with.
  Include up to 10 points with a brief description for each point.
  Format the response using Markdown.
  `;

const pressRelease = `You are an English professor that writes press releases on the topic provided with.
  Format the response using Markdown with '# Title' and '## Contact'.
  Contact(should be at the end):
  [Your Name]
  [Your Title]
  [Your Organization]
  [Phone number]
  [Email]
  Keep your words within 400-500
  `;

export const generatePrompt = (topic: string) => {
  if (topic.includes("essay" || "blog")) {
    return essayOrBlogPrompt;
  } else if (topic.includes("creative story")) {
    return creativeStoryPrompt;
  } else if (topic.includes("pros and cons")) {
    return prosAndCons;
  } else if (topic.includes("todo list")) {
    return todoList;
  } else if (topic.includes("press release")) {
    return pressRelease;
  } else if (topic.includes("brainstorm")) {
    return brainstormIdeas;
  } else {
    return "You are an English professor, so help me write stuff related to the topic. Keep your words within 400-500. Format the response in markdown.";
  }
};
