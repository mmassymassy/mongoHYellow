import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../api/websocket.service';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-temperature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './temperature.component.html',
  styleUrl: './temperature.component.css'
})
export class TemperatureComponent implements OnInit {
  
  events : any = [];
  sessionId : string = '';
  constructor(private socket: WebSocketService, private api : ApiService ) { }
  ngOnInit(): void {
    this.getSessionId();
  
    this.getTemp();
    console.log('Session ID:', this.sessionId);
  }
  getSessionId(){
    this.api.getSessionId().subscribe(
      data => {
        console.log('Session ID:', data);
        this.sessionId = data.body.id;
        console.log('Session ID:', this.sessionId);
        this.getEvents(this.sessionId);
      },
      error => {
        console.error('Error obtaining session ID:', error);
      }
    );
  }
  getEvents(id: string = this.sessionId) {
    this.socket.connectWebSocket(id);
    this.socket.getTemperature();
  
    this.socket.webSocket.onmessage = (event) => {
      try {
        const eventData = JSON.parse(event.data);
        
          this.events.push(eventData);
          console.log(this.events);
        
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
  }
  getTemp(){
    console.log('Getting temperature by api:');
    
    this.api.getTemp2().subscribe(
      data => {
        console.log('Temperature:', data);
      },
      error => {
        console.error('Error obtaining temperature:', error);
      }
    );
  }
//    this.events = {"head":{"status":200,"ok":true,"messages":[],"errors":[],"references":{}},"body":[{"id":"e6571069b16e3583fbd5b55e8","creationDate":1701906075565,"path":"/massi/devices/wp7702/temperature","elems":{"environment":{"temperature":9.968935}}},{"id":"e6571068f53004b6254250d0d","creationDate":1701906063521,"path":"/massi/devices/wp7702/temperature","elems":{"environment":{"temperature":10.338329}}},{"id":"e6571068316e3583fbd5b54c0","creationDate":1701906051550,"path":"/massi/devices/wp7702/temperature","elems":{"environment":{"temperature":11.589867}}},{"id":"e6571067753004b6254250bae","creationDate":1701906039528,"path":"/massi/devices/wp7702/temperature","elems":{"environment":{"temperature":15.641051}}},{"id":"e6571066b16e3583fbd5b53aa","creationDate":1701906027775,"path":"/massi/devices/wp7702/temperature","elems":{"environment":{"temperature":28.469999}}},{"id":"e6571066b16e3583fbd5b539e","creationDate":1701906027418,"path":"/massi/devices/wp7702/ambienttemp","elems":{"environment":{"ambientAirTemp":10.0}}},{"id":"e6571066b16e3583fbd5b539c","creationDate":1701906027410,"path":"/massi/devices/wp7702/ambientairtemp","elems":{"environment":{"ambientAirTemp":10.0}}},{"id":"e6571066aff45c86583259575","creationDate":1701906026048,"path":"/massi/devices/wp7702/:command","elems":{"/environment/ambientAirTemp":10}}]};

}
