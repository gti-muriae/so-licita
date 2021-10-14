"use strict";
const swaggerAutogen = require('swagger-autogen')();
const outupFile = './build/swagger_output.json';
const endpoint = ['./build/routes.js'];
swaggerAutogen(outupFile, endpoint);
//# sourceMappingURL=swagger.js.map