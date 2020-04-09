import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {HttpClientModule} from '@angular/common/http';
import {PcDataService} from './pc-data.service';
import {MachineService} from './machine.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MachineModel} from '../models/machineModel';
import {of} from 'rxjs';
import {StatModel} from '../models/statModel';

describe('PCDataService', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let service: PcDataService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule],
            providers: [MachineService]
        });
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new PcDataService(<any>httpClientSpy);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('be able to get data from the API', () => {

        const statModels: StatModel[] = [{machine_id: 1, process: 2, memory_load: 70, timestamp: 12312, cpu_load: 23}];

        httpClientSpy.get.and.returnValue(of(statModels));
        service.getLastAvailableData(1).subscribe(machines => expect(machines).toEqual(statModels, 'expect pcdata'), fail);
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });
    it('null return', () => {
        const dummyPosts = null;

        httpClientSpy.get.and.returnValue(of(null));
        service.getLastAvailableData(1).subscribe(machines => expect(machines).toEqual(dummyPosts, 'expect pcdata'), fail);
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });
});
