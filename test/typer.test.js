import { typer } from '../src/index'

test('testing typer', () => {
	expect(typer(66)).toBe('number')
	expect(typer('gauseen')).toBe('string')
	expect(typer([])).toBe('array')
	expect(typer({})).toBe('object')
})
