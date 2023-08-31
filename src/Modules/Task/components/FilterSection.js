import React from "react";

const FilterSection = ({ filter, onFilterChange }) => {
    return (
        <div className="filter-section">
            <label htmlFor="filter">Filter:</label>
            <select id="filter" value={filter} onChange={onFilterChange}>
                <option value="all">All Tasks</option>
                <option value="completed">Completed Tasks</option>
                <option value="uncompleted">Uncompleted Tasks</option>
            </select>
        </div>
    );
};

export default FilterSection;