import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  editingNote: Note;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { note: Note }
  ) {
    this.editingNote = { ...data.note };
  }

  saveEdit() {
    this.dialogRef.close({ note: this.editingNote });
  }

  cancelEdit() {
    this.dialogRef.close();
  }
}
