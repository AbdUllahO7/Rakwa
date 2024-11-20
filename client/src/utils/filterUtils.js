// src/utils/filterUtils.js
export function handleFilter(filters, getSectionId, getCurrentOption, setFilters) {
    let cpyFilters = { ...filters };
    cpyFilters[getSectionId] = getCurrentOption;

    setFilters(cpyFilters); // Update filters state
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters)); // Save filters in sessionStorage
}


// Helper function to create a query string from filter parameters
export function createSearchParamsHelper(filtersParams) {
    const queryParams = [];
    // Iterate over filter parameters and build query string
    for(const [key , value]  of Object.entries(filtersParams)){
        if(Array.isArray(value) && value.length > 0){
            const paramValue = value.join(",");
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
        }
    }
    return queryParams.join('&');
}
