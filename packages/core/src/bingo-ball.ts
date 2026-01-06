class BingoBall {
  public static FREE_SPACE: number = -1
  public static GAME_OVER: number = -2
  public static MIN: number = 1
  public static MAX: number = 75
  #columns: string[] = ['B', 'I', 'N', 'G', 'O'] as const
  #range: number = 15
  #letter: string
  number: number

  constructor(n: number) {
    this.number = n
    if (n === -1 || n === -2) {
      this.#letter = ' '
    } else if (n >= BingoBall.MIN || n <= BingoBall.MAX) {
      const index = Math.floor((n - 1) / this.#range)
      this.#letter = this.#columns[index]!
    } else {
      throw new Error('Invalid BingoBall!')
    }
  }

  public getLetter(): string {
    return this.#letter
  }

  public toString(): string {
    return `${this.#letter}${this.number}`
  }

  public equals(bb: BingoBall): boolean {
    return bb.number === this.number
  }
}

export default BingoBall
