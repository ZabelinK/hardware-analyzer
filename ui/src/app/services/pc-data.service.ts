import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {StatModel} from '../models/statModel';

@Injectable({
  providedIn: 'root'
})
export class PcDataService {
  pcData: StatModel[] = [{
      machineId: 10001234,
      process: 6,
      cpuLoad: 2,
      memoryLoad: 3,
      timestamp: '1576074881343'
    }, {
      machineId: 10001234,
      process: 38,
      cpuLoad: 4,
      memoryLoad: 2,
      timestamp: '1576074881143'
    }, {
      machineId: 10001234,
      process: 12,
      cpuLoad: 1,
      memoryLoad: 5,
      timestamp: '1576074871343'
    },
  ];

  getLastAvailableData(): Observable<StatModel[]> {
    return of(this.pcData);
  }
}
