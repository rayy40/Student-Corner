import axios from "axios";
import { load } from "cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const getTextContent = async (url: string) => {
  try {
    const response = await axios.get(url);
    const textInChunks = await extractTextFromHTML(response.data);
    return textInChunks;
  } catch (err) {
    console.error("Error fetching document: ", err);
  }
};

export const extractTextFromHTML = async (html: string) => {
  const $ = load(html);
  const title = $("h1");
  const paragraphs = $("p");
  const codeBlocks = $("code, pre"); // Target <code> and <pre> tags for code extraction

  const titleArray = title.map((index, element) => $(element).text()).get();
  const textArray = paragraphs.map((index, element) => $(element).text()).get();
  const codeArray = codeBlocks.map((index, element) => $(element).text()).get();

  const titleText = titleArray.join("\n");
  const documentationText = textArray.join("\n");
  const codeText = codeArray.join("\n");

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1024,
    chunkOverlap: 200,
  });

  const splitTexts = await textSplitter.createDocuments([documentationText]);
  const chunks = splitTexts.map((chunk) => ({
    text: chunk.pageContent,
    lines: chunk.metadata.loc.lines,
  }));

  return {
    chunks: chunks,
    title: titleText,
  };
};
