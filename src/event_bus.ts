type Callback = (args: string | undefined) => void;
type Listeners = Record<string, Array<Callback>>;

export class EventBus {
  private listeners:Listeners;
    constructor() {
      this.listeners = {};
    }
  
    on(event: string, callback:Callback) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
  
      this.listeners[event].push(callback);
    }
  
    off(event: string, callback:Callback) {
          if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }
  
      this.listeners[event] = this.listeners[event].filter(
        listener => listener !== callback
      );
    }
  
      emit(event: string, args?: string) {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }
      
      this.listeners[event].forEach(function(listener:Callback) {
        listener(args);
      });
    }
  }