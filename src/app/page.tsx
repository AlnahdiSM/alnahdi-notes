import NewNoteForm from './components/NewNoteForm'
import NoteList from './components/NoteList'
import '../styles/globals.css'
import { getNotes } from './actions/noteAction';
import 'animate.css';

export default async function Home() {
  const notes: Note[] = await getNotes()
  console.log("🚀 ~ Home ~ notes:", "fjjf")

  return (
    <div>
      <header>
        <h1>Alnahdi Notes</h1>
      </header>

      <NoteList initialNotes={notes} />
      <NewNoteForm />
    </div>
  );
}
