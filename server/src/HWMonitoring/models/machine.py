# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from HWMonitoring import db

from typing import List, Dict  # noqa: F401

from HWMonitoring.models.base_model_ import Model
from HWMonitoring import util

unique_id = 0

class Machine(Model, db.Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    __tablename__ = "machines"
    #__table_args__ = (
    #    db.PrimaryKeyConstraint('id'),
    #)

    id_ = db.Column(db.Integer, primary_key=True)
    name_ = db.Column(db.String(64), nullable=False)
    status_ = db.Column(db.String(64), nullable=False)
    
    
    def __init__(self, **kwargs):
        global unique_id
        unique_id += 1
        kwargs['id_'] = unique_id
        super(Machine, self).__init__(**kwargs)

    def __repr__(self):
        return '<id %r, name %r, status %r>' % (self.id_, self.name_, self.status_)
    
    def to_dict(self):
        return {
            'id' : self.id_,
            'name' : self.name_,
            'status' : self.status_
        }

    @classmethod
    def from_dict(cls, dikt) -> 'Machine':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The Machine of this Machine.  # noqa: E501
        :rtype: Machine
        """
        return util.deserialize_model(dikt, cls)

    @property
    def id(self) -> int:
        """Gets the id of this Machine.


        :return: The id of this Machine.
        :rtype: int
        """
        return self._id

    @id.setter
    def id(self, id: int):
        """Sets the id of this Machine.


        :param id: The id of this Machine.
        :type id: int
        """

        self._id = id

    @property
    def name(self) -> str:
        """Gets the name of this Machine.


        :return: The name of this Machine.
        :rtype: str
        """
        return self._name

    @name.setter
    def name(self, name: str):
        """Sets the name of this Machine.


        :param name: The name of this Machine.
        :type name: str
        """

        self._name = name

    @property
    def status(self) -> str:
        """Gets the status of this Machine.


        :return: The status of this Machine.
        :rtype: str
        """
        return self._status

    @status.setter
    def status(self, status: str):
        """Sets the status of this Machine.


        :param status: The status of this Machine.
        :type status: str
        """
        allowed_values = ["RUN", "RUNNING", "STOPED", "STOPPING", "FAILED"]  # noqa: E501
        if status not in allowed_values:
            raise ValueError(
                "Invalid value for `status` ({0}), must be one of {1}"
                .format(status, allowed_values)
            )

        self._status = status

