# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from HWMonitoring.models.machine import Machine  # noqa: E501
from HWMonitoring.models.statistic import Statistic  # noqa: E501
from HWMonitoring.models.base_model_ import Model
from HWMonitoring.test import BaseTestCase


class TestMachinesController(BaseTestCase):
    """MachinesController integration test stubs"""

    def test_get_invalid_machine(self):
        """Test case for get_machine

        Get machine by id
        """

        response = self.client.open(
            '/v2/machine/'.format(machineId=999),
            method='GET',
            content_type='application/json')
        self.assert404(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_add_machine(self):
        """Test case for add_machine

        Add a new machine
        """
        body = {'name' : "TestMachine", 'status' : "RUN"}
        response = self.client.open(
            '/v2/machine',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_delete_invalid_machine(self):
        """Test case for delete_machine

        Update an existing pet
        """
        response = self.client.open(
            '/v2/machine/{machineId}'.format(machineId=999),
            method='DELETE',
            content_type='application/json')
        self.assert404(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_delete_machine(self):
        
        body = {'name' : "TestMachine", 'status' : "RUN"}
        response1 = self.client.open(
            '/v2/machine',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')

        id = json.loads(response1.data)['id']

        print(id)

        response = self.client.open(
            '/v2/machine/{machineId}'.format(machineId=id),
            method='DELETE',
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_machine(self):
  
        body = {'name' : "TestMachine", 'status' : "RUN"}
        response1 = self.client.open(
            '/v2/machine',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')

        id = json.loads(response1.data)['id']

        response = self.client.open(
            '/v2/machine/{machineId}'.format(machineId=id),
            method='GET',
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


    

    def test_get_none_machine(self):

        response = self.client.open(
            '/v2/machine/',
            method='GET',
            content_type='application/json')
        self.assert404(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_all_machines(self):

        body = {'name' : "TestMachine", 'status' : "RUN"}
        response1 = self.client.open(
            '/v2/machine',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')

    
        response = self.client.open(
            '/v2/machine',
            method='GET',
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_statistic_null(self):
        query_string = [('period', 'full')]
        response = self.client.open(
            '/v2/statistic/{machineId}'.format(machineId=789),
            method='GET',
            content_type='application/json',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))
        print("TEST 1 ", response.data.decode('utf-8'))



    def test_model_machine_dict(self):
        machine = {'name' : "TestName", 'status' : "RUN"}
        mach = Machine(name_=machine['name'], status_=machine['status'])
        res = mach.to_dict()
        res.pop('id')
        assert(res == machine)
        assert(mach.status == machine['status'])
        assert(mach.name == machine['name'])
        
    def test_model_machine_dict_from(self):
        machine = {'name' : "TestName", 'status' : "RUN"}
        mach = Machine(name_=machine['name'], status_=machine['status'])
        mach.status == machine['status']
        mach.name == machine['name']
        res = mach.to_dict()
        res.pop('id')
        assert(res == machine)
        assert(mach.status == machine['status'])
        assert(mach.name == machine['name'])
        
    def test_model_machine_invalid_status2(self):
        machine = {'name' : "TestName", 'status' : "RUN"}
        mach = Machine(name_=machine['name'], status_=machine['status'])
        try:
            mach.status == "SOMESHIT"
        except ValueError:
            print("ASFQE!@!!!!!!!!!!!!!!!!")
            pass
        except Exception:
            assert(False)

    def test_model_statistic_dict(self):
        statistic = {'machine_id' : 5, 'process' : 1 , 'cpu_load' : 52, 'memory_load' : 35, 'timestamp' : 124324}
        stat = Statistic(machine_id_=statistic['machine_id'], process_=statistic['process'], cpu_load_=statistic['cpu_load'], memory_load_=statistic['memory_load'],
            timestamp_=statistic['timestamp'])
        res = stat.to_dict()
        res.pop('id')
        print(stat.machine_id)
        assert(res == statistic)
        assert(stat.machine_id == statistic['machine_id'])
        assert(stat.process == statistic['process'])
        assert(stat.cpu_load == statistic['cpu_load'])
        assert(stat.memory_load == statistic['memory_load'])
        assert(stat.timestamp == statistic['timestamp'])

    def test_model_statistic_dict_from(self):
        statistic = {'machine_id' : 5, 'process' : 1 , 'cpu_load' : 52, 'memory_load' : 35, 'timestamp' : 124324}
        stat = Statistic(machine_id_=statistic['machine_id'], process_=statistic['process'], cpu_load_=statistic['cpu_load'], memory_load_=statistic['memory_load'],
            timestamp_=statistic['timestamp'])
        stat.machine_id = statistic['machine_id']
        stat.process = statistic['process']
        stat.cpu_load = statistic['cpu_load']
        stat.memory_load = statistic['memory_load']
        stat.timestamp = statistic['timestamp']
        res = stat.to_dict()
        res.pop('id')
        print(stat.machine_id)
        assert(res == statistic)

    def test_add_statistic(self):
  
        body = {'name' : "TestMachine", 'status' : "RUN"}
        response = self.client.open(
            '/v2/machine',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')

        id = json.loads(response.data)['id']

        query_string = [('machine', id)]
        statistic = {'process' : 1 , 'cpu_load' : 52, 'memory_load' : 35, 'timestamp' : 124324}
        response = self.client.open(
            '/v2/statistic',
            method='POST',
            data=json.dumps(statistic),
            content_type='application/json',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))
        print("TEST 2 ", response.data.decode('utf-8'))


    def test_add_statistic_full(self):

        body = {'name' : "TestMachine", 'status' : "RUN"}
        response = self.client.open(
            '/v2/machine',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')

        id = json.loads(response.data)['id']

        query_string = [('machine', id), ('period', 'full')]
        statistic = {'process' : 1 , 'cpu_load' : 52, 'memory_load' : 35, 'timestamp' : 124324}
        response = self.client.open(
            '/v2/statistic',
            method='POST',
            data=json.dumps(statistic),
            content_type='application/json',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))
        print("TEST 3 ", response.data.decode('utf-8'))

    def test_add_statistic_last(self):

        body = {'name' : "TestMachine", 'status' : "RUN"}
        response = self.client.open(
            '/v2/machine',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')

        id = json.loads(response.data)['id']

        query_string = [('machine', id), ('period', 'last')]
        statistic = {'process' : 1 , 'cpu_load' : 52, 'memory_load' : 35, 'timestamp' : 124324}
        response = self.client.open(
            '/v2/statistic',
            method='POST',
            data=json.dumps(statistic),
            content_type='application/json',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))
        print("TEST 4 ", response.data.decode('utf-8'))

if __name__ == '__main__':
    import unittest
    unittest.main()
