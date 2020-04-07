# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from HWMonitoring.models.machine import Machine  # noqa: E501
from HWMonitoring.test import BaseTestCase


class TestMachinesController(BaseTestCase):
    """MachinesController integration test stubs"""

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
        """Test case for get_machine

        Get machine by id
        """

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

    def test_get_none_machine(self):
        """Test case for get_machine

        Get machine by id
        """

        response = self.client.open(
            '/v2/machine/',
            method='GET',
            content_type='application/json')
        self.assert404(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_all_machines(self):
        """Test case for get_machine

        Get machine by id
        """

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

if __name__ == '__main__':
    import unittest
    unittest.main()
