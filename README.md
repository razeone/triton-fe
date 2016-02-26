# triton-fe

Each one of the folders has its own `package.json` so you can run the following commands to build it.

You should have nodejs and npm installed.

Easy setup

```
npm install
npm install -g browserify
browserify main.js -o bundle.js
```

Now you have all your JS and dependencies in `bundle.js

TO-DO:

* Add the express configuration
* We need to be able to run live rebuild