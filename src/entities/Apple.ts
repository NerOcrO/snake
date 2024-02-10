export class Apple {
  private _x = 0
  private _y = 0

  changeTheCoordinates(x: number, y: number) {
    this._x = x
    this._y = y
  }

  x(): number {
    return this._x
  }

  y(): number {
    return this._y
  }
}
