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
              {Object.entries(row).map((data) => {
                return (
                  <td key={data?.[0]} className="has-text-dark">{data?.[1]}</td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table;