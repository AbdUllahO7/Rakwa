import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { ArrowUpDownIcon } from "lucide-react";
import PropTypes from "prop-types";

function SortByComponent({
    sort,
    handleSort,
    title
}) {
    return (
    <>
        <div className="flex items-center justify-between">
            <h2 className="mb-5 text-left">{title}</h2>
        {/* Sort by dropdown menu */}
        <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1 bg-secondary">
                        <ArrowUpDownIcon className="w-4 h-6 " />
                        <span className="">Sort by</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                        {sortOptions.map(sortItem => 
                            <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                                {sortItem.label}
                            </DropdownMenuRadioItem>
                        )}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    
    </>
    )
}
SortByComponent.propTypes = {
    sort : PropTypes.any,
    handleSort : PropTypes.func,
    title : PropTypes.string

}
export default SortByComponent
