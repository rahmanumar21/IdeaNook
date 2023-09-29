import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { EditDialogResult } from '../../models/edit-dialog-result.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {
  note: Note = { id: 0, title: '', content: '', date: new Date() };
  noteList: Note[] = [];
  editingNote: Note | null = null;
  searchTerm: string = '';
  filteredNotes: Note[] = [];
  apiUrl = `http://localhost:8080/api/notes`;

  constructor(
    private noteService: NoteService,
    private httpClient: HttpClient,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getNotes();
    this.noteList = this.noteService.getNotes();
  }

  getNotes() {
    this.httpClient.get(this.apiUrl).subscribe((data: any) => {
      this.noteList = data;
    });
  }

  addNote() {
    this.httpClient.post(this.apiUrl, this.note).subscribe(
      (response: any) => {
        console.log('Response:', response);
        this.note = { id: 0, title: '', content: '', date: new Date() };
        this.getNotes();
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  editNote(note: Note) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: { note: { ...note } },
    });

    dialogRef.afterClosed().subscribe((result: EditDialogResult) => {
      console.log('The dialog was closed');
      if (result) {
        this.editingNote = { ...result.note };
        this.saveEdit();
      }
    });
  }


  saveEdit() {
    if (this.editingNote && this.editingNote.id) {
      const apiUrl = `${this.apiUrl}/${this.editingNote.id}`;

      this.httpClient.put(apiUrl, this.editingNote).subscribe(() => {
        console.log('Note with ID ${this.editingNote.id} updated successfully.');
        this.cancelEdit();
        this.getNotes();
      }, (error) => {
        console.error('Error updating note:', error);
      });
    }
  }

  cancelEdit() {
    this.editingNote = null;
  }

  deleteNote(noteId: number) {
    const apiUrl = `${this.apiUrl}/${noteId}`;

    this.httpClient.delete(apiUrl).subscribe(() => {
      console.log(`Note with ID ${noteId} deleted successfully.`);
      this.getNotes();
    }, (error) => {
      console.error('Error deleting note:', error);
    });
  }

  searchNotes() {
    const apiUrl = `${this.apiUrl}/search`;
  
    if (this.searchTerm.trim() === '') {
      this.getNotes();
    } else {
      const params = { title: this.searchTerm };
      this.httpClient.get(apiUrl, { params }).subscribe((data: any) => {
        this.noteList = data;
      });
    }
  }
}
