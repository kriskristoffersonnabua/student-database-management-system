const Table = ({ headers = [], rows = [] }) => {
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
                return (
                  <td key={data + "" + idx} className="has-text-dark">{data}</td>
                )
              })}
              <td className="has-text-dark"><button className="button is-warning has-text-white is-small">Edit</button></td>
              <td className="has-text-dark"><button className="button is-danger has-text-white is-small">Delete</button></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table;