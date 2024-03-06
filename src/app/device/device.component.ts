import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api/api.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device.component.html',
  styleUrl: './device.component.css'
})
export class DeviceComponent implements OnInit {

  device: any;

  constructor(
    private api: ApiService
  ) { }
  ngOnInit(): void {
    this.getDevice();
  }

  getDevice() {
    this.api.getDevices().subscribe(res => {
      this.device = res.body[0];
      console.log(res.body[0]);
    });
  }

}
