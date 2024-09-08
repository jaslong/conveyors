import {ConveyorTile, TextTile, World} from "game/engine/World"

export const World1 = World.fromGrid([
  [null, new ConveyorTile('→',  new TextTile('A')),     new ConveyorTile('→'), new ConveyorTile('↓'), null],
  [null, new ConveyorTile('↑'), null,                           new ConveyorTile('↓'), null],
  [null, new ConveyorTile('↑'), null,                           new ConveyorTile('↓'), null],
  [null, new ConveyorTile('↑'), new ConveyorTile('←'), new ConveyorTile('↓'), null],
  [null, null,                           new ConveyorTile('↑'), new ConveyorTile('←', new TextTile('B')), null],
])
