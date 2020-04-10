import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MachineService} from '../services/machine.service';
import {MatRadioChange, MatTableDataSource} from '@angular/material';
import {StatModel} from '../models/statModel';
import {MachineModel} from '../models/machineModel';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {

  dataSource = null;

  displayedColumns: string[] = ['select', 'image', 'machineId', 'status'];

  selection = new SelectionModel<MachineModel>(false, []);

  machines: MachineModel[] = [];

  @Output() machineIdCHange = new EventEmitter();

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

  checkBoxChange(event: any, row: any) {
    if (event) {
      this.selection.toggle(row);
      this.machineIdCHange.emit(this.selection.selected[0].id);
    } else {
      return null;
    }
  }
}
