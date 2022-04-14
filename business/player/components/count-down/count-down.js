class Timer {
  constructor(delay) {
    this._queue = []
    this.stop = false
    this._createTimer(delay)
  }
  _createTimer(delay) {
    let first = true
    const func = () => {
      const s = new Date()
      for (let i = 0; i < this._queue.length; i++) {
        this._queue[i]()
      }
      if (!this.stop) {
        const cost = new Date() - s
        if (!first && cost > delay) {
          delay = cost - delay
        }
        setTimeout(func, delay)
      }
    }
    func()
    first = false
  }

  add(cb) {
    this._queue.push(cb)
    this.stop = false
    return this._queue.length - 1
  }

  remove(index) {
    this._queue.splice(index, 1)
    if (!this._queue.length) {
      this.stop = true
    }
  }
}

class TimePool {
  constructor() {
    this._pool = {}
  }

  getTimer(delayTime) {
    const t = this._pool[delayTime]
    return t ? t : (this._pool[delayTime] = new Timer(delayTime))
  }

  removeTimer(delayTime) {
    if (this._pool[delayTime]) {
      delete this._pool[delayTime]
    }
  }
}

export default class CountDown {
  constructor(config) {
    const defaultOptions = {
      fixNow: 3 * 1000,
      fixNowDate: false,
      now: 0,
      template: '{d}:{h}:{m}:{s}',
      render: function (outstring) {
        console.log(outstring)
      },
      end: function () {
        console.log('the end!')
      },
      endTime: new Date().valueOf() + 5 * 1000 * 60,
      addZero: true
    }
    for (let i in defaultOptions) {
      if (defaultOptions.hasOwnProperty(i)) {
        if (typeof config[i] !== 'undefined') {
          this[i] = config[i]
        } else {
          this[i] = defaultOptions[i]
        }
      }
    }
    this.init(this.addZero)
  }

  init(addZero) {
    const delayTime = 1000
    const msInterval = new TimePool().getTimer(delayTime)
    if (this.fixNowDate) {
      const fix = new Timer(this.fixNow)
      fix.add(() => {
        this.getNowTime((now) => {
          this.now = now
        })
      })
    }
    const index = msInterval.add(() => {
      this.now += delayTime
      if (this.now >= this.endTime) {
        msInterval.remove(index)
        this.end()
      } else {
        this.render(this.getOutString(addZero))
      }
    })
  }

  getBetween(addZero) {
    const _formatTime = (ms) => {
      function _cover(num) {
        const n = parseInt(num, 10)
        if (typeof addZero !== 'undefined' && addZero) {
          return n < 10 ? '0' + n : n
        } else {
          return n
        }
      }
      const s = ms / 1000,
        m = s / 60
      return {
        d: _cover(m / 60 / 24),
        h: _cover((m / 60) % 24),
        m: _cover(m % 60),
        s: _cover(s % 60)
      }
    }
    return _formatTime(this.endTime - this.now)
  }

  getOutString(addZero) {
    const between = this.getBetween(addZero)
    return this.template.replace(/{(\w*)}/g, function (m, key) {
      return between.hasOwnProperty(key) ? between[key] : ''
    })
  }

  getNowTime(cb) {
    const xhr = new XMLHttpRequest()
    xhr.open('get', '/', true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 3) {
        const now = xhr.getResponseHeader('Date')
        cb(new Date(now).valueOf())
      }
    }
    xhr.send(null)
  }
}
