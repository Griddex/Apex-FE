export const mergeRefs = (...refs) => {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) return null;
  if (filteredRefs.length === 1) return filteredRefs[0];
  return (inst) => {
    for (const ref of filteredRefs) {
      if (typeof ref === "function") {
        ref(inst);
      } else if (ref) {
        ref.current = inst;
      }
    }
  };
};

function composeRefs(...args) {
  return (ref) => {
    args.forEach((arg) => {
      if (!arg) {
        return;
      }

      if (typeof arg === "function") {
        arg(ref);
        return;
      }

      arg.current = ref;
    });
  };
}

export default composeRefs;
