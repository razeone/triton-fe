# triton-fe

Each one of the folders has its own `package.json` so you can run the following commands to build it.

You should have nodejs, npm, ruby with the gems "sass" and "compass" installed.

Please, access to the user folder in the console and run:

```
npm install
npm gulp serve
```

Now you have all your JS and dependencies in `js/bundle.js` and the and CSS in `css/site/main.css`.

All the changes that you wanna make on css, will have to make it in `sass/pages`, put a '_' before the name. Must to have ONE file for section for best maintenance.

If you have any problem with this, please contact to @Ireth.

TO-DO:

* Add the express configuration
* We need to be able to run live rebuild
