package id.rahman.ideanook.ideanook.controller;

import id.rahman.ideanook.ideanook.model.Note;
import id.rahman.ideanook.ideanook.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public List<Note> getAllNotes() {
        return noteService.getAllNotes();
    }

    @GetMapping("/{id}")
    public Note getNoteById(@PathVariable Long id) {
        return noteService.getNoteById(id);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Note>> searchNotes(@RequestParam("title") String title) {
        List<Note> foundNotes = noteService.searchNotesByTitle(title);
        return ResponseEntity.ok(foundNotes);
    }

    @PostMapping
    public Note createNote(@RequestBody Note note) {
        return noteService.saveNote(note);
    }

    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id, @RequestBody Note updatedNote) {
        updatedNote.setId(id);
        return noteService.saveNote(updatedNote);
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id) {
        noteService.deleteNoteById(id);
    }
}


