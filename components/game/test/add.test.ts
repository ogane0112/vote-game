import { expect, test } from 'vitest'
import { add } from '@/components/game/add'

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3)
})