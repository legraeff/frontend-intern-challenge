# Frontend Intern Challenge - URL Shortener

## About

This project was developed to complete a challege made by @chaordic for an internship.

## Technologies

 - [Yeoman - Web app generator](https://github.com/yeoman/generator-webapp): Used to create scaffolding of the application;
 - [Gulp](http://gulpjs.com/): Used to automate tasks, build and run the application;
 - [Bower](https://bower.io/): To install external packages;
 - [jQuery](https://jquery.com/): To manipulate the DOM;
 - [Sass](http://sass-lang.com/libsass): Used to help in the CSS development;
 - [BrowserSync](https://www.browsersync.io/): Used to test the application locally in different browsers;
 - [Wiredep](https://github.com/taptapship/wiredep): To inject bower dependencies in the HTML;
 - [ESLint](http://eslint.org/): To fix possible errors and keep best practices in Javascript;
 
## Requirements

 - [Node.js](https://nodejs.org/en/)
 - [npm](https://www.npmjs.com/)
 
## Getting Started

 - Install gulp: `npm install -g gulp`
 - Install node dependencies (gulp-sass, browsersync, etc.): `npm install`
 - Install bower dependencies (jQuery): `bower install`
 - Run the application: `gulp serve`

## Build

If you want to deploy this app in a server, there is a Gulp task to minify the resources and build a distribution folder. 
So just run `gulp` and a `dist` folder will be created with the necessary files.

