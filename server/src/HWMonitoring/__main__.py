#!/usr/bin/env python3

import connexion

from HWMonitoring import encoder
from HWMonitoring import db

from os import system

def main():
    app = connexion.App(__name__, specification_dir='./swagger/')
    app.app.json_encoder = encoder.JSONEncoder
    app.add_api('swagger.yaml', arguments={'title': 'Swagger Petstore'})
    db.drop_all()
    db.create_all()
    app.run(port=8080)


if __name__ == '__main__':
    main()
