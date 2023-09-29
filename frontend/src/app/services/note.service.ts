import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [];
  private nextId: number = 1;

  constructor() {
    this.notes.push(
      { id: this.nextId++, title: 'Note 1', content: 'Content for Note 1', date: new Date() },
      { id: this.nextId++, title: 'Note 2', content: 'Content for Note 2', date: new Date() }
    );
  }

  getNotes(): Note[] {
    return this.notes;
  }

  addNote(note: Note): void {
    note.id = this.nextId++;
    this.notes.push(note);
  }

  editNoteById(noteId: number, updatedNote: Note): void {
    const index = this.notes.findIndex(note => note.id === noteId);
    if (index !== -1) {
      this.notes[index] = { ...updatedNote };
    }
  }

  deleteNoteById(noteId: number): void {
    const index = this.notes.findIndex(note => note.id === noteId);
    if (index !== -1) {
      this.notes.splice(index, 1);
    }
  }

  searchNotesByTitle(title: string): Note[] {
    title = title.toLowerCase().trim();
    return this.notes.filter(note => note.title.toLowerCase().includes(title));
  }
}
