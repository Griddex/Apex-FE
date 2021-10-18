import React from "react";

const initBeforeUnLoad = (showExitPrompt: boolean) => {
  window.onbeforeunload = (event: BeforeUnloadEvent) => {
    if (showExitPrompt) {
      const e = event || window.event;
      e.preventDefault();
      if (e) {
        e.returnValue = "";
      }
      return "";
    }
  };
};

export default function useExitPrompt(bool: boolean) {
  const [showExitPrompt, setShowExitPrompt] = React.useState(bool);

  window.onload = function () {
    initBeforeUnLoad(showExitPrompt);
  };

  React.useEffect(() => {
    initBeforeUnLoad(showExitPrompt);
  }, [showExitPrompt]);

  return [showExitPrompt, setShowExitPrompt];
}
