import { deepCopy } from '../src/index'

describe('deepCopy', () => {
  test('for object', () => {
    interface Hobby {
      pingpang: number;
      badminton: number;
    }
    interface PersonA {
      name: string;
      age: number;
      hobby: Hobby;
      personB: any;
    }
    interface PersonB {
      personA: PersonA;
    }
  
    const personA: PersonA = {
      name: 'gauseen',
      age: 26,
      hobby: {
        pingpang: 100,
        badminton: 99,
      },
      personB: null,
    }
  
    const personB: PersonB = {
      personA,
    }
    // 循环引用
    personA.personB = personB
  
    expect(deepCopy(personA)).toEqual(personA)
  
    const copyPersonA = deepCopy(personA)
    copyPersonA.hobby.pingpang = 98
  
    expect(copyPersonA).not.toEqual(personA)
  
    expect(copyPersonA.hobby.pingpang).not.toBe(personA.hobby.pingpang)
  })

  test('for array', () => {
    const arr: Array<any> = [ 1, { name: 'gauseen' } ]
    const copyArr = deepCopy(arr)
    
    expect(copyArr).toEqual(arr)

    arr[0] = 2

    expect(copyArr).not.toEqual(arr)

    expect(arr[0]).toBe(2)
    expect(copyArr[0]).not.toBe(2)
  })
})
