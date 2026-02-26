export default function DataTable({ columns, data, onRowClick }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      {/* Desktop/Tablet Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((row, i) => (
              <tr
                key={row.id || i}
                onClick={() => onRowClick?.(row)}
                className={`${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''} transition-colors`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden divide-y divide-gray-100">
        {data.map((row, i) => (
          <div
            key={row.id || i}
            onClick={() => onRowClick?.(row)}
            className={`p-4 ${onRowClick ? 'cursor-pointer active:bg-gray-50' : ''}`}
          >
            {/* First column as card header */}
            <div className="font-medium text-sm text-gray-900 mb-2">
              {columns[0]?.render ? columns[0].render(row[columns[0].key], row) : row[columns[0]?.key]}
            </div>
            {/* Remaining columns as label-value pairs */}
            <div className="space-y-1">
              {columns.slice(1).map((col) => (
                <div key={col.key} className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">{col.label}</span>
                  <span className="text-gray-600">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-sm text-gray-400">No data available</div>
      )}
    </div>
  )
}
