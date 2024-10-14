"use client";
import { useState } from "react";
import { addNote, getNotes } from "../actions/noteAction";
import { useRouter } from "next/navigation";

const NewNoteForm = () => {
  const [content, setContent] = useState("");
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addNote(content);
    setContent("");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="أكتب ملاحظتك هنا..."
      />
      <button type="submit">أضف الملاحظة</button>
    </form>
  );
};

export default NewNoteForm;
