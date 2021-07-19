type IComposeRefFxn = (
  ref: React.MutableRefObject<any>
) => React.MutableRefObject<any>;

export const mergeRefs = (...refs: React.MutableRefObject<any>[]) => {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) return null;
  if (filteredRefs.length === 1) return filteredRefs[0];

  return (inst: React.MutableRefObject<any>) => {
    for (const ref of filteredRefs) {
      if (typeof ref === "function") {
        (ref as IComposeRefFxn)(inst);
      } else if (ref) {
        ref.current = inst;
      }
    }
  };
};

function composeRefs(...args: React.MutableRefObject<any>[]) {
  return (ref: React.MutableRefObject<any>) => {
    args.forEach((arg) => {
      if (!arg) {
        return;
      }

      if (typeof arg === "function") {
        (arg as IComposeRefFxn)(ref);
        return;
      }

      arg.current = ref;
    });
  };
}

export default composeRefs;
