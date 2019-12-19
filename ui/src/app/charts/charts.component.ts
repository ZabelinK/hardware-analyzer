import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {PcDataService} from '../services/pc-data.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  cpuLoad = [];
  time = [];
  Linechart = [];

  constructor(public dataService: PcDataService) {
  }

  ngOnInit() {
    this.dataService.getLastAvailableData().subscribe(data => {
      data.forEach(x => {
        this.cpuLoad.push(x.cpuLoad);
        this.time.push(x.memoryLoad);
      });
    });
  }


}
