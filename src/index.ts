import http from 'http'
import { identity } from './lib'

const server = http.createServer((_req, res) => {
  res.setHeader('content-type', 'text/html')
  res.end(identity('Hello World!!!!'))
})

server.listen(3000)
