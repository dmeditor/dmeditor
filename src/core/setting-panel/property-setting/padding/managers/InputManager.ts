import { InputHandler } from '../handlers/InputHandler';
import { UNDEFINED_VALUE, type TYPE_UNDEFINED_VALUE } from '../types';

export class InputManager {
  private handlers: Map<string, InputHandler>;

  constructor() {
    this.handlers = new Map();
  }

  public setValue(id: string, value: number | string | null) {
    let handler = this.handlers.get(id);
    if (!handler) {
      handler = new InputHandler(value);
      this.handlers.set(id, handler);
    } else {
      handler.value = value;
    }
  }

  public getValue(id: string): number | TYPE_UNDEFINED_VALUE {
    const handler = this.handlers.get(id);
    return handler ? handler.value : UNDEFINED_VALUE;
  }
}
