import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MatIcon, MatIconModule, MatTableModule} from '@angular/material';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MachineComponent} from './machine/machine.component';
import {MachineModel} from './models/machineModel';
import {Observable, of} from 'rxjs';
import {StatModel} from './models/statModel';
import {MachineService} from './services/machine.service';
import {PcDataService} from './services/pc-data.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const statModels: StatModel[] = [{machine_id: 1, process: 2, memory_load: 70, timestamp: 12312, cpu_load: 23}];

  // tslint:disable-next-line:class-name
  class fakePCService {
    getLastAvailableData(): Observable<StatModel[]> {
      return of(statModels);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientModule, RouterTestingModule, MatTableModule ],
      declarations: [
        AppComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [{ provide: PcDataService, useClass: fakePCService}],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the app', async(() => {
    expect(component).toBeTruthy();
    component.loadData();
    component.activeTabIndex = 2;
    component.onTabGroupClicked();
    component.activeTabIndex = 1;
    component.onTabGroupClicked();
    component.machineIdChangeLoad(1);
  }));
});
