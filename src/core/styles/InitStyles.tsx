import { css } from '@emotion/css';

// import { toolImageText } from '../core/components/widgets/image-text/ImageText';
// import { toolHeading } from '../core/components/widgets/heading/Heading';
import { registerStyle, registerTemplate } from '../ToolDefinition';

export const initStyles = () => {
  //templates
  registerStyle({
    blocktype: 'heading',
    identifier: 'gradient',
    name: 'Gradient',
    css: css`
      h1,
      h2,
      h3,
      h4,
      h5 {
        background-image: linear-gradient(45deg, #2c00ff, #ff009b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        display: inline-block;
      }
    `,
  });
  registerStyle({
    blocktype: 'grid',
    identifier: 'space-small',
    name: 'Small space',
    css: css`
      .dm-columns > div {
        margin: 0px 4px;
      }
    `,
  });
  // registerStyle({
  //   blocktype: 'imagetext',
  //   identifier: 'loose',
  //   name: 'Loose',
  //   css: css`
  //     background-color: #133e48;
  //     color: #ffffff;
  //     padding: 20px 30px;
  //     .dme-imagetext-container > div:first-child .dme-blocklist {
  //       padding-right: 10px;
  //     }
  //     .dme-imagetext-container > div:last-child .dme-blocklist {
  //       padding-left: 10px;
  //     }

  //     .dmeditor-view-mobile & .dme-blocklist {
  //       padding: 0px !important;
  //     }
  //   `,
  //   icon: toolImageText.menu.icon,
  // });

  //global
  if (typeof window !== 'undefined' && (window as any).dmeditor) {
    let styles = (window as any).dmeditor.styles;
    if (styles) {
      for (let style of styles) {
        style.css = css(style.css); //generate css
        registerStyle(style);
      }
    }
  }
};
