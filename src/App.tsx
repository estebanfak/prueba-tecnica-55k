import { useState, useEffect, useRef, useMemo } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [colorRows, setColorRows] = useState<boolean>(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string>('')
  const originalUsers = useRef<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const handleColorRow = () => {
    setColorRows((prevState: boolean) => !prevState)
  }

  const filteredUsers: User[] = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
      : users
  }, [users, filterCountry])

  const sortedUsers: User[] = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.FIRST]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  const handleOrderByCountry = () => {
    const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSorting)
  }

  const handleDeleteUser = (email: string) => {
    const filteredUsers = [...users].filter(user => user.email !== email)
    setUsers(filteredUsers)
  }
  const handleResetUsersState = () => {
    setUsers(originalUsers.current)
  }
  const handleChange = (e: any) => {
    setFilterCountry(e.target.value)
  }
  const handleSorting = (sort: SortBy) => {
    setSorting(sort)
  }
  return (
    <>
      <header>
        <button onClick={handleColorRow}>Colorear fila</button>
        <button onClick={handleOrderByCountry}>{sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}</button>
        <button onClick={handleResetUsersState}>Resetear estado</button>
        <input type='text' placeholder='Filtrar por país' value={filterCountry} onChange={(e) => { handleChange(e) }}/>
      </header>
      <main>
        <UsersList users={sortedUsers} colorRows={colorRows} deleteRow={handleDeleteUser} changeSorting={handleSorting}/>
      </main>
    </>
  )
}

export default App
