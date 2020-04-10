import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineComponent } from './machine.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {MatRadioChange, MatTableModule} from '@angular/material';
import {MachineService} from '../services/machine.service';
import {Observable, of} from 'rxjs';
import {MachineModel} from '../models/machineModel';
import {map} from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';

describe('MachineComponent', () => {
  let component: MachineComponent;
  let fixture: ComponentFixture<MachineComponent>;
  const machines: MachineModel[] = [{id: 1, name: 'machine', status: 'failed'}];

  // tslint:disable-next-line:class-name
  class fakeMachineService {
    getLastOfMachines(): Observable<MachineModel[]> {
      return of(machines);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientModule, RouterTestingModule, MatTableModule ],
      declarations: [ MachineComponent ],
      providers: [{ provide: MachineService, useClass: fakeMachineService}],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isRed('FAILED')).toBeTruthy();
    expect(component.isGreen('RUN')).toBeTruthy();
    expect(component.isGreen('RUNNING')).toBeTruthy();
    expect(component.isYellow('STOPED')).toBeTruthy();
    expect(component.isYellow('STOPPING')).toBeTruthy();
    expect(component.checkBoxChange(false, null)).toBeNull();
    expect(component.checkBoxChange(true, machines));
  });
});
