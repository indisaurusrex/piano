import React, { Fragment, useEffect, useState } from "react";
import InstrumentAudio from "./src/instrumentAudio";
import getNotesBetween from "./src/getNotesBetween";
import isAccidentalNote from "./src/isAccidentalNote";
import getKeyboardShortcutsForNote from "./src/getKeyboardShortcutsForNote";


const Instrument = ({ 
    instrumentName, 
    startNote, 
    endNote,
    renderPianoKey,
    keyboardMap
}) => {
    const notes = getNotesBetween(startNote, endNote);

    const [state, setState] = useState({
        notesPlaying: []
    });

    const onPlayNoteStart = note => {
        setState({ ...state, notesPlaying: [...state.notesPlaying, note] });
    };

    const onPlayNoteEnd = note => {
        setState({
            ...state,
            notesPlaying: state.notesPlaying.filter(
                notePlaying => notePlaying !== note
            )
        })
    }

    useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
    }, []);

    const handleKeyDown = e => {
      if (isRegularKey(e) && !e.repeat) {
        const note = getNoteFromKeyboardKey(e.key);
        if (note) {
          setState({ ...state, notesPlaying: [...state.notesPlaying, note] });
        }
      }
    };

    const handleKeyUp = e => {
      if (isRegularKey(e) && !e.repeat) {
        const note = getNoteFromKeyboardKey(e.key);
        if (note) {
          setState({
            ...state,
            notePlaying: state.notesPlaying.filter(
              notePlaying => notePlaying !== note
            )
          });
        }
      }
    };

    return (
        <Fragment>
            {notes.map(note => {
                return (
                <Fragment key={note}> 
                {renderPianoKey({
                    note,
                    isAccidentalNote: isAccidentalNote(note),
                    isNotePlaying: state.notesPlaying.includes(note),
                    startPlayingNote: () => onPlayNoteStart(note),
                    stopPlayingNote: () => onPlayNoteEnd(note),
                    keyboardShortcut: getKeyboardShortcutsForNote(keyboardMap, note)
                })}
                </Fragment>
            );
        })}
        <InstrumentAudio
          instrumentName={instrumentName}
          notes={state.notesPlaying}
          />
        </Fragment>
    );
};

export default Instrument;