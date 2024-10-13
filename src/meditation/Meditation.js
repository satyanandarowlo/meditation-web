import React, { useState, useEffect, useRef } from "react";
import "./Meditation.css";

const Meditation = ({ user }) => {
  const [delay, setDelay] = useState(() => {
    // Retrieve the stored delay from localStorage or use the default value
    const storedDelay = localStorage.getItem("delay");
    return storedDelay ? parseInt(storedDelay, 10) : 1000;
  });
  const [started, setStarted] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [totalDuration, setTotalDuration] = useState(0); // Track meditation duration
  const [currentDelay, setCurrentDelay] = useState(0); // Current trance gap for display
  const [percentage, setPercentage] = useState(() => {
    // Retrieve the stored percentage from localStorage or use the default value
    const storedPercentage = localStorage.getItem("percentage");
    return storedPercentage ? parseFloat(storedPercentage) : 1.01;
  });
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

    // Increment the delay by the user-selected percentage
    const newDelay = delay * percentage;

    setDelay(newDelay); // Update state with the new delay
    setCurrentDelay(newDelay / 1000); // Show updated delay in seconds

    const now = Date.now();
    setTotalDuration(now - startTimeRef.current); // Update meditation duration

    // Schedule the next bell with the updated delay
    timeoutRef.current = setTimeout(playSoundAndIncreaseDelay, newDelay);
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

  // Function to handle percentage change
  const handlePercentageChange = (event) => {
    const newPercentage = parseFloat(event.target.value);
    setPercentage(newPercentage);
    localStorage.setItem("percentage", newPercentage); // Store the new percentage in localStorage
  };

  // Function to handle delay change
  const handleDelayChange = (event) => {
    const newDelay = parseInt(event.target.value, 10);
    setDelay(newDelay);
    localStorage.setItem("delay", newDelay); // Store the new delay in localStorage
  };

  return (
    <div className="meditation-container">
      <img src="/logo.png" className="meditation-logo" alt="Logo" />
      <label htmlFor="initial-delay-select">
        What is Your Current Mood? (1: Hyper Active, 10: Very Relaxed):
      </label>
      <select
        id="initial-delay-select"
        value={delay}
        onChange={handleDelayChange}
      >
        {[...Array(10).keys()].map((i) => (
          <option key={i + 1} value={(i + 1) * 1000}>
            {i + 1}{" "}
            {i + 1 === 1
              ? "(Hyper Active)"
              : i + 1 === 10
              ? "(Very Relaxed)"
              : i + 1 <= 5
              ? "(Active)"
              : "(Relaxed)"}
          </option>
        ))}
      </select>
      <label htmlFor="percentage-select">
        How Quickly You Want to enter the Meditative State? (1: Slow, 10: Fast):
      </label>
      <select
        id="percentage-select"
        value={percentage}
        onChange={handlePercentageChange}
      >
        {[...Array(10).keys()].map((i) => (
          <option key={i + 1} value={1.01 + i * 0.01}>
            {i + 1}{" "}
            {i + 1 === 1
              ? "(Slow)"
              : i + 1 === 10
              ? "(Fast)"
              : i + 1 <= 5
              ? "(Moderate)"
              : "(Quick)"}
          </option>
        ))}
      </select>
      <p>Current Speed: {((percentage - 1) * 100).toFixed(2)}%</p>
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
