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

## Documentation

- [Online documentation](https://dmeditor.io/doc)
- Local docs: [`doc/`](./doc/) — see [`doc/README.md`](./doc/README.md)
- For AI agents: [`AGENTS.md`](./AGENTS.md)

> **Note:** `doc/` is a [git submodule](https://github.com/dmeditor/doc). After cloning, run:
> `git submodule update --init --recursive`
