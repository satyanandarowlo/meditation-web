import React, { useState, useRef, useEffect } from "react";
import "./App.css"; // Create a CSS file for custom styles

function App() {
  let [delay, setDelay] = useState(1000); // Initial trance gap of 1 second
  const [started, setStarted] = useState(false);
  const [countdown, setCountdown] = useState(10); // Countdown timer
  const [isCountingDown, setIsCountingDown] = useState(false); // Track countdown state
  const [totalDuration, setTotalDuration] = useState(0); // Track meditation duration
  const [currentDelay, setCurrentDelay] = useState(0); // Track the current trance gap for display
  const audioRef = useRef(
    new Audio(process.env.PUBLIC_URL + "/bell-a-99888.mp3")
  ); // Path to your audio file
  const startTimeRef = useRef(0);

  // Countdown Logic
  useEffect(() => {
    let countdownTimer;
    if (isCountingDown && countdown > 0) {
      countdownTimer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      handleStartMeditation();
    }
    return () => clearTimeout(countdownTimer);
  }, [countdown, isCountingDown]);

  // Start Meditation after countdown finishes
  const handleStartMeditation = () => {
    setStarted(true);
    setCurrentDelay(delay / 1000); // Display initial trance gap in seconds
    startTimeRef.current = Date.now();
    setTimeout(playSoundAndIncreaseDelay, delay);
  };

  // Play sound and increase trance gap gradually
  const playSoundAndIncreaseDelay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((error) => console.error("Error playing sound", error));

      delay = delay * 1.01; // Increase delay by 5%
      setDelay(delay); // Update the delay state

      const now = Date.now();
      setTotalDuration(now - startTimeRef.current); // Update meditation duration
      setCurrentDelay(delay / 1000); // Update the displayed trance gap in seconds

      // Schedule the next sound after the updated delay
      setTimeout(playSoundAndIncreaseDelay, delay);
    }
  };

  // Start countdown
  const handleStart = () => {
    setIsCountingDown(true);
  };

  return (
    <div className="app-container">
      {isCountingDown && countdown > 0 ? (
        <div className="countdown">
          <h1>Meditation starts in {countdown}...</h1>
        </div>
      ) : (
        <>
          {started ? (
            <div className="meditation-info">
              <h1>Trance gap: {currentDelay.toFixed(2)} seconds</h1>
              <h2>
                Meditation duration: {(totalDuration / 1000).toFixed(2)} seconds
              </h2>
            </div>
          ) : (
            <div className="button-container">
              <button onClick={handleStart} className="start-button">
                Start Meditation
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
