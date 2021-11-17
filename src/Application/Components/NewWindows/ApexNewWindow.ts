import React from "react";
import ReactDOM from "react-dom";

interface IApexNewWindow {
  children: JSX.Element;
  closeWindowPortal: () => void;
}

export const ApexNewWindow = ({
  children,
  closeWindowPortal,
}: IApexNewWindow) => {
  const externalWindow = React.useRef(
    window.open(
      "",
      "",
      "width=400,height=800,left=200,top=200,resizable,scrollbars,menubar=off,toolbar=off"
    )
  ) as React.MutableRefObject<Window>;

  const containerEl = document.createElement("div");

  if (externalWindow.current) {
    externalWindow.current.document.title = "A React portal window";
    externalWindow?.current.document.body.appendChild(containerEl);
    copyStyles(document, externalWindow.current.document);

    externalWindow.current.addEventListener("beforeunload", () => {
      closeWindowPortal();
    });
  }

  React.useEffect(() => {
    const currentWindow = externalWindow.current;
    return () => currentWindow?.close();
  }, []);

  return ReactDOM.createPortal(children, containerEl);
};

function copyStyles(sourceDoc: Document, targetDoc: Document) {
  console.log(
    "🚀 ~ file: ApexNewWindow.ts ~ line 42 ~ copyStyles ~ sourceDoc",
    sourceDoc
  );
  console.log(
    "🚀 ~ file: ApexNewWindow.ts ~ line 47 ~ copyStyles ~ sourceDoc.styleSheets",
    sourceDoc.styleSheets
  );
  console.log(
    "🚀 ~ file: ApexNewWindow.ts ~ line 50 ~ copyStyles ~ window.location.origin",
    window.location.origin
  );
  const styleSheets = Array.from(sourceDoc.styleSheets).filter(
    (styleSheet) =>
      !styleSheet.href || styleSheet.href.startsWith(window.location.origin)
  );
  console.log(
    "🚀 ~ file: ApexNewWindow.ts ~ line 52 ~ copyStyles ~ styleSheets",
    styleSheets
  );

  Array.from(styleSheets).forEach((styleSheet) => {
    if (styleSheet instanceof CSSStyleSheet && styleSheet.cssRules) {
      // true for inline styles
      const newStyleEl = sourceDoc.createElement("style");

      Array.from(styleSheet.cssRules).forEach((cssRule) => {
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
      });

      targetDoc.head.appendChild(newStyleEl);
    } else if (styleSheet.href) {
      // true for stylesheets loaded from a URL
      const newLinkEl = sourceDoc.createElement("link");

      newLinkEl.rel = "stylesheet";
      newLinkEl.href = styleSheet.href;
      targetDoc.head.appendChild(newLinkEl);
    }
  });
}
