import React, { useState, useEffect, useRef } from "react";
import "./Meditation.css";

const Meditation = ({ user }) => {
  let [delay, setDelay] = useState(1000); // Initial delay of 1 second
  const [started, setStarted] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [totalDuration, setTotalDuration] = useState(0); // Track meditation duration
  const [currentDelay, setCurrentDelay] = useState(0); // Current trance gap for display
  const startTimeRef = useRef(0);
  const timeoutRef = useRef(null);

  // Load the bell sound and river flow sound using native HTML5 Audio API
  const bellAudio = useRef(new Audio("/bell-a-99888.mp3")).current;
  const riverAudio = useRef(new Audio("/river-flow-68361.mp3")).current;

  useEffect(() => {
    // Set river flow audio to loop continuously
    riverAudio.loop = true;
  }, [riverAudio]);

  // Countdown before starting the meditation
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

  const handleStartMeditation = () => {
    setStarted(true);
    setCurrentDelay(delay / 1000); // Initial gap in seconds
    startTimeRef.current = Date.now();

    // Start playing river flow sound in the background
    riverAudio.play();

    timeoutRef.current = setTimeout(playSoundAndIncreaseDelay, delay); // Start the bell sound cycle
  };

  const playSoundAndIncreaseDelay = () => {
    bellAudio.currentTime = 0; // Reset bell sound to the start
    bellAudio.play(); // Play the bell sound

    // Increment the delay by 5%
    delay = delay * 1.01;
    setDelay(delay); // Update state with the new delay
    setCurrentDelay(delay / 1000); // Show updated delay in seconds

    const now = Date.now();
    setTotalDuration(now - startTimeRef.current); // Update meditation duration

    // Schedule the next bell with the updated delay
    timeoutRef.current = setTimeout(playSoundAndIncreaseDelay, delay);
  };

  const handleStop = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clear any ongoing timeouts
    bellAudio.pause(); // Stop bell sound
    riverAudio.pause(); // Stop river flow sound
    setStarted(false);
    setIsCountingDown(false);
    setCountdown(10); // Reset countdown to 10 seconds
    setTotalDuration(0); // Reset meditation duration
    setCurrentDelay(0); // Reset trance gap
    setDelay(1000); // Reset delay to initial 1 second
  };

  const handleStart = () => {
    setIsCountingDown(true);
  };

  return (
    <div className="meditation-container">
      <img src="/logo.png" className="meditation-logo" alt="Logo" />
      {user ? (
        isCountingDown && countdown > 0 ? (
          <div className="countdown">
            <p>Meditation starts in {countdown}...</p>
          </div>
        ) : started ? (
          <div className="meditation-info">
            <p>Trance gap: {currentDelay.toFixed(2)} seconds</p>
            <p>
              Meditation duration: {(totalDuration / 1000).toFixed(2)} seconds
            </p>
            <button className="stop-button" onClick={handleStop}>
              Stop
            </button>
          </div>
        ) : (
          <button className="start-button" onClick={handleStart}>
            Start Meditation
          </button>
        )
      ) : (
        <p>Please log in to start meditating.</p>
      )}
    </div>
  );
};

export default Meditation;
