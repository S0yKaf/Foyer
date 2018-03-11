# Foyer
Self contained modular start page webserver.

---

# Installing
foyer is currently only available through the AUR or with manual download through the [release](https://github.com/Kiniamaro/Foyer/releases) page. It comes in a pre-packaged format that requires no additinal dependencies.

## AUR install
```bash
# install
$ yaourt foyer

# run!
$ foyer
```

---

# Plugins

## `FoyerWeather`
This plugin uses the [openweathermap](https://openweathermap.org/) API, it is recommened to use your
own api key as the default one might become overused and stop working
if enough people start using this plugin.

---
## Developing
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
