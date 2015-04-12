'use strict';

var connect = require('connect');
var serveStatic = require('serve-static');
var app = connect();

app.use(serveStatic('./'));
app.use(serveStatic('../'));
app.listen(5000);
console.log('Connect to Node.js server typing in browser address bar http://localhost:5000');