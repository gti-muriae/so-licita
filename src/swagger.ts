const swaggerAutogen = require('swagger-autogen')()

const outupFile = './dist/swagger_output.json'
const endpoint = ['./src/routes.ts']

swaggerAutogen(outupFile, endpoint)