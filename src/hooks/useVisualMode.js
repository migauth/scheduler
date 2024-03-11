import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false) {
    setHistory(prev => {
      if (replace) {
        // Replace the current mode by removing the last element and adding the new mode
        return [...prev.slice(0, prev.length - 1), newMode];
      }
      // Add the new mode to the history
      return [...prev, newMode];
    });
  }

  function back() {
    setHistory(prev => {
      if (prev.length > 1) {
        return [...prev.slice(0, prev.length - 1)];
      }
      return prev;
    });
  }

  return { mode: history[history.length - 1], transition, back };
}
