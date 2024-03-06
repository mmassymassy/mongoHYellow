import { Injectable } from '@angular/core';
import { WebSocketFactory } from 'rxjs-websockets';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  public webSocket: WebSocket;
  public webSocket2: WebSocket;

  private sessionId: string = '';

  constructor() {
    this.webSocket = new WebSocket(`wss://octave-ws.sierrawireless.io/session/${this.sessionId}/ws`);
    this.webSocket2 = new WebSocket(`wss://octave-ws.sierrawireless.io/session/${this.sessionId}/ws`);


  }



  public connectWebSocket(id:string): void {
    const webSocketUrl = `wss://octave-ws.sierrawireless.io/session/${id}/ws`;

    this.webSocket = new WebSocket(webSocketUrl);
    this.webSocket2 = new WebSocket(webSocketUrl);


    // WebSocket event listeners...
    this.webSocket.onopen = () => {
      console.log('Battery WebSocket connection opened.');
      this.getBatteryLevel();
    };
    this.webSocket2.onopen = () => {
      console.log('Battery WebSocket connection opened.');
      this.getTemperature();
    };

    this.webSocket.onclose = () => {
      console.log('Battery WebSocket connection closed.');
    };
    this.webSocket.onclose = () => {
      console.log('Env WebSocket connection closed.');
    };
  }

  public getBatteryLevel(): void {
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
      const subscribeMessage = {
        msgId: 'my-request',
        object: 'event',
        type: 'subscribe',
        streamId: 's65e73d5ade69b41fe8d59a13',
      };

      this.webSocket.send(JSON.stringify(subscribeMessage));

     /* 
      this.webSocket.onmessage = (event) => {
        console.log('WebSocket message received:', event);
      }
      */


    } else {
      console.error('WebSocket is not open. Unable to subscribe to events.');
    }
  }

  public getTemperature(): void {
    if (this.webSocket2 && this.webSocket2.readyState === WebSocket.OPEN) {
      const subscribeMessage = {
        msgId: 'my-request2',
        object: 'event',
        type: 'subscribe',
        streamId: 's658219e32fe424274e5a8032',
      };

      this.webSocket2.send(JSON.stringify(subscribeMessage));
      /*
      this.webSocket.onmessage = (event) => {
        console.log('WebSocket message received:', event);
      }
    */

    } else {
      console.error('ENV WebSocket is not open. Unable to subscribe to events.');
    }
  }



  
}
