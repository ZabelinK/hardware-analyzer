import connexion
import six

from HWMonitoring.models.machine import Machine  # noqa: E501
from HWMonitoring import util


def add_machine(body):  # noqa: E501
    """Add a new machine

     # noqa: E501

    :param body: New machine
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = Machine.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def delete_machine(machineId):  # noqa: E501
    """Update an existing pet

     # noqa: E501

    :param machineId: 
    :type machineId: int

    :rtype: None
    """
    return 'do some magic!'


def get_machine(machineId):  # noqa: E501
    """Get machine by id

     # noqa: E501

    :param machineId: 
    :type machineId: int

    :rtype: Machine
    """
    return 'do some magic!'
