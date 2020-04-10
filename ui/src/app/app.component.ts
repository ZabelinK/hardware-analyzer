import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PcDataService} from './services/pc-data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {StatModel} from './models/statModel';
import {MatTableDataSource} from '@angular/material';
import {Chart} from 'chart.js';
import {MachineModel} from './models/machineModel';
import {MachineService} from './services/machine.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  displayedColumns: string[] = ['cpu_load', 'memory_load', 'process', 'timestamp'];
  dataSource = null;
  pcData: StatModel[];
  machines: MachineModel[];

  CPUChart: Chart = [];
  cpuDataSet = [];
  MemoryChart: Chart = [];
  memoryDataSet = [];
  ProccessChart: Chart = [];
  processDataSet = [];
  @Input() format;
  @Input() statisticFormat;

  show = true;

  constructor(public dataService: PcDataService, public machineService: MachineService) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  activeTabIndex: any;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  public loadData() {
  }

  public cpuChart(dataSet) {
    const labelArray = [];
    dataSet.forEach(entity => labelArray.push(entity.y.toLocaleString()));
    return new Chart('lineChart', {
      type: 'scatter',
      labels: labelArray,
      data: {
        datasets: [{
          data: dataSet,
          showLine: true,
          label: 'CPU Load'
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              displayFormats: {
                quarter: 'MMM YYYY'
              }
            }
          }]
        }
      }
    });
  }

  public memoryChart(dataSet) {
    const labelArray = [];
    dataSet.forEach(entity => labelArray.push(entity.y.toLocaleString()));
    return new Chart('memoryChart', {
      type: 'scatter',
      labels: labelArray,
      data: {
        datasets: [{
          data: dataSet,
          showLine: true,
          label: 'Memory Load'
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              displayFormats: {
                quarter: 'MMM YYYY'
              }
            }
          }]
        }
      }
    });
  }

  public processChart(dataSet) {
    const labelArray = [];
    dataSet.forEach(entity => labelArray.push(entity.y.toLocaleString()));
    return new Chart('processChart', {
      type: 'scatter',
      labels: labelArray,
      data: {
        datasets: [{
          data: dataSet,
          showLine: true,
          label: 'Process Count'
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              displayFormats: {
                quarter: 'MMM YYYY'
              }
            }
          }]
        }
      }
    });
  }

  onTabGroupClicked() {
    if (this.activeTabIndex === 2) {
      this.show = false;
      this.CPUChart = this.cpuChart(this.cpuDataSet);
      this.MemoryChart = this.memoryChart(this.memoryDataSet);
      this.ProccessChart = this.processChart(this.processDataSet);
    } else {
      this.CPUChart.destroy();
      this.MemoryChart.destroy();
      this.ProccessChart.destroy();
    }
  }

  machineIdChangeLoad(machineId: number) {
    this.dataService.getLastAvailableData(machineId).subscribe(stat => {
      this.pcData = stat;
      this.dataSource = new MatTableDataSource<StatModel>(this.pcData);
      this.dataSource.sort = this.sort;

      this.pcData.forEach(entity => {
        const yCpu = entity.cpu_load;
        const yMem = entity.memory_load;
        const yProc = entity.process;

        const datePipe = new DatePipe('en-US');
        const timeStamp = entity.timestamp * 1000;
        const xData = datePipe.transform(timeStamp, 'yyyy-MM-dd HH:mm');

        this.cpuDataSet.push({x: xData , y: yCpu});
        this.memoryDataSet.push({x: xData , y: yMem});
        this.processDataSet.push({x: xData , y: yProc});
      });

      console.log(this.cpuDataSet);
      console.log(this.memoryDataSet);
      console.log(this.processDataSet);
    });
  }
}

