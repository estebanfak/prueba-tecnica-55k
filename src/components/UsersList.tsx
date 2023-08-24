import { type User } from '../types'

interface Props {
  users: User[]
  colorRows: boolean
  deleteRow: (email: string) => void
}

export const UsersList = ({ users, colorRows, deleteRow }: Props) => {
  return (
    <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>País</th>
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
                <td>{user.name.first}</td>
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
