const app = require('./app')
const http = require('http').Server(app)
exports.server = http

const io = require('./socket')

http.listen(process.env.PORT || 3000, () => {
    console.log('Server listening on port: ', process.env.PORT || 3000)
})