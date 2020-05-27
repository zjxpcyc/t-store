import { createState } from '../src/index'

describe('default', () => {
  test('get value noraml', () => {
    const user = { id: 1, name: 'foo' }
    const useUser = createState(user)
    const [val] = useUser()

    expect(val.name).toBe(user.name)
  });

  test('get value from dom', () => {
    const domEvt = { target: { value: 1 }, bubbles: true, type: 'change' }
    const useEvt = createState(domEvt)
    const [val] = useEvt()

    expect(val).toBe(1)
  });

  test('listen set noraml', () => {
    const otherData = { data: 'This object will not be used' }
    const useOther = createState(otherData)
    const [, setOther] = useOther(() => {})

    const user = { id: 1 }
    const useUser = createState(user)
    
    const newUser = { ...user, name: 'bar' }
    let result = []
    const [, setUser] = useUser((val) => {
      result.push(val)
    })

    setUser(newUser)
    setOther({ data: 'updated' })

    setTimeout(() => {
      expect(result.length).toBe(2);
      expect(result[0].name).toBeUndefined();
      expect(result[1].name).toBe(newUser.name);
    }, 0)
  })

  test('cancel listen normal', () => {
    const otherData = { data: 'This object will not be used' }
    const useOther = createState(otherData)
    const [, setOther] = useOther(() => {})

    const user = { id: 1 }
    const useUser = createState(user)
    
    const fooUser = { ...user, name: 'foo' }
    const barUser = { ...user, name: 'bar' }
    let result = []
    const [, setUser, , unSubscribe] = useUser((val) => {
      result.push(val)
    })

    setUser(fooUser)
    setOther({ data: 'updated' })
    unSubscribe()
    setUser(barUser)

    setTimeout(() => {
      expect(result.length).toBe(2);
      expect(result[0].name).toBeUndefined();
      expect(result[1].name).toBe(fooUser.name);
    }, 0)

  })
})
