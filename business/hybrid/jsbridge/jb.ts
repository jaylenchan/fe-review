class JSBridge {
  public static NativeBridge: string = 'NativeBridge'

  
}

Reflect.defineProperty(window, 'bridge', {
  value: new JSBridge(),
  enumerable: true
})
