import { getUrlFromString } from "@/lib/utils";
import { Editor } from "@tiptap/core";
import { LuCheck, LuTrash } from "react-icons/lu";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";

interface LinkSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const LinkSelector: FC<LinkSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });

  return (
    <div className="relative">
      <button
        type="button"
        className="flex h-full items-center space-x-2 px-3 py-1.5 text-sm font-medium hover:bg-[rgb(55,53,47,0.08)] active:bg-[rgb(55,53,47,0.08)]"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <p className="text-base">↗</p>
        <p
          className={`decoration-stone-400 ${
            editor.isActive("link") ? "text-blue-500" : ""
          }`}
        >
          Link
        </p>
      </button>
      {isOpen && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget[0] as HTMLInputElement;
            const url = getUrlFromString(input.value);
            url && editor.chain().focus().setLink({ href: url }).run();
            setIsOpen(false);
          }}
          className="text-[rgba(55,53,47,0.85)] fixed top-full z-[99999] mt-1 flex gap-1 w-60 overflow-hidden rounded shadow-[0_0_0_1px_rgba(15,15,15,0.05),0_3px_6px_rgba(15,15,15,0.1),0_9px_24px_rgba(15,15,15,0.2)] bg-white p-1 animate-in fade-in slide-in-from-top-1"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Insert link"
            className="flex-1 bg-input-background shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] p-1 text-xs rounded focus:outline-none"
            defaultValue={editor.getAttributes("link").href || ""}
          />
          {editor.getAttributes("link").href ? (
            <button
              type="button"
              className="flex items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setIsOpen(false);
              }}
            >
              <LuTrash className="h-4 w-4" />
            </button>
          ) : (
            <button className="flex items-center rounded-sm p-1 transition-all hover:bg-[rgb(55,53,47,0.08)]">
              <LuCheck className="h-4 w-4" />
            </button>
          )}
        </form>
      )}
    </div>
  );
};
