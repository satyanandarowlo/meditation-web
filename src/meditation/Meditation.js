import React, { useState, useEffect, useRef } from "react";
import "./Meditation.css";

const Meditation = ({ user }) => {
  const [delay, setDelay] = useState(() => {
    // Retrieve the stored delay from localStorage or use the default value
    const storedDelay = localStorage.getItem("delay");
    return storedDelay ? parseInt(storedDelay, 10) : 1000;
  });
  const [runningDelay, setRunningDelay] = useState(0);
  const [maxDelay, setMaxDelay] = useState(() => {
    // Retrieve the stored max delay from localStorage or use the default value
    const storedMaxDelay = localStorage.getItem("maxDelay");
    return storedMaxDelay ? parseInt(storedMaxDelay, 10) : 70000; // Default to "Suggestive - Delta"
  });
  const [started, setStarted] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [totalDuration, setTotalDuration] = useState(0); // Track meditation duration
  let [currentDelay, setCurrentDelay] = useState(0); // Current trance gap for display
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

    if (currentDelay == 0) {
      console.log("currentDelay is 0");
      currentDelay = delay;
      setCurrentDelay(currentDelay / 1000); // Initial gap in seconds
    }

    // Increment the delay by the user-selected percentage
    currentDelay = currentDelay * percentage;
    console.log("currentDelay: " + currentDelay);
    if (currentDelay > maxDelay) {
      currentDelay = maxDelay;
    }

    // setDelay(newDelay); // Update state with the new delay
    setCurrentDelay(currentDelay / 1000); // Show updated delay in seconds

    const now = Date.now();
    setTotalDuration(now - startTimeRef.current); // Update meditation duration

    // Schedule the next bell with the updated delay
    timeoutRef.current = setTimeout(playSoundAndIncreaseDelay, currentDelay);
  };

  const handleStop = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clear any ongoing timeouts
    bellAudio.pause(); // Stop bell sound
    riverAudio.pause(); // Stop river flow sound
    setStarted(false);
    setIsCountingDown(false);
    setCountdown(3); // Reset countdown to 10 seconds
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

  // Function to handle max delay change
  const handleMaxDelayChange = (event) => {
    const newMaxDelay = parseInt(event.target.value, 10);
    setMaxDelay(newMaxDelay);
    localStorage.setItem("maxDelay", newMaxDelay); // Store the new max delay in localStorage
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
      <label htmlFor="max-delay-select">
        Select Maximum Deep State (seconds):
      </label>
      <select
        id="max-delay-select"
        value={maxDelay}
        onChange={handleMaxDelayChange}
      >
        {[...Array(10).keys()].map((i) => (
          <option key={i + 1} value={(i + 1) * 10000}>
            {(i + 1) * 10000}{" "}
            {i + 1 === 1
              ? "(Fully Alert - Gamma)"
              : i + 1 === 2
              ? "(Alert - Beta)"
              : i + 1 === 3
              ? "(Half Alert - Beta)"
              : i + 1 === 4
              ? "(Half Drift - Alpha)"
              : i + 1 === 5
              ? "(Drift - Theta)"
              : i + 1 === 6
              ? "(Half Suggestive - Theta)"
              : i + 1 === 7
              ? "(Suggestive - Delta)"
              : i + 1 === 8
              ? "(Super Conscious State - Level 1)"
              : i + 1 === 9
              ? "(Super Conscious State - Level 2)"
              : "(Super Conscious State - Level 3)"}
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
