const Table = ({ headers = [], rows = [], deleteFunction = () => { } }) => {
  const composeDeleteFunction = (id) => () => deleteFunction(id)
  return (
    <table class="table is-full-width p-2" style={{ width: '100%', boxShadow: '1px 1px rgba(55, 52, 52, 0.2)', background: '#FAFAFA' }}>
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
              {row.map((data, idx) => {
                let content = data
                if (idx == 0) content = data?.substr(0, 3) + "..."
                return (
                  <td key={data + "" + idx} className="has-text-dark">{content}</td>
                )
              })}
              <td className="has-text-dark">
                <button className="button is-warning has-text-white is-small mr-4">Edit</button>
                <button className="button is-danger has-text-white is-small" onClick={composeDeleteFunction(row?.[0])}>Delete</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table;