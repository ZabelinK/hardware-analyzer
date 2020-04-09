import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {HttpClientModule} from '@angular/common/http';
import {MachineService} from './machine.service';
import {MachineModel} from '../models/machineModel';
import {Pipe, PipeTransform} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable, of} from 'rxjs';

describe('MachineService', () => {

    let httpClientSpy: { get: jasmine.Spy };
    let service: MachineService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule],
            providers: [MachineService]
        });
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new MachineService(<any>httpClientSpy);
    });

    it('should be created', () => {
        const servic: MachineService = TestBed.get(MachineService);
        expect(servic).toBeTruthy();
    });

    it('be able to get data from the API', () => {
        const dummyPosts: MachineModel[] = [{
            id: 1,
            name: 'MachineName',
            status: 'AVALIABLE'
        }];

        httpClientSpy.get.and.returnValue(of(dummyPosts));
        service.getLastOfMachines().subscribe(machines => expect(machines).toEqual(dummyPosts, 'expect machines'), fail);
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });
    it('null return', () => {
        const dummyPosts = null;

        httpClientSpy.get.and.returnValue(of(null));
        service.getLastOfMachines().subscribe(machines => expect(machines).toEqual(dummyPosts, 'expect machines'), fail);
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });
});
