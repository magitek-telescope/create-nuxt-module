import { ModuleOptions } from './types/nuxt'
import { ClientRequest, ServerResponse } from 'http'

export const createMiddleware = (options: ModuleOptions) => {
  return (req: ClientRequest, res: ServerResponse, next: () => void) => {
    res.writeHead(503, { 'Content-Type': 'text/html' })
    res.write('')
    res.end()
    return res.end()
  }
}
