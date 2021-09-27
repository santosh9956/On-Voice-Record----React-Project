import React, { useState, useEffect } from 'react';
import './App.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';

function App() {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState('');
  const [saveNotes, setSaveNotes] = useState([]);

  useEffect(() => {
    handleListen();
  },[isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('Continue....');
        mic.start();
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Mic stop...');

      }
    }

    mic.onstart = () => {
      console.log('Mics On');
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('')
      setNote(transcript);
      console.log(transcript , 'this is transcript');

      mic.onerror = event => {
        console.log(event.error , 'event.error');
      }
    }

  }

  const handleSaveNotes = () => {
    setSaveNotes([...saveNotes , note]);
    setNote('');
    // console.log('you clicked on save notes');
    // console.log(note ,"this is note");
  }

  return (
    <>
      <h1>Voice Notes</h1>
      <div className='container'>
        <div className='box'>
          <h2>Current Notes</h2>
          <div className='d-flex justify-content-between align-items-center'>
            <div> {isListening ? <span>🎙️</span> : <span>🛑</span>}</div>
            <div>
              <button onClick={() => setIsListening(prevState => !prevState)} >Start/Stop</button>
              <button onClick={handleSaveNotes} disabled={!note}>Save Notes</button>
            </div>
          </div>
          <p>{note}</p>
        </div>
        <div className='box'>
          <h2> Notes</h2>
          {saveNotes.map((n, index) => (
            <p key={index}>{n}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
