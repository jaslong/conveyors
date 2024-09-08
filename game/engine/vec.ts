export class Vec2 {
  constructor(readonly x: number, readonly y: number) {
  }

  plus(that: Vec2): Vec2 {
    return new Vec2(this.x + that.x, this.y + that.y)
  }

  minus(that: Vec2): Vec2 {
    return new Vec2(this.x - that.x, this.y - that.y)
  }

  up(n = 1): Vec2 {
    return this.plus(vec2(0, -1))
  }

  down(n = 1): Vec2 {
    return this.plus(vec2(0, 1))
  }

  left(n = 1): Vec2 {
    return this.plus(vec2(-1, 0))
  }

  right(n = 1): Vec2 {
    return this.plus(vec2(1, 0))
  }

  toString(): string {
    return `${this.x},${this.y}`
  }

  static fromString(s: string) {
    const parts = s.split(',')
    return new Vec2(Number.parseInt(parts[0]), Number.parseInt(parts[1]))
  }
}

export function vec2(x: number, y: number) {
  return new Vec2(x, y)
}

export class Vec2Map<V> {
  private readonly map: Map<string, V> = new Map()

  set(k: Vec2, v: V): this {
    this.map.set(k.toString(), v)
    return this
  }

  get(k: Vec2): V | undefined {
    return this.map.get(k.toString())
  }

  entries(): readonly (readonly [Vec2, V])[] {
    return [...this.map.entries()]
      .map(([k, v]): [Vec2, V] => [Vec2.fromString(k), v])
  }
}
