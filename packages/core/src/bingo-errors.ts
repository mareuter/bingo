export class BingoError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BingoError'
    Object.setPrototypeOf(this, BingoError.prototype)
  }
}

export class NoMoreBingoBallsError extends BingoError {
  constructor(message: string) {
    super(message)
    this.name = 'NoMoreBingoBallsError'
    Object.setPrototypeOf(this, NoMoreBingoBallsError.prototype)
  }
}
