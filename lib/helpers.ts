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
  Word Limit should be maximum 400-500 words.
  Format the response using HTML syntax.
  Ensure to include title, introduction, body and conclusion and divide the body content into three paragraphs, each having a subheading of h3 tag of its own.
  Do not include any image tags or anything, just write the body tag.`;
};

export const creativeStoryPrompt = (topic: string) => {
  return `${topic}
  Word Limit should be maximum 400-500 words.
  Format the response using HTML syntax.
  Ensure to include title and that if the p tag is consisting of more than 50 words, wrap it under a div tag.
  Do not include any image tags or anything, just write the body tag.`;
};

export const prosAndCons = (topic: string) => {
  return `${topic}.
  Include up to 5 points for each category, with a brief description for each point. 
  Format the response using HTML syntax with a title and pros and cons being in a h2 tag.`;
};

export const todoList = (topic: string) => {
  return `${topic}
  Format the response using HTML syntax and give a title and list the tasks with checkboxes.
  There should be a maximum of 10 tasks.
  `;
};

export const brainstormIdeas = (topic: string) => {
  return `${topic}
  Include up to 10 points with a brief description for each point.
  Format the response using HTML syntax and provide a title.
  `;
};

export const pressRelease = (topic: string) => {
  return `${topic}
  Format the response using HTML syntax and provide a title.
  Contact(should be at the end):
  [Your Name]
  [Your Title]
  [Your Organization]
  [Phone number]
  [Email]
  Word Limit should be maximum 400-500 words
  `;
};
