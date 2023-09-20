import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import SlashCommand from "@/components/Editor/slash-command";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

export const TipTapEditorExtensions = [
  StarterKit.configure({
    heading: {
      HTMLAttributes: {
        class: "mt-8 mb-4 font-medium leading-snug",
      },
    },
    paragraph: {
      HTMLAttributes: {
        class: "w-full font-normal whitespace-normal leading-7",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class:
          "flex gap-1 flex-col items-start list-disc list-outside leading-3",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class:
          "flex gap-1 flex-col items-start list-disc list-outside leading-3",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-gray-300 pl-4",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "rounded-md bg-gray-200 p-5 font-mono font-medium text-gray-800",
      },
    },
    code: {
      HTMLAttributes: {
        class:
          "rounded-md bg-gray-200 px-1.5 py-1 font-mono font-medium text-black",
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "rgb(55, 53, 47)",
      width: 4,
    },
  }),
  Placeholder.configure({
    // Not sure what the type of node is, so I'm using any
    placeholder: ({ node }: any) => {
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`;
      }
      return "Press '/' for commands, or enter some text...";
    },
    includeChildren: true,
  }),
  SlashCommand,
  Underline,
  Color,
  TextStyle,
  Link,
  Highlight,
  TaskList,
  TaskItem,
];
