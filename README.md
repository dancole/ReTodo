ReTodo
======

A Python web Todo List app built on Rethinkdb, Flask, RequireJS, Backbone, and Boostrap.

# Here's What's Up:

You start everything by running 'python run.py'
* Backend
  * The database is rethinkdb
  * The Python framework is Flask
  * All page/file requires run through Flask.
  * Flask handles the API Backend.
* Frontend
  * Twitter Bootstrap handles the web design.
  * Backbone.js gives structure to the web app (Control, Model, View).
  * Require.js handles all the javascript, which is broken up for development.
  * jQuery handles events and DOM changes.
  * Underscore.js is used by Backbone.
  * Text.js is used to load templates of each module.
* Development
  * Twitter Bootstrap uses less to compile its CSS.
  * Require.js has a file r.js which is a RequireJS optimizer, but I haven't used it.


#Built On
* Backbone.js -- Give your JS App some Backbone with Models, Views, Collections, and Events.
* Flask -- A microframework based on Werkzeug, Jinja2 and good intentions.
* jQuery -- Fast, small, and feature-rich JavaScript library.
* Rethinkdb -- An open-source distributed JSON document database with a pleasant and powerful query language.
* RequireJS -- A file and module loader for JavaScript.
* Text.js -- An AMD loader plugin for loading text resources.
* Twitter Bootstrap -- Sleek, intuitive, and powerful front-end framework for faster and easier web development.
* Underscore.js -- Is a utility-belt library for JavaScript.


#Acronyms
* AMD -- Asychronous Module Defintion


# Getting Started:

sudo pip install virtualenv
sudo yum install python-virtualenv
virtualenv venv

. venv/bin/activate
sudo pip install Flask

python run.py --setup
python run.py
