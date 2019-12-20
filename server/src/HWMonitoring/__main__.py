#!/usr/bin/env python3

import connexion

from HWMonitoring import encoder
from HWMonitoring import db

from HWMonitoring.models.machine import Machine
from HWMonitoring.models.statistic import Statistic

from os import system
import time

MAX_TIME = 900

def machine_update()
    cur_time = time.time()
    machines = Machine.query.all()
    for machine in machines:
        statistic = Statistic.query.filter_by(machine_id_=machine.id_).first()
        if cur_time - statistic.timestamp_ > MAX_TIME:
            machine.status_ = "DOWN"
        else:
            machine.status_ = "RUNNING"
    db.connection.commit()

def main():
    app = connexion.App(__name__, specification_dir='./swagger/')
    app.app.json_encoder = encoder.JSONEncoder
    app.add_api('swagger.yaml', arguments={'title': 'Swagger Petstore'})
    db.drop_all()
    db.create_all()
    app.run(port=8080)


if __name__ == '__main__':
    main()
