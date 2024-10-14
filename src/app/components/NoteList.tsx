"use client";
import { useEffect, useState } from "react";
import { deleteNote } from "../actions/noteAction";
import { client } from "../utils/appwrite";

export default function NoteList({ initialNotes }: { initialNotes: Note[] }) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  useEffect(() => {
    const channel = 'databases.alnahdiNotes.collections.66f30ee500197dd5171d.documents'

    const unsubscribe = client.subscribe(channel, (response) => {
      const eventType = response.events[0]
      console.log(response.events)
      const changedNote = response.payload as Note

      if (eventType.includes('create')) {
        setNotes((prevNotes) => [changedNote, ...prevNotes])
      } 

      if (eventType.includes('delete')) {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note.$id !== changedNote.$id)
        )
      }
    })

    return () => unsubscribe()
  }, [])

  const handleDelete = async (noteId: string) => {
    const element = document.getElementById(noteId);
    await deleteNote(noteId);
    if(element){
      element.classList.add("animate__animated", "animate__fadeOutRight", "crossed-out") ;
      setTimeout(() => {
        
        setNotes(notes.filter((note) => note.$id !== noteId));
      }, 1000);
    }
    // setNotes(notes.filter((note) => note.$id !== noteId));
  };

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.$id} id={note.$id} onClick={() => handleDelete(note.$id)}>
          <p>{note.Content}</p>
        </li>
      ))}
    </ul>
  );
}
