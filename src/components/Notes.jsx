import { useEffect, useState, useCallback } from "react";
import { NoteContext } from "../context/NoteContext";

const STORAGE_KEY = "notesapp_notes";

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // ignore JSON parse error
    }
    return [];
  });

  // Backward compatibility: import legacy notes if STORAGE_KEY is empty
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        const legacyNotes = [];
        const allKeys = Object.keys(localStorage);
        const numericKeys = allKeys
          .filter((k) => /^\d+$/.test(k))
          .sort((a, b) => Number(a) - Number(b));

        numericKeys.forEach((k) => {
          const raw = localStorage.getItem(k);
          if (raw) {
            let title = "";
            let content = "";
            try {
              const parsed = JSON.parse(raw);
              if (typeof parsed === "string") {
                const parts = parsed.split(",");
                title = parts[0] || "";
                content = parts.slice(1).join(",");
              } else if (Array.isArray(parsed)) {
                title = parsed[0] || "";
                content = parsed.slice(1).join(",");
              } else if (parsed && typeof parsed === "object") {
                title = parsed.title || "";
                content = parsed.content || "";
              }
            } catch {
              const parts = raw.split(",");
              title = parts[0] || "";
              content = parts.slice(1).join(",");
            }

            if (title.trim() || content.trim()) {
              legacyNotes.push({
                id: `legacy_${k}_${Date.now()}`,
                title: title.trim(),
                content: content.trim(),
                createdAt: Date.now(),
              });
            }
          }
        });

        if (legacyNotes.length > 0) {
          setNotes(legacyNotes);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(legacyNotes));
        }
      }
    } catch {
      // Storage access error handling
    }
  }, []);

  const saveNotes = (updated) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save to localStorage", err);
    }
  };

  const addNote = useCallback((noteData) => {
    if (!noteData) return;
    let title = "";
    let content = "";

    if (typeof noteData === "string") {
      const parts = noteData.split(",");
      title = parts[0] || "";
      content = parts.slice(1).join(",");
    } else {
      title = noteData.title || "";
      content = noteData.content || "";
    }

    if (!title.trim() && !content.trim()) return;

    const newNote = {
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      title: title.trim(),
      content: content.trim(),
      createdAt: Date.now(),
    };

    setNotes((prev) => {
      const updated = [newNote, ...prev];
      saveNotes(updated);
      return updated;
    });
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes((prev) => {
      const updated = prev.filter((note, index) => {
        return note.id !== id && String(index) !== String(id);
      });
      saveNotes(updated);
      return updated;
    });
  }, []);

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
}