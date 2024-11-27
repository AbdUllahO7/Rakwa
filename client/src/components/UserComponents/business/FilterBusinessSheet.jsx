import PropTypes from "prop-types";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import { citiesFilter, countriesFilter, statesFilter } from "@/utils/filterUtils";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, RotateCcw } from "lucide-react";

function FilterBusinessSheet({ isOpen, onClose, onApplyFilters, filters, resetFilters }) {
    const [selectedCountry, setSelectedCountry] = useState(filters.country || "");
    const [selectedState, setSelectedState] = useState(filters.state || "");
    const [selectedCity, setSelectedCity] = useState(filters.city || "");

    const stateOptions = selectedCountry ? statesFilter[selectedCountry] || [] : [];
    const cityOptions = selectedState ? citiesFilter[selectedState] || [] : [];

    const handleApplyFilters = () => {
        onApplyFilters({
            country: selectedCountry,
            state: selectedState,
            city: selectedCity,
        });
        onClose(); // Close the sheet
    };

    const handleResetFilters = () => {
        setSelectedCountry("");
        setSelectedState("");
        setSelectedCity("");
        resetFilters(); // Call the reset function in parent to reset the filters in URL
    };

    return (
        <Sheet open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
            <SheetContent side="right" className="overflow-auto">
                <SheetHeader>
                    <SheetTitle>Filter Businesses</SheetTitle>
                </SheetHeader>
                <div className="py-4 px-6 space-y-4">
                    {/* Country Selector */}
                    <div>
                        <Label className="text-sm font-medium text-gray-700">Country</Label>
                        <Select
                            onValueChange={(value) => {
                                setSelectedCountry(value);
                                setSelectedState(""); // Reset state and city when country changes
                                setSelectedCity("");
                            }}
                            value={selectedCountry}
                        >
                            <SelectTrigger className="w-full mt-1">
                                <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {countriesFilter.map((country) => (
                                        <SelectItem key={country} value={country}>
                                            {country}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* State Selector */}
                    <div>
                        <Label className="text-sm font-medium text-gray-700">State</Label>
                        <Select
                            onValueChange={(value) => {
                                setSelectedState(value);
                                setSelectedCity(""); // Reset city when state changes
                            }}
                            disabled={!selectedCountry}
                            value={selectedState}
                        >
                            <SelectTrigger className="w-full mt-1">
                                <SelectValue
                                    placeholder={
                                        selectedCountry
                                            ? "Select a state"
                                            : "Please select a country first"
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {stateOptions.map((state) => (
                                        <SelectItem key={state} value={state}>
                                            {state}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* City Selector */}
                    <div>
                        <Label className="text-sm font-medium text-gray-700">City</Label>
                        <Select
                            onValueChange={(value) => setSelectedCity(value)}
                            disabled={!selectedState}
                            value={selectedCity}
                        >
                            <SelectTrigger className="w-full mt-1">
                                <SelectValue
                                    placeholder={
                                        selectedState
                                            ? "Select a city"
                                            : "Please select a state first"
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {cityOptions.map((city) => (
                                        <SelectItem key={city} value={city}>
                                            {city}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mt-10 flex gap-4">
                        <Button
                            className="bg-secondary text-title hover:bg-hover flex gap-2"
                            onClick={handleApplyFilters}
                        >
                            <Filter/>
                            Set Filters
                        </Button>
                        <Button
                            className="bg-secondary text-title hover:bg-hover flex gap-2"
                            onClick={handleResetFilters}
                        >
                            <RotateCcw />
                            Reset Filters
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

FilterBusinessSheet.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onApplyFilters: PropTypes.func,
    filters: PropTypes.object.isRequired,
    resetFilters: PropTypes.func.isRequired,
};

export default FilterBusinessSheet;
