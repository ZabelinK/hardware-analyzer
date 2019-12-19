import {Component, OnInit, ViewChild} from '@angular/core';
import {PcDataService} from './services/pc-data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {StatModel} from './models/statModel';
import {MatTableDataSource} from '@angular/material';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  displayedColumns: string[] = ['cpuLoad', 'memoryLoad', 'numOfProcces', 'lastUpdate'];
  dataSource = null;
  pcData: StatModel[];

  CPUChart: Chart = [];
  MemoryChart: Chart = [];
  ProccessChart: Chart = [];

  show = true;

  constructor(public dataService: PcDataService) {
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
    this.dataService.getLastAvailableData().subscribe(data => {
      this.pcData = data;
      this.dataSource = new MatTableDataSource<StatModel>(this.pcData);
    });
  }

  public cpuChart() {
    return new Chart('lineChart', {
      type: 'scatter',
      labels: [new Date('2015-3-25 13:00').toLocaleString(),
        new Date('2015-3-25 13:10').toLocaleString(),
        new Date('2015-3-25 13:20').toLocaleString(),
        new Date('2015-3-25 13:30').toLocaleString()],
      data: {
        datasets: [{
          data: [{
            x: new Date('2015-3-25 13:00'),
            y: 60
          }, {
            x: new Date('2015-3-25 13:10'),
            y: 90
          }, {
            x: new Date('2015-3-25 13:20'),
            y: 70
          }, {
            x: new Date('2015-3-25 13:30'),
            y: 40
          }],
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

  public memoryChart() {
    return new Chart('memoryChart', {
      type: 'scatter',
      labels: [new Date('2015-3-25 13:00').toLocaleString(),
        new Date('2015-3-25 13:10').toLocaleString(),
        new Date('2015-3-25 13:20').toLocaleString(),
        new Date('2015-3-25 13:30').toLocaleString()],
      data: {
        datasets: [{
          data: [{
            x: new Date('2015-3-25 13:00'),
            y: 70
          }, {
            x: new Date('2015-3-25 13:10'),
            y: 50
          }, {
            x: new Date('2015-3-25 13:20'),
            y: 40
          }, {
            x: new Date('2015-3-25 13:30'),
            y: 76
          }],
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

  public processChart() {
    return new Chart('processChart', {
      type: 'scatter',
      labels: [new Date('2015-3-25 13:00').toLocaleString(),
        new Date('2015-3-25 13:10').toLocaleString(),
        new Date('2015-3-25 13:20').toLocaleString(),
        new Date('2015-3-25 13:30').toLocaleString()],
      data: {
        datasets: [{
          data: [{
            x: new Date('2015-3-25 13:00'),
            y: 8
          }, {
            x: new Date('2015-3-25 13:10'),
            y: 12
          }, {
            x: new Date('2015-3-25 13:20'),
            y: 11
          }, {
            x: new Date('2015-3-25 13:30'),
            y: 7
          }],
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
      this.CPUChart = this.cpuChart();
      this.MemoryChart = this.memoryChart();
      this.ProccessChart = this.processChart();
    } else {
      this.CPUChart.destroy();
      this.MemoryChart.destroy();
      this.ProccessChart.destroy();
    }
  }
}

