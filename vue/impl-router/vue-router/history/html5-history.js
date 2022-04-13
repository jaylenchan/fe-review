import History from './base-history'

export default class Html5History extends History {
  constructor(router) {
    super(router)
    this.router = router
  }

  getCurrentLocation() {}
}
