const Table = ({ headers = [], rows = [], deleteFunction = () => { }, openUpdateForm = () => { }, showActions = true }) => {
  const composeDeleteFunction = (id) => () => deleteFunction(id)
  const composeUpdateFunction = (student) => () => openUpdateForm(student)
  return (
    <table className="table is-fullwidth is-striped is-hoverable" style={{ width: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
      <thead style={{ backgroundColor: '#3273dc', color: '#fff' }}>
        <tr>
          {headers.map((header) => (
            <th key={header} className="has-text-white" style={{ padding: '12px 16px', textAlign: 'left' }}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          return (
            <tr style={{ borderBottom: '1px solid #eaeaea' }}>
              {row?.[0].map((data, idx) => {
                let content = data
                if (idx === 0) content = data?.substr(0, 3) + "..."
                return (
                  <td key={data + "" + idx} className="has-text-dark" style={{ padding: '12px 16px' }}>{content}</td>
                )
              })}
              {showActions && (
                <td className="has-text-dark" style={{ padding: '12px 16px' }}>
                  <button className="button is-warning is-small mr-4" onClick={composeUpdateFunction(row?.[1])}>Edit</button>
                  <button className="button is-danger is-small" onClick={composeDeleteFunction(row?.[0]?.[0])}>Delete</button>
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
