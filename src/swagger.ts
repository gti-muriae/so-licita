const swaggerAutogen = require('swagger-autogen')()

const outupFile = './dist/swagger_output.json'
const endpoint = ['./dist/src/routes.js']

swaggerAutogen(outupFile, endpoint)