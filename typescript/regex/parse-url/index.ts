export default function parseUrl(url: string) {
  const domainReg = /.+?(?=\/)/
  const pathReg = /(?<=\/).+(?=\?)/
  const paramsReg = /(?<=\?).+(?=\#)/
  const hashReg = /(?<=\#).+/

  const regMaps = [
    {
      name: 'domain',
      reg: domainReg
    },
    {
      name: 'path',
      reg: pathReg,
      handler(path: string) {
        return `/${path}`
      }
    },
    {
      name: 'params',
      reg: paramsReg,
      handler(params: string) {
        return params.split('&').reduce((result, curParam) => {
          const [key, value] = curParam.split('=')
          result[key as string] = value as string
          return result
        }, {} as Record<string, string>)
      }
    },
    {
      name: 'hash',
      reg: hashReg
    }
  ]

  return regMaps.reduce((result, curReg) => {
    const { name, reg, handler } = curReg
    const value = url.match(reg)![0]
    if (handler) {
      result[name] = handler(value as string)
    } else {
      result[name] = value
    }
    return result
  }, {} as Record<string, any>)
}
