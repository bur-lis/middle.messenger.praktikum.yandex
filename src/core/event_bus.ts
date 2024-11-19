import { Listeners, Callback, Props } from "./type";

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
      
      if (event === 'updated') console.log(this, this.listeners)
    }
  
    off(event: string, callback:Callback) {
          if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }
  
      this.listeners[event] = this.listeners[event].filter(
        listener => listener !== callback
      );
    }
  
      emit(event: string, args?: Props) {
        if (event === 'updated') console.log(this, this.listeners)
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }
      
      this.listeners[event].forEach(function(listener:Callback) {
        listener(args);
      });
    }
  }

