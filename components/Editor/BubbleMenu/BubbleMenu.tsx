import { RefObject, useEffect, useRef, useState } from "react";
import { BubbleMenu as BubbleMenuReact, Editor } from "@tiptap/react";
import {
  FaLink,
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
  FaCaretDown,
} from "react-icons/fa6";
import { textColors } from "@/lib/helpers";
import useOutsideClick from "@/hooks/useOutsideClick";

export interface BubbleMenuProps {
  editor: Editor;
  containerRef: RefObject<HTMLDivElement>;
}

export type SelectionMenuType = "link" | null;

export const BubbleMenu = ({ editor, containerRef }: BubbleMenuProps) => {
  let ref = useRef(null);
  const [selectionType, setSelectionType] = useState<SelectionMenuType>(null);
  const [isDropdown, setIsDropdown] = useState(false);

  useOutsideClick(ref, () => {
    setIsDropdown(false);
  });

  useEffect(() => {
    if (selectionType !== "link") setSelectionType(null);
  }, [selectionType]);
  if (!editor || !containerRef.current) return null;

  const SelectionMenu = ({
    editor,
    selectionType,
    setSelectionType,
  }: {
    editor: Editor;
    selectionType: SelectionMenuType;
    setSelectionType: (type: SelectionMenuType) => void;
  }) => {
    switch (selectionType) {
      case null:
        return (
          <>
            <button
              type="button"
              data-test-id="mark-link"
              className={`flex gap-2 items-center border-r border-r-light-gray text-[rgba(55,53,47,0.75)] p-2 rounded-l-md hover:bg-[rgb(55,53,47,0.08)] ${
                editor.isActive("link") ? "font-bold" : ""
              }`}
              onClick={() => {
                setSelectionType("link");
              }}
            >
              <FaLink /> Link
            </button>
            <button
              type="button"
              data-test-id="mark-bold"
              className={`flex items-center border-r w-8 border-r-light-gray text-[rgba(55,53,47,0.75)] p-2 hover:bg-[rgb(55,53,47,0.08)] ${
                editor.isActive("bold") ? "text-slate" : ""
              }`}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <FaBold />
            </button>
            <button
              type="button"
              data-test-id="mark-italic"
              className={`flex items-center w-8 border-r border-r-light-gray text-[rgba(55,53,47,0.75)] p-2 hover:bg-[rgb(55,53,47,0.08)] ${
                editor.isActive("italic") ? "text-slate" : ""
              }`}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <FaItalic />
            </button>
            <button
              type="button"
              data-test-id="mark-underline"
              className={`flex w-8 items-center border-r border-r-light-gray text-[rgba(55,53,47,0.75)] p-2 hover:bg-[rgb(55,53,47,0.08)] ${
                editor.isActive("underline") ? "text-slate" : ""
              }`}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <FaUnderline />
            </button>
            <button
              type="button"
              data-test-id="mark-strike"
              className={`flex w-8 items-center border-r border-r-light-gray text-[rgba(55,53,47,0.75)] p-2 rounded-r-md hover:bg-[rgb(55,53,47,0.08)] ${
                editor.isActive("strike") ? "text-slate" : ""
              }`}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <FaStrikethrough />
            </button>
            <div
              data-test-id="relative mark-color"
              className="select-none cursor-pointer text-[rgba(55,53,47,0.75)] flex gap-1 w-10 items-center text-${color} p-2 rounded-r-md hover:bg-[rgb(55,53,47,0.08)] "
              onClick={() => setIsDropdown(true)}
            >
              <p className="text-sm font-medium">A</p> <FaCaretDown />
              {isDropdown && (
                <div
                  ref={ref}
                  className="absolute rounded-md text-xs -top-1/2 -translate-y-1/2 -right-[100px] w-[200px] bg-white shadow-[0_0_0_1px_rgba(15,15,15,0.05),0_3px_6px_rgba(15,15,15,0.1),0_9px_24px_rgba(15,15,15,0.2)]"
                >
                  <ul>
                    {Object.entries(textColors).map(
                      ([colorName, hexCode], id) => (
                        <TextColor
                          key={id}
                          colorName={colorName}
                          hexCode={hexCode}
                        />
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </>
        );
      case "link":
        return (
          <div className="inline-flex -mt-2 h-[44px] p-1 bg-white text-xs shadow-[0_0_0_1px_rgba(15,15,15,0.05),0_3px_6px_rgba(15,15,15,0.1),0_9px_24px_rgba(15,15,15,0.2)] rounded-md">
            <input
              data-test-id="insert-link-value"
              autoFocus
              type="text"
              className="text-xs p-2 w-[250px] h-[36px] font-normal bg-input-background shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] rounded-md focus-visible:outline-none"
              placeholder="Insert link address"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  editor
                    .chain()
                    .focus()
                    .extendMarkRange("link")
                    .setLink({
                      href: (event.target as HTMLInputElement).value,
                      target: "_blank",
                    })
                    .run();
                  setSelectionType(null);
                }
              }}
            />
          </div>
        );
    }
  };

  const TextColor = ({
    colorName,
    hexCode,
  }: {
    colorName: string;
    hexCode: string;
  }) => {
    return (
      <li
        onClick={() => {
          editor.chain().focus().setColor(hexCode).run();
          setIsDropdown(false);
        }}
        className="capitalize flex border-b border-b-light-gray last:border-b-0 items-center gap-2 p-2 py-1 first:rounded-t-md last:rounded-b-md cursor-pointer hover:bg-[rgb(55,53,47,0.08)]"
      >
        <p
          className="p-1 px-2 rounded-sm border border-light-gray"
          style={{ color: hexCode }}
        >
          A
        </p>
        <p className="font-light text-[0.825rem]">{colorName}</p>
      </li>
    );
  };

  return (
    <BubbleMenuReact
      pluginKey="bubbleMenu"
      editor={editor}
      className="inline-flex h-[32px] bg-white text-xs items-stretch shadow-[0_0_0_1px_rgba(15,15,15,0.05),0_3px_6px_rgba(15,15,15,0.1),0_9px_24px_rgba(15,15,15,0.2)] rounded-md"
      tippyOptions={{
        appendTo: containerRef.current,
      }}
    >
      <SelectionMenu
        editor={editor}
        selectionType={selectionType}
        setSelectionType={setSelectionType}
      />
    </BubbleMenuReact>
  );
};
