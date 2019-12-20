import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {StatModel} from '../models/statModel';
import {MachineModel} from '../models/machineModel';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PcDataService {

    constructor(private http: HttpClient) {
    }

  getLastAvailableData(machineId: number): Observable<StatModel[]> {
        const url = '/statistic/' + machineId;
        console.log(url);
          return this.http.get<StatModel[]>(url).pipe(
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
