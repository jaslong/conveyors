import {vec2, Vec2, Vec2Map} from "game/engine/vec"
import {match} from "ts-pattern"

/** Something that can be on a tile. */
export class Tile {
}

export class TextTile extends Tile {
  constructor(readonly content: string) {
    super()
  }
}

export class ConveyorTile extends Tile {
  constructor(readonly direction: '↑' | '↓' | '←' | '→', readonly child?: Tile) {
    super()
  }

  addChild(child: Tile): ConveyorTile {
    return new ConveyorTile(this.direction, child)
  }

  removeChild(): ConveyorTile {
    return new ConveyorTile(this.direction)
  }
}

export class World {
  readonly tiles: Vec2Map<Tile> = new Vec2Map<Tile>()

  static fromGrid(rows: (Tile | null)[][]) {
    const bounds = vec2(rows[0].length, rows.length)
    const world = new World(bounds)
    for (let y = 0; y < rows.length; ++y) {
      const row = rows[y]
      if (row.length !== bounds.x) {
        throw new Error(`expected each row to have ${bounds.x} tiles but row ${y} has ${row.length}`)
      }
      for (let x = 0; x < row.length; ++x) {
        const tile = row[x]
        if (tile) {
          world.setTile(vec2(x, y), tile)
        }
      }
    }
    return world
  }

  constructor(readonly bounds: Vec2) {
  }

  setTile(pos: Vec2, tile: Tile): this {
    this.tiles.set(pos, tile)
    return this
  }

  tick() {
    this.tiles.entries()
      .forEach(([pos, tile]) => {
        if (tile instanceof ConveyorTile && !!tile.child) {
          match(tile.direction)
            .with('↑', () => this.moveConveyor(pos, pos.up()))
            .with('↓', () => this.moveConveyor(pos, pos.down()))
            .with('←', () => this.moveConveyor(pos, pos.left()))
            .with('→', () => this.moveConveyor(pos, pos.right()))
            .exhaustive()
        }
      })
  }

  private moveConveyor(from: Vec2, to: Vec2) {
    const curFrom = this.tiles.get(from)
    if (!(curFrom instanceof ConveyorTile)) {
      throw new Error(`no conveyor at source ${from}`)
    }

    const curTo = this.tiles.get(to)
    if (!(curTo instanceof ConveyorTile)) {
      throw new Error(`no conveyor at destination ${to}`)
    }

    const child = curFrom.child
    if (!child) {
      throw new Error(`no child at ${from}`)
    }

    this.tiles.set(from, curFrom.removeChild())
    this.tiles.set(to, curTo.addChild(child))
  }
}
