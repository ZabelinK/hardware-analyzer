import connexion
import six

from HWMonitoring.models.statistic import Statistic  # noqa: E501
from HWMonitoring import util

from HWMonitoring import db

from flask import abort
import json

def add_statistic(machine, statistic):  # noqa: E501
    """Add new statistic

     # noqa: E501

    :param machine: Machine id
    :type machine: int
    :param statistic: Statistic
    :type statistic: dict | bytes

    :rtype: None
    """
    print(machine, statistic)
    statistic = json.loads(statistic.decode("utf-8"))
    s = Statistic(machine_id_=machine, process_=statistic['process'], 
                  cpu_load_=statistic['cpu_load'], memory_load_=statistic['memory_load'], 
                  timestamp_=statistic['timestamp'])
    print(s)
    db.session.add(s)
    db.session.commit() 
    return s.to_dict()


def get_statistic(machineId, period=None):  # noqa: E501
    """Get statistic

     # noqa: E501

    :param machineId: 
    :type machineId: int
    :param period: 
    :type period: str

    :rtype: List[Statistic]
    """
    if period is None or period == "full":
        return [s.to_dict() for s in Statistic.query.filter_by(machine_id_=machineId)]
    elif period == "last":
        return [s.to_dict() for s in Statistic.query.filter_by(machine_id_=machineId).first()]
    else:
        abort(400)
