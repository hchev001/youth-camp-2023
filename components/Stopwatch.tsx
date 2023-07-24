import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";

interface StopwatchProps {
  setupTime?: number;
  autoStart?: boolean;
  onStop?: (time: number) => void;
}
const Stopwatch = forwardRef(
  ({ autoStart, onStop, setupTime }: StopwatchProps, ref) => {
    const hasAutoStarted = useRef<boolean>(false);

    // state to store time
    const [time, setTime] = useState(0);

    // state to check stopwatch running or not
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
      let intervalId: NodeJS.Timer;
      if (isRunning) {
        // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
        intervalId = setInterval(() => setTime(time + 1), 10);
      }
      return () => {
        clearInterval(intervalId);
      };
    }, [isRunning, time]);

    // Hours calculation
    const hours = Math.floor(time / 360000);

    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);

    // Milliseconds calculation
    const milliseconds = time % 100;

    // Method to start and stop timer
    const startAndStop = useCallback(() => {
      if (isRunning) {
        onStop?.(time);
      }

      setIsRunning(!isRunning);
    }, [isRunning, onStop, time]);

    // Method to reset timer back to 0
    const reset = useCallback(() => {
      setTime(0);
      setIsRunning(false);
      onStop?.(0);
    }, [onStop]);

    useEffect(() => {
      if (autoStart && !hasAutoStarted.current) {
        if (setupTime) {
          setTime(setupTime);
        } else {
          reset();
        }
        startAndStop();
        hasAutoStarted.current = true;
      }
    }, [autoStart, hasAutoStarted, startAndStop, setupTime, reset]);

    useImperativeHandle(
      ref,
      () => ({
        isRunning: isRunning,
      }),
      [isRunning]
    );

    return (
      <div className="stopwatch-container">
        <p className="text-white text-center text-xl">
          {hours}:{minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}:
          {milliseconds.toString().padStart(2, "0")}
        </p>
        <div className="flex justify-center">
          <button
            className="border-none m-5 py-2.5 px-7 text-white cursor-pointer bg-green-500"
            onClick={startAndStop}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button
            className="border-none m-5 py-2.5 px-7 text-white cursor-pointer bg-red-500"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
);

Stopwatch.displayName = "Stopwatch";

export default Stopwatch;
