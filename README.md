# DM Editor

DM Editor is a block-styled visual editor written in React.

The idea behind is to have an editor where it is easy to develop and style widget within React ecosystem, in the end **together with developer** bring good user experience for page editing.

[Simple demo](https://demo.dmeditor.io)

- [Documentation (online)](https://dmeditor.io/doc)
- [Roadmap](https://github.com/orgs/dmeditor/projects/1)
- [Discussions on Github](https://github.com/dmeditor/dmeditor/discussions)

## Installation

See [sample project](https://github.com/dmeditor/dmeditor-sample)

```shell
npm install dmeditor
```

**First example**

```typescript
import { registerDefaultWidgets, DMEditor } from "dmeditor";

registerDefaultWidgets();

const App = () => {
  return (
    <div>
      <DMEditor />
    </div>
  );
};
```

### Highlights

- Block based, real WYSIWYG (What you see is what you get)
- See immediate change while slide on padding, width, color, margin, etc
- Interactive widgets like tab, accordion
- Get benefits of React ecosystem for creating widget
- Widgets can be inside widget
- Extend styles of a widget

### Widgets

See [here](https://dmeditor.io/widgets) for widgets.

## Sample projects

- [React project](https://github.com/dmeditor/dmeditor-sample/)
- [Next.js sample project](https://github.com/dmeditor/dmeditor-server/)
- [Monorepo sample project](https://github.com/dmeditor/sample-monorepo/) — admin and front site share configuration and widgets

## Documentation (local)

Full documentation lives in [`doc/`](./doc/). Start at [`doc/README.md`](./doc/README.md).

> **Note:** `doc/` is a [git submodule](https://github.com/dmeditor/doc). After cloning, run:
> `git submodule update --init --recursive`

After `npm run build`, the same docs are also shipped in the npm package under `doc/`.

### Concepts

- [Concepts and principles](./doc/tutorial/concepts.md)

### Tutorial — use DM Editor

- [Use DM Editor for edit and view](./doc/tutorial/use-dmeditor.md)
- [Use DMEditorView](./doc/tutorial/use-dmeditor-view.md)
- [Edit/view configuration](./doc/tutorial/dmeditor-configuration.md)
- [SSR prefetch](./doc/tutorial/ssr.md)
- [System integration (image browsing, saving blocks)](./doc/tutorial/integration.md)
- [Configure style settings](./doc/tutorial/how-to-configure-style-settings.md)
- [CSS settings](./doc/tutorial/css-settings.md)
- [Utilities](./doc/tutorial/utils.md)

### Tutorial — develop a widget

- [Make a basic widget](./doc/tutorial/how-to-make-widget.md)
- [Make a mixed widget](./doc/tutorial/how-to-make-mixed-widget.md)
- [Make a widget variant](./doc/tutorial/how-to-make-a-widget-variant.md)
- [Style a widget](./doc/tutorial/How-to-make-a-widget-style.md)

### API reference

**Use DM Editor and style blocks**

| Topic | Local doc |
| --- | --- |
| DMEditor, DMEditorView, dmeServerSideLoad | [doc/reference/dmeditor.md](./doc/reference/dmeditor.md) |
| Register style and style options | [doc/reference/styles.md](./doc/reference/styles.md) |
| Configuration (predefined colors, etc.) | [doc/reference/configuration.md](./doc/reference/configuration.md) |
| Callbacks (image library, etc.) | [doc/reference/callbacks.md](./doc/reference/callbacks.md) |
| CSS variables and classes | [doc/reference/css-variables.md](./doc/reference/css-variables.md) |
| Built-in widget style keys | [doc/reference/widget-style-keys.md](./doc/reference/widget-style-keys.md) |

**Develop a widget**

| Topic | Local doc |
| --- | --- |
| registerWidget | [doc/reference/widget.md](./doc/reference/widget.md) |
| WidgetRenderProps | [doc/reference/widget-render-props.md](./doc/reference/widget-render-props.md) |
| Hooks (useEditorStore, useDevice) | [doc/reference/hooks.md](./doc/reference/hooks.md) |
| BlockRender, BlockListRender | [doc/reference/block-render.md](./doc/reference/block-render.md) |
| Setting components | [doc/reference/setting-components.md](./doc/reference/setting-components.md) |
| Utility components and functions | [doc/reference/utility.md](./doc/reference/utility.md) |
