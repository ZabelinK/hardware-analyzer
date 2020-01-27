#!/usr/bin/env python3

import connexion

from HWMonitoring import encoder
from HWMonitoring import db

from HWMonitoring.models.machine import Machine
from HWMonitoring.models.statistic import Statistic

from os import system
import time

from HWMonitoring.models.statistic import Statistic 
from HWMonitoring.models.machine import Machine  
from HWMonitoring import util

from .config import Config
from HWMonitoring import db
from threading import Thread
import smtplib
import time

MAX_TIME = 300

class PowerOutPollingThread(Thread):
    def __init__(self, name):
        Thread.__init__(self)
        self.name = name
        self.server = smtplib.SMTP(Config.HOST, 587)
        
    
    def run(self):
        self.server.ehlo()
        self.server.starttls()
        self.server.login(Config.FROM, "password")
        self.server.sendmail(Config.FROM, [Config.TO], "TEST E-MAIL")
        self.server.quit()
        print("TEST!")
        while True:
            print("TEST!")
            cur_time = time.time()
            machines = Machine.query.all()
            powerOutMachines = []
            for machine in machines:
                statistic = Statistic.query.filter_by(machine_id_=machine.id_).first()
                if cur_time - statistic.timestamp_ > MAX_TIME:
                    machine.status_ = "DOWN"
                    powerOutMachines.append(machine.name_)
                else:
                    machine.status_ = "RUNNING"
            db.connection.commit()

            if powerOutMachines:
                BODY = "\r\n".join((
                    "From: %s" % Config.FROM,
                    "To: %s" % Config.TO,
                    "Subject: %s" % Config.SUBJECT ,
                    "",
                    "ALERT! The following machines are down - %s" % str(powerOutMachines)
                ))
                self.server.login(Config.FROM, "password")
                self.server.sendmail(Config.FROM, [Config.TO], BODY)
                self.server.quit()
            sleep(5)    

def main():
    app = connexion.App(__name__, specification_dir='./swagger/')
    app.app.json_encoder = encoder.JSONEncoder
    app.add_api('swagger.yaml', arguments={'title': 'Swagger Petstore'})
    db.drop_all()
    db.create_all()
    app.run(port=8080)
    polling = PowerOutPollingThread("polling")
    polling.start()


if __name__ == '__main__':
    main()
