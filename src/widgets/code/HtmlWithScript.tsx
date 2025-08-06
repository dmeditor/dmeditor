import { useEffect, useRef } from 'react';

export const HtmlWithScript = ({ html }: { html: string }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container: any = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    // Parse the HTML string
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Move non-script nodes into the container
    Array.from(tempDiv.childNodes).forEach((node: any) => {
      if (node.tagName !== 'SCRIPT') {
        container.appendChild(node.cloneNode(true));
      }
    });

    // Handle script tags
    Array.from(tempDiv.querySelectorAll('script')).forEach((scriptTag) => {
      const newScript = document.createElement('script');

      // Copy attributes like src, type, etc.
      Array.from(scriptTag.attributes).forEach((attr) =>
        newScript.setAttribute(attr.name, attr.value),
      );

      // Copy inline content if any
      newScript.textContent = scriptTag.textContent;

      container.appendChild(newScript);
    });
  }, [html]);

  return <div ref={containerRef} />;
};
