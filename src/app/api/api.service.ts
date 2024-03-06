import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'X-Auth-Token': 'X3HARoodtqsD2S7UOQaUDVxc1uv5ytnV',
      'X-Auth-User': 'massinissa_ahman',
      'X-Auth-Company': 'massi'
    })
  }

  constructor(private http: HttpClient) {
    //set http headers
  }
  getDevices() {
    return this.http.get<any>('https://octave-api.sierrawireless.io/v5.0/massi/device', this.httpOptions).pipe(map((res: any) => {
      return res;
    }
    ))
  }
  getSessionId(): Observable<any> {
    return this.http.post<any>('https://octave-ws.sierrawireless.io/session', null, this.httpOptions);
  }

  public getTemp2() {
    // call this url : https://octave.sierrawireless.io/backend/rest/v5.0/massi/device/events/d656f1d196bf1084309352e15?filter=path+%21%3D+%22%2Fmassi%2Fdevices%2Fwp7702%2F%3Ainbox%22&limit=20&only=elems%2CcreationDate%2Cpath%2Cid&start=140
    // and get the last value of the temperature


    return this.http.get<any>('https://octave.sierrawireless.io/backend/rest/v5.0/massi/device/events/d656f1d196bf1084309352e15', this.httpOptions).pipe(map((res: any) => {
      return res;
    }
    ))

    
  }
}