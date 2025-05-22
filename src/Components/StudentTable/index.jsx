const Table = ({ headers = [], rows = [], deleteFunction = () => { }, openUpdateForm = () => { }, showActions = true }) => {
  const composeDeleteFunction = (id) => () => deleteFunction(id)
  const composeUpdateFunction = (student) => () => openUpdateForm(student)
  return (
    <table className="table is-full-width p-2" style={{ width: '100%', boxShadow: '1px 1px rgba(55, 52, 52, 0.2)', background: '#FAFAFA' }}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} className="has-text-dark">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          return (
            <tr>
              {row?.[0].map((data, idx) => {
                let content = data
                if (idx == 0) content = data?.substr(0, 3) + "..."
                return (
                  <td key={data + "" + idx} className="has-text-dark">{content}</td>
                )
              })}
              {showActions && (
                <td className="has-text-dark">
                  <button className="button has-background-primary-dark has-text-white is-small mr-4" onClick={composeUpdateFunction(row?.[1])}>Edit</button>
                  <button className="button is-danger has-text-white is-small" onClick={composeDeleteFunction(row?.[0]?.[0])}>Delete</button>
                </td>
              )}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table;
