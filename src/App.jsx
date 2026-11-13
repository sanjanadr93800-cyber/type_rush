import React, { useState, useEffect } from "react";
import "./App.css";

const paragraphs = [
  "Practice makes a person perfect. Learning new skills every day helps us become better and more confident.",

  "React is a popular JavaScript library used to create interactive websites and modern web applications.",

  "Technology makes our daily life easier by connecting people and sharing information around the world."
];

function App() {

  const [paragraph, setParagraph] = useState(paragraphs[0]);

  const [text, setText] = useState("");

  const [time, setTime] = useState(60);

  const [running, setRunning] = useState(false);

  const [finished, setFinished] = useState(false);

  // Timer functionality
  useEffect(() => {

    if (!running) return;

    const timer = setInterval(() => {

      setTime(prev => {

        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, [running]);

  // Finish test
  useEffect(() => {

    if (time === 0 || text === paragraph) {

      if (time === 0 || text === paragraph) {
        setRunning(false);
        setFinished(true);
      }

    }

  }, [time, text, paragraph]);

  // Start test
  const startTest = () => {

    if (!finished) {
      setRunning(true);
    }

  };

  // Typing function
  const handleTyping = (e) => {

    if (finished) return;

    const value = e.target.value;

    setText(value);

    if (value.length > 0) {
      setRunning(true);
    }

  };

  // Correct characters
  const correctCharacters = text
    .split("")
    .filter((char, index) => char === paragraph[index]).length;

  // Accuracy
  const accuracy = text.length > 0
    ? Math.round((correctCharacters / text.length) * 100)
    : 100;

  // WPM
  const elapsed = 60 - time;

  const wpm = elapsed > 0
    ? Math.round((correctCharacters / 5) / (elapsed / 60))
    : 0;

  // Clock movement
  const elapsedSeconds = 60 - time;

  const secondAngle = elapsedSeconds * 6;

  // Progress
  const progress = (text.length / paragraph.length) * 100;

  // Restart
  const restartTest = () => {

    const randomParagraph =
      paragraphs[Math.floor(Math.random() * paragraphs.length)];

    setParagraph(randomParagraph);

    setText("");

    setTime(60);

    setRunning(false);

    setFinished(false);

  };

  return (

    <div className="app">

      {/* HEADER */}

      <header className="header">

        <h1>⚡ TYPE RUSH</h1>

        <p>Improve Your Typing Speed</p>

      </header>

      <main className="container">

        <h2 className="title">
          Your Typing Challenge
        </h2>

        {/* ANALOG CLOCK */}

        <div className="clock">

          <div className="clock-face">

            {/* CLOCK NUMBERS */}

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(number => (

              <span
                key={number}
                className={`number number-${number}`}
              >
                {number}
              </span>

            ))}

            {/* CLOCK HANDS */}

            <div
              className="clock-hand hour-hand"
              style={{
                transform: `rotate(${elapsedSeconds * 0.1}deg)`
              }}
            ></div>

            <div
              className="clock-hand minute-hand"
              style={{
                transform: `rotate(${elapsedSeconds * 0.5}deg)`
              }}
            ></div>

            <div
              className="clock-hand second-hand"
              style={{
                transform: `rotate(${secondAngle}deg)`
              }}
            ></div>

            <div className="clock-center"></div>

          </div>

        </div>

        {/* DIGITAL TIMER */}

        <div className="digital-timer">

          <h1>
            00:{String(time).padStart(2, "0")}
          </h1>

          <p>
            {finished
              ? "TEST COMPLETED"
              : running
              ? "TIME REMAINING"
              : "READY TO START"}
          </p>

        </div>

        {/* START BUTTON */}

        {!running && !finished && (

          <button className="start-btn" onClick={startTest}>
            ▶ Start Test
          </button>

        )}

        {/* STATISTICS */}

        <section className="stats">

          <div className="stat-card">
            <span>⚡</span>
            <p>Typing Speed</p>
            <h2>{wpm} WPM</h2>
          </div>

          <div className="stat-card">
            <span>🎯</span>
            <p>Accuracy</p>
            <h2>{accuracy}%</h2>
          </div>

          <div className="stat-card">
            <span>⌨️</span>
            <p>Characters</p>
            <h2>{text.length}</h2>
          </div>

        </section>

        {/* TYPING AREA */}

        <section className="typing-section">

          <h2>⌨️ Typing Practice</h2>

          <p className="description">
            Type the following paragraph as accurately as possible.
          </p>

          <div className="paragraph">

            {paragraph.split("").map((char, index) => (

              <span
                key={index}
                className={
                  index < text.length
                    ? text[index] === char
                      ? "correct"
                      : "wrong"
                    : ""
                }
              >
                {char}
              </span>

            ))}

          </div>

          <textarea
            placeholder="Start typing here..."
            value={text}
            onChange={handleTyping}
            disabled={finished}
            maxLength={paragraph.length}
          />

          <div className="progress-text">

            <span>Typing Progress</span>

            <span>{Math.round(progress)}%</span>

          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${progress}%`
              }}
            ></div>

          </div>

          {/* RESULTS */}

          {finished && (

            <div className="result">

              <h2>🎉 Congratulations!</h2>

              <p>Typing Speed: {wpm} WPM</p>

              <p>Accuracy: {accuracy}%</p>

              <p>Correct Characters: {correctCharacters}</p>

              <button onClick={restartTest}>
                🔄 Try Again
              </button>

            </div>

          )}

          {!finished && (

            <button className="restart-btn" onClick={restartTest}>
              ↻ Restart Test
            </button>

          )}

        </section>

      </main>

      <footer>
        <p>⚡ TYPE RUSH | Built with React JS</p>
      </footer>

    </div>

  );

}

export default App;