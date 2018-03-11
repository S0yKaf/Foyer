#! /bin/python3.6

# Foyer
# Self contained modular start page webserver.
# Copyright (C) 2018  Kiniamaro - vdyotte@gmail.com
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

import json
import os
import sys

from bottle import run, post, get, route, static_file, request


# determine if application is a script file or frozen exe
if getattr(sys, 'frozen', False):
    dir = os.path.dirname(sys.executable)
elif __file__:
    dir = '.'


@route('/static/<path>')
def static(path):
    return static_file(path, root=dir + "/static")


@post('/save')
def saveConfig():
    # TODO make this more secure / error handling
    with open(dir + '/static/config.json', 'w') as out:
        json.dump(request.json, out)


@route('/')
def index():
    return static_file('index.html', root=dir + "/static")


run(host='localhost', port=9001)
