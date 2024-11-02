// src/utils/filterUtils.js

export function handleFilter(filters, getSectionId, getCurrentOption, setFilters) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    // Add or remove filter options based on user selection
    if (indexOfCurrentSection === -1) {
        cpyFilters = {
            ...cpyFilters,
            [getSectionId]: [getCurrentOption],
        };
    } else {
        const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);
        if (indexOfCurrentOption === -1) cpyFilters[getSectionId].push(getCurrentOption);
        else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters); // Update filters state
    sessionStorage.setItem('filters', JSON.stringify(cpyFilters)); // Save filters in sessionStorage
}
