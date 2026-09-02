# DM Editor — agent guide

## Documentation

Full documentation lives in [`doc/`](./doc/). Start at [`doc/README.md`](./doc/README.md).

> **Note:** `doc/` is a [git submodule](https://github.com/dmeditor/doc). After cloning, run:
> `git submodule update --init --recursive`

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
