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
        body = Machine()
        response = self.client.open(
            '/v2/machine',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_delete_machine(self):
        """Test case for delete_machine

        Update an existing pet
        """
        response = self.client.open(
            '/v2/machine/{machineId}'.format(machineId=789),
            method='DELETE',
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_machine(self):
        """Test case for get_machine

        Get machine by id
        """
        response = self.client.open(
            '/v2/machine/{machineId}'.format(machineId=789),
            method='GET',
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
