# Foyer
Self contained modular start page webserver

---

## Setup
```bash
# setup virutalenv
$ virtualenv venv
$ . venv/bin/activate

# install python dependencies
$ pip install -r requirements.txt

# install js dependencies
$ npm install

# compile js code
$ npm run build
```

## Usage
```bash
# run the app
$ python foyer.py

# Congrats! the app is now available on http://localhost:9001/

```

# Plugins

## FoyerWeather
This plugin uses the [openweathermap](https://openweathermap.org/) API, it is recommened to use your
own api key as the default one might become overused and stop working
if enough people start using this plugin.
