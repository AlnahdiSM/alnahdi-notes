import { database } from "@/app/utils/appwrite";
import { ID } from "appwrite";

export async function addNote(content: string): Promise<Note> {
  const newNote = { Content: content };
  console.log(newNote);

  const response = await database.createDocument(
    "alnahdiNotes",
    "66f30ee500197dd5171d",
    ID.unique(),
    newNote
  );
  const note: Note = {
    $id: response.$id,
    $createdAt: response.$createdAt,
    Content: response.content,
  };

  return note;
}
export async function getNotes(): Promise<Note[]> {
  const response = await database.listDocuments(
    "alnahdiNotes",
    "66f30ee500197dd5171d"
  );

  const notes: Note[] = response.documents.map((doc) => ({
    $id: doc.$id,
    Content: doc.Content,
    $createdAt: doc.$createdAt,
  }));

  return notes;
}
export async function deleteNote(noteId: string): Promise<void> {
  await database.deleteDocument("alnahdiNotes", "66f30ee500197dd5171d", noteId);
}
