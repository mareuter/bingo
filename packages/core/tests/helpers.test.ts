import { expect, test } from 'vitest'

import * as helpers from '../src/helpers'

test("Check two shuffled arrays aren't equal", () => {
  const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  const shuffled1 = helpers.shuffle(original)
  const shuffled2 = helpers.shuffle(original)
  expect(shuffled1).not.toEqual(shuffled2)
  expect(original).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
})
