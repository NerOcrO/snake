export class Timer {
  constructor(private _time: number) {}

  increment() {
    this._time += 1
  }

  time(): number {
    return this._time
  }

  second(): number {
    return this._time % 60
  }

  minute(): number {
    return Math.floor((this._time / 60) % 60)
  }

  hour(): number {
    return Math.floor((this._time / 3600) % 60)
  }
}
