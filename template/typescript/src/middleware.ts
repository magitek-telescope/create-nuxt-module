import { ModuleOptions } from './types/nuxt'

export const createMiddleware = (options: ModuleOptions) => {
  return (req: Request, res: Response, next: () => void) => {
    res.writeHead(503, { 'Content-Type': 'text/html' })
    res.write('')
    res.end()
    return res.end()
  }
}
