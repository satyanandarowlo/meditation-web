import React, { useState, useEffect, useRef } from "react";
import "./Meditation.css";

const Meditation = ({ user }) => {
  const [delay, setDelay] = useState(() => {
    const storedDelay = localStorage.getItem("delay");
    return storedDelay ? parseInt(storedDelay, 10) : 1000;
  });
  const [maxDelay, setMaxDelay] = useState(() => {
    const storedMaxDelay = localStorage.getItem("maxDelay");
    return storedMaxDelay ? parseInt(storedMaxDelay, 10) : 70000;
  });
  const [hypnoThreshold, setHypnoThreshold] = useState(() => {
    const storedThreshold = localStorage.getItem("hypnoThreshold");
    return storedThreshold ? parseInt(storedThreshold, 10) : 0;
  });
  const [hypnosisAudioOption, setHypnosisAudioOption] = useState(() => {
    return localStorage.getItem("hypnosisAudioOption") || "health";
  });
  const [started, setStarted] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [totalDuration, setTotalDuration] = useState(0);
  let [currentDelay, setCurrentDelay] = useState(0);
  const [percentage, setPercentage] = useState(() => {
    const storedPercentage = localStorage.getItem("percentage");
    return storedPercentage ? parseFloat(storedPercentage) : 1.01;
  });
  const startTimeRef = useRef(0);
  const timeoutRef = useRef(null);

  const bellAudio = useRef(new Audio("/bell-a-99888.mp3")).current;
  const riverAudio = useRef(new Audio("/river-flow-68361.mp3")).current;
  const hypnosisHealthAudio = useRef(
    new Audio("/hypnosis-health_full.mp3")
  ).current;
  const hypnosisHabitsAudio = useRef(
    new Audio("/hypnosis-habits3.mp3")
  ).current;
  const hypnosisHeadAudio = useRef(new Audio("/health_head.mp3")).current;

  useEffect(() => {
    riverAudio.loop = true;
  }, [riverAudio]);

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
    setCurrentDelay(delay / 1000);
    startTimeRef.current = Date.now();
    riverAudio.play();
    riverAudio.volume = 0.6;
    timeoutRef.current = setTimeout(playSoundAndIncreaseDelay, delay);
  };

  const playSoundAndIncreaseDelay = () => {
    const now = Date.now();
    const meditationDuration = now - startTimeRef.current;

    // Check if meditation has reached the hypno threshold
    if (hypnoThreshold > 0 && meditationDuration >= hypnoThreshold * 60000) {
      bellAudio.pause();

      riverAudio.volume = 0.2; // Set to a lower volume (e.g., 30% volume)

      // Play the selected hypnosis audio
      if (hypnosisAudioOption === "health") {
        hypnosisHealthAudio.currentTime = 0;
        hypnosisHealthAudio.play();
      } else if (hypnosisAudioOption === "habits") {
        hypnosisHabitsAudio.currentTime = 0;
        hypnosisHabitsAudio.play();
      } else if (hypnosisAudioOption === "head") {
        hypnosisHeadAudio.currentTime = 0;
        hypnosisHeadAudio.play();
      }

      return; // Stop further bell scheduling
    }

    bellAudio.currentTime = 0;
    bellAudio.play();

    if (currentDelay === 0) {
      currentDelay = delay;
      setCurrentDelay(currentDelay / 1000);
    }

    currentDelay *= percentage;
    if (currentDelay > maxDelay) {
      currentDelay = maxDelay;
    }

    setCurrentDelay(currentDelay / 1000);
    setTotalDuration(meditationDuration);

    timeoutRef.current = setTimeout(playSoundAndIncreaseDelay, currentDelay);
  };

  const handleStop = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    bellAudio.pause();
    hypnosisHealthAudio.pause();
    hypnosisHabitsAudio.pause();
    hypnosisHeadAudio.pause();
    riverAudio.pause();
    setStarted(false);
    setIsCountingDown(false);
    setCountdown(3);
    setTotalDuration(0);
    setCurrentDelay(0);
    setDelay(1000);
  };

  const handleStart = () => {
    setIsCountingDown(true);
  };

  const handlePercentageChange = (event) => {
    const newPercentage = parseFloat(event.target.value);
    setPercentage(newPercentage);
    localStorage.setItem("percentage", newPercentage);
  };

  const handleDelayChange = (event) => {
    const newDelay = parseInt(event.target.value, 10);
    setDelay(newDelay);
    localStorage.setItem("delay", newDelay);
  };

  const handleMaxDelayChange = (event) => {
    const newMaxDelay = parseInt(event.target.value, 10);
    setMaxDelay(newMaxDelay);
    localStorage.setItem("maxDelay", newMaxDelay);
  };

  const handleHypnoThresholdChange = (event) => {
    const newThreshold = parseInt(event.target.value, 10);
    setHypnoThreshold(newThreshold);
    localStorage.setItem("hypnoThreshold", newThreshold);
  };

  const handleHypnosisAudioChange = (event) => {
    const selectedAudio = event.target.value;
    setHypnosisAudioOption(selectedAudio);
    localStorage.setItem("hypnosisAudioOption", selectedAudio);
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
      <label htmlFor="hypno-threshold-select">
        Set Hypno Threshold (in minutes):
      </label>
      <select
        id="hypno-threshold-select"
        value={hypnoThreshold}
        onChange={handleHypnoThresholdChange}
      >
        {[...Array(61).keys()].map((i) => (
          <option key={i} value={i}>
            {i === 0 ? "None" : `${i} minute${i > 1 ? "s" : ""}`}
          </option>
        ))}
      </select>

      {hypnoThreshold > 0 && (
        <>
          <label htmlFor="hypnosis-audio-select">Select Hypnosis Audio:</label>
          <select
            id="hypnosis-audio-select"
            value={hypnosisAudioOption}
            onChange={handleHypnosisAudioChange}
          >
            <option value="health">Health - hypnosis-health.mp3</option>
            <option value="habits">Habits - hypnosis-habits.mp3</option>
            <option value="head">Head - hypnosis.mp3</option>
          </select>
        </>
      )}

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
