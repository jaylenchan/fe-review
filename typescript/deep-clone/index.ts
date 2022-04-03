export default function deepClone(
  target: any,
  hashmap = new WeakMap<Record<string, any>, Record<string, any>>()
) {
  if (typeof target === 'string') return target
  if (typeof target === 'number') return target
  if (typeof target === 'boolean') return target
  if (typeof target === null) return target
  if (target instanceof RegExp) return new RegExp(target)
  if (target instanceof Date) return new Date(target)

  if (hashmap.get(target)) {
    return hashmap.get(target)
  } else {
    const copy = new target.constructor()
    hashmap.set(target, copy)

    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        copy[key] = deepClone(target[key])
      }
    }
    return copy
  }
}
