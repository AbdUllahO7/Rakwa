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



export const countriesFilter = ["Türkiye", "Germany"];

export const statesFilter = {
    Türkiye: [
        "İstanbul",
        "Ankara",
        "İzmir",
        "Antalya",
        "Bursa",
        "Adana",
        "Konya",
        "Gaziantep",
        "Mersin",
        "Diyarbakır",
    ],
    Germany: [
        "Bavaria",
        "Berlin",
        "Hamburg",
        "Hesse",
        "Lower Saxony",
        "North Rhine-Westphalia",
        "Baden-Württemberg",
        "Saxony",
        "Rhineland-Palatinate",
        "Thuringia",
    ],
};

export const citiesFilter  = {
    // Cities for Türkiye
    İstanbul: ["Kadıköy", "Beşiktaş", "Üsküdar", "Şişli", "Beyoğlu"],
    Ankara: ["Çankaya", "Keçiören", "Altındağ", "Yenimahalle", "Sincan"],
    İzmir: ["Karşıyaka", "Bornova", "Konak", "Buca", "Gaziemir"],
    Antalya: ["Alanya", "Manavgat", "Muratpaşa", "Kepez", "Kaş"],
    Bursa: ["Nilüfer", "Osmangazi", "Yıldırım", "İnegöl", "Mudanya"],
    Adana: ["Seyhan", "Çukurova", "Yüreğir", "Sarıçam", "Karataş"],
    Konya: ["Selçuklu", "Karatay", "Meram", "Ereğli", "Akşehir"],
    Gaziantep: ["Şahinbey", "Şehitkamil", "Nizip", "Oğuzeli", "Araban"],
    Mersin: ["Yenişehir", "Mezitli", "Toroslar", "Akdeniz", "Silifke"],
    Diyarbakır: ["Kayapınar", "Bağlar", "Sur", "Yenişehir", "Bismil"],

    // Cities for Germany
    Bavaria: ["Munich", "Nuremberg", "Augsburg", "Regensburg", "Ingolstadt"],
    Berlin: ["Mitte", "Charlottenburg", "Friedrichshain", "Kreuzberg", "Pankow"],
    Hamburg: ["Altona", "Eimsbüttel", "Hamburg-Mitte", "Harburg", "Bergedorf"],
    Hesse: ["Frankfurt", "Wiesbaden", "Darmstadt", "Kassel", "Offenbach"],
    "Lower Saxony": ["Hannover", "Braunschweig", "Oldenburg", "Osnabrück", "Göttingen"],
    "North Rhine-Westphalia": [
        "Cologne",
        "Düsseldorf",
        "Dortmund",
        "Essen",
        "Bonn",
    ],
    "Baden-Württemberg": ["Stuttgart", "Mannheim", "Karlsruhe", "Freiburg", "Heidelberg"],
    Saxony: ["Dresden", "Leipzig", "Chemnitz", "Zwickau", "Görlitz"],
    "Rhineland-Palatinate": ["Mainz", "Koblenz", "Ludwigshafen", "Trier", "Kaiserslautern"],
    Thuringia: ["Erfurt", "Jena", "Gera", "Weimar", "Suhl"],

};