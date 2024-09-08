"use client"

import {World1} from "game/data/World1"
import {vec2, Vec2, Vec2Map} from "game/engine/vec"
import {ConveyorTile, TextTile, Tile, World} from "game/engine/World"
import {useEffect, useMemo, useState} from "react"
import {match, P} from "ts-pattern"

const TILE_DIM = 48;

function renderText(tile: Tile | undefined): string {
  return match(tile)
    .with(undefined, () => ' ')
    .with(P.instanceOf(TextTile), text => text.content)
    .with(P.instanceOf(ConveyorTile), conveyor => conveyor.direction + `\n[ ${renderText(conveyor.child)} ]`)
    .otherwise(() => 'ERROR')
}

export function TileRender({ tiles, position, tile }: { tiles: Vec2Map<Tile>, position: Vec2, tile: Tile | undefined }) {
  return <div style={{
    position: 'absolute',
    left: position.x * TILE_DIM,
    top: position.y * TILE_DIM,
    width: TILE_DIM,
    height: TILE_DIM,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    color: 'black',
    whiteSpace: 'pre',
  }}>{renderText(tile)}</div>
}

export function WorldRender({ world }: { world: World }) {
  const [ticks, setTicks] = useState(0)

  const tiles = useMemo(() => {
    const tiles: JSX.Element[] = [];
    for (let x = 0; x < world.bounds.x; ++x) {
      for (let y = 0; y < world.bounds.y; ++y) {
        const position = vec2(x, y)
        tiles.push(
          <TileRender
            key={position.toString()}
            tiles={world.tiles}
            position={position}
            tile={world.tiles.get(position)} />
        );
      }
    }
    return tiles
  }, [world, ticks])

  useEffect(() => {
    const interval = setInterval(() => {
      world.tick()
      setTicks(prev => prev+1)
    }, 500)
    return () => clearInterval(interval)
  }, [world])

  return <div style={{
    position: 'relative',
    width: TILE_DIM * world.bounds.x,
    height: TILE_DIM * world.bounds.y,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  }}>{tiles}</div>
}

export function World1Render() {
  return <WorldRender world={World1} />
}
