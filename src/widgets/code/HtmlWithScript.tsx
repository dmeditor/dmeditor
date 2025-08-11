import { useEffect, useRef, useState } from 'react';

export const HtmlWithScript = ({
  html,
  renderAsIframe,
}: {
  html: string;
  renderAsIframe?: boolean;
}) => {
  if (!renderAsIframe) {
    return <HtmlDiv html={html} />;
  } else {
    return <HtmlIframe html={html} />;
  }
};

const HtmlDiv = ({ html }: { html: string }) => {
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

const HtmlIframe = ({ html }: { html: string }) => {
  const [height, setHeight] = useState(100);
  const [htmlIframe, setHtmlIframe] = useState('');

  const setHeightWaitingTime = 1000; //ms

  useEffect(() => {
    const htmlIframe = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title></title>
      <script>
      function sendHeight() {
            const body = document.body;
            const height = body.scrollHeight;
            parent.postMessage({ type: 'setHeight', height }, '*');
          }
          window.addEventListener('load', ()=>{
            setTimeout(sendHeight, ${setHeightWaitingTime});
          });
          // window.addEventListener('resize', sendHeight);
      </script>
    </head>
    <body style="margin:0;padding:0;">
     ${html}
    </body>
    </html>
  `;
    setHtmlIframe(htmlIframe);
  }, [html]);

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data?.type === 'setHeight' && typeof event.data.height === 'number') {
        setHeight(event.data.height);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return <iframe srcDoc={htmlIframe} style={{ border: 'none', width: '100%', height: height }} />;
};
