import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api/api.service';
import { OnInit } from '@angular/core';
import { WebSocketService } from '../api/websocket.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  events: any = [];
  sessionId: string = '';

  constructor(private socket: WebSocketService, private api : ApiService) { }
  ngOnInit(): void { //this is the first method that is called when the component is loaded
    this.getSessionId();
    console.log('Session ID:', this.sessionId);


  }
  getSessionId() {
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
    this.socket.getBatteryLevel();
  
    this.socket.webSocket.onmessage = (event) => {
      try {
        const eventData = JSON.parse(event.data);
        
        // Check if the message type is "message" and has the desired streamId
          this.events.push(eventData);
          console.log(this.events);
        
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
  }
  



}
