import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {StatModel} from '../models/statModel';
import {MachineModel} from '../models/machineModel';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  machines: MachineModel[] = [{
    id: 1,
    name: 'PersonalMachine1',
    status: 'RUN'
  }, {
    id: 2,
    name: 'PersonalMachine2',
    status: 'FAILED'
  }, {
    id: 3,
    name: 'PersonalMachine3',
    status: 'RUNNING'
  }, {
    id: 4,
    name: 'PersonalMachine4',
    status: 'STOPPING'
  }];

  getLastOfMachines(): Observable<MachineModel[]> {
    return of(this.machines);
  }
}
