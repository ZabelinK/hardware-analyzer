import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MachineModel} from '../models/machineModel';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private http: HttpClient) {
  }

  getLastOfMachines(): Observable<MachineModel[]> {
    return this.http.get<MachineModel[]>('/machine').pipe(
        map((resp: any) => {
          console.log(resp);
          if (!resp) {
            return null;
          }
          return resp;
        })
    );
  }
}
