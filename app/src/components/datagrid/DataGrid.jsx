import React, { useState, useMemo } from 'react';
import './DataGrid.css'; // Include CSS file for custom styling

const DataGrid = ({ columns, rows, initialSort = { field: '', direction: 'asc' }, rowsPerPage = 5 }) => {
    // State variable to store the sorting configuration, initialized by the initialSort prop
    const [sortConfig, setSortConfig] = useState(initialSort);

    // State variable to store text used for filtering rows based on user input
    const [filterText, setFilterText] = useState('');

    // State variable to track the current page number for paginating rows
    const [currentPage, setCurrentPage] = useState(0);

    // Memoized value for sorted rows:
    // useMemo caches the sorted rows to avoid recalculating sorting each time the component renders,
    // which improves performance. This will only re-calculate when 'rows' or 'sortConfig' change.
    const sortedRows = useMemo(() => {
        // If no field is specified for sorting (sortConfig.field is empty), return rows as-is
        if (!sortConfig.field) return rows;

        // Copy rows into a new array to avoid mutating the original data, then sort
        const sorted = [...rows].sort((a, b) => {
            const aValue = a[sortConfig.field]; // Value of the field to sort by for row 'a'
            const bValue = b[sortConfig.field]; // Value of the field to sort by for row 'b'

            // If sorting in ascending order:
            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;

            // If values are equal, maintain original order
            return 0;
        });

        return sorted;
    }, [rows, sortConfig]);

    // Memoized value for filtered rows:
    // Filtering only recomputes when 'filterText', 'sortedRows', or 'columns' change,
    // which avoids redundant filtering operations, boosting performance.
    const filteredRows = useMemo(() => {
        // If no filter text is entered, return all sorted rows
        if (!filterText) return sortedRows;

        // Filter the sorted rows by checking if any column value includes the filter text (case-insensitive)
        return sortedRows.filter(row =>
            columns.some(column => 
                // Convert the row value and filterText to lowercase for case-insensitive comparison
                String(row[column.field]).toLowerCase().includes(filterText.toLowerCase())
            )
        );
    }, [filterText, sortedRows, columns]);

    // Memoized value for paginated rows:
    // Pagination will re-compute only when 'currentPage', 'rowsPerPage', or 'filteredRows' change.
    // This allows for efficient handling of pagination.
    const paginatedRows = useMemo(() => {
        const start = currentPage * rowsPerPage; // Start index for slicing the filtered rows
        const end = start + rowsPerPage; // End index for slicing the filtered rows
        return filteredRows.slice(start, end); // Return a portion of rows for the current page
    }, [currentPage, rowsPerPage, filteredRows]);

    // Updates sorting configuration when a column header is clicked.
    // Toggles between ascending ('asc') and descending ('desc') when clicking the same header.
    const handleSort = field => {
        setSortConfig(prevConfig => ({
            field,
            direction: prevConfig.field === field && prevConfig.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    // Updates the current page number when pagination controls are used
    const handlePageChange = (newPage) => setCurrentPage(newPage);

    return (
        <div className="data-grid">
            {/* Search input field to filter rows based on filterText */}
            <input
                type="text"
                placeholder="Search..."
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                className="data-grid__search"
            />
            <table className="data-grid__table">
                <thead>
                    <tr>
                        {/* Render column headers with sorting functionality */}
                        {columns.map(column => (
                            <th
                                key={column.field}
                                onClick={() => handleSort(column.field)}
                                className="data-grid__header-cell"
                            >
                                {column.label}
                                {/* Show arrow next to sorted column based on direction */}
                                {sortConfig.field === column.field && (
                                    <span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Render paginated rows */}
                    {paginatedRows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="data-grid__row">
                            {columns.map(column => (
                                <td key={column.field} className="data-grid__cell">
                                    {row[column.field]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="data-grid__pagination">
                {/* Pagination controls for navigating */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <span>Page {currentPage + 1}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={(currentPage + 1) * rowsPerPage >= filteredRows.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DataGrid;
