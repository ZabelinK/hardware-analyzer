import {Component, Input, OnInit} from '@angular/core';
import {MachineService} from '../services/machine.service';
import {MatTableDataSource} from '@angular/material';
import {StatModel} from '../models/statModel';
import {MachineModel} from '../models/machineModel';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {

  dataSource = null;

  displayedColumns: string[] = ['select', 'image', 'machineId', 'status'];

  machines: MachineModel[];

  constructor(public machineService: MachineService) {
  }

  ngOnInit() {
    this.machineService.getLastOfMachines().subscribe(data => {
      this.machines = data;
      this.dataSource = new MatTableDataSource<MachineModel>(this.machines);
    });
  }

  isRed(status: string) {
    return status === 'FAILED';
  }

  isGreen(status: string) {
    return status === 'RUN' || status === 'RUNNING';
  }

  isYellow(status: string) {
    return status === 'STOPED' || status === 'STOPPING';
  }

}
