import connexion
import six

from HWMonitoring.models.machine import Machine  # noqa: E501
from HWMonitoring import util

from HWMonitoring import db

from flask import abort
import json
def add_machine(body):  # noqa: E501
    """Add a new machine

     # noqa: E501

    :param body: New machine
    :type body: dict | bytes

    :rtype: None
    """
    
    body = json.loads(body.decode("utf-8"))
    print(Machine.__table__)
    m = Machine(name_=body['name'], status_=body['status'])
    print(m)
    db.session.add(m)
    db.session.commit() 
    return m.to_dict()


def delete_machine(machineId):  # noqa: E501
    """Update an existing pet

     # noqa: E501

    :param machineId: 
    :type machineId: int

    :rtype: None
    """
    db.session.delete(Machine.query.filter_by(id=machineId))
    db.commit()
    return "SUCCESS"

def get_machine(machineId):  # noqa: E501
    """Get machine by id

     # noqa: E501

    :param machineId: 
    :type machineId: int

    :rtype: Machine
    """
    try:
        return Machine.query.get(machineId).to_dict()
    except AttributeError:
        abort(404)
    except Exception:
        raise

def get_machines():
    try:
        return [m.to_dict() for m in Machine.query.all()]
        return res
    except Exception:
        raise
