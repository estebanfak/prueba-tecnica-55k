import { SortBy, type User } from '../types.d'

interface Props {
  users: User[]
  colorRows: boolean
  deleteRow: (email: string) => void
  changeSorting: (sort: SortBy) => void
}

export const UsersList = ({ users, colorRows, deleteRow, changeSorting }: Props) => {
  return (
    <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th onClick={() => { changeSorting(SortBy.FIRST) }}>Nombre</th>
            <th onClick={() => { changeSorting(SortBy.LAST) }}>Apellido</th>
            <th onClick={() => { changeSorting(SortBy.COUNTRY) }}>País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user.email} style={{ backgroundColor: colorRows ? index % 2 === 0 ? '#555' : '#333' : 'inherit' }}>
                <td>
                <img src={user.picture.thumbnail}/>
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={() => { deleteRow(user.email) }}>Borrar</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
  )
}
