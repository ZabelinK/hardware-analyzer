import connexion
import six

from HWMonitoring.models.statistic import Statistic  # noqa: E501
from HWMonitoring import util


def add_statistic(machine, statistic):  # noqa: E501
    """Add new statistic

     # noqa: E501

    :param machine: Machine id
    :type machine: int
    :param statistic: Statistic
    :type statistic: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        statistic = Statistic.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def get_statistic(machineId, period=None):  # noqa: E501
    """Get statistic

     # noqa: E501

    :param machineId: 
    :type machineId: int
    :param period: 
    :type period: str

    :rtype: List[Statistic]
    """
    return 'do some magic!'
