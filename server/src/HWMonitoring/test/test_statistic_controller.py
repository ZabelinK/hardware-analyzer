# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from HWMonitoring.models.statistic import Statistic  # noqa: E501
from HWMonitoring.test import BaseTestCase


class TestStatisticController(BaseTestCase):
    """StatisticController integration test stubs"""

    def test_add_statistic(self):
        """Test case for add_statistic

        Add new statistic
        """
        statistic = Statistic()
        query_string = [('machine', 789)]
        response = self.client.open(
            '/v2/statistic',
            method='POST',
            data=json.dumps(statistic),
            content_type='application/json',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_statistic(self):
        """Test case for get_statistic

        Get statistic
        """
        query_string = [('period', 'full')]
        response = self.client.open(
            '/v2/statistic/{machineId}'.format(machineId=789),
            method='GET',
            content_type='application/json',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
