import { fetchAllSubCategory } from "@/store/adminSlice/AdminCategory";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import PropTypes from 'prop-types';

function ListViewSubCategory({ categoryId , handleDeleteSubCategory }) {
    const dispatch = useDispatch();
    const { SubCategoriesList } = useSelector((state) => state.SubCategoriesList);

    useEffect(() => {
        dispatch(fetchAllSubCategory({ id: categoryId }));
    }, [categoryId, dispatch]);

    console.log(SubCategoriesList)

    return (
        <div className="flex flex-wrap justify-evenly">
            {SubCategoriesList && SubCategoriesList.length > 0 ? (
                SubCategoriesList.map((subCategory) => (
                    <div
                        key={subCategory._id}
                        className="border-none shadow-2xl text-primary font-bold mx-auto w-[300px] md:w-[250px] flex flex-col items-center justify-center cursor-pointer duration-500 rounded-lg"
                    >
                        <Card className="w-full h-full flex flex-col items-center justify-between p-4 bg-secondary">
                            <CardHeader className="flex flex-col justify-center items-center text-center">
                            {subCategory.image && (
                                    <img
                                        src={subCategory.image}
                                        alt="Category Icon"
                                        className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover mb-2"
                                    />
                                )}
                                <h2 className="text-[18px] md:text-[20px] sm:text-[14px] text-primary">{subCategory.title}</h2>
                            </CardHeader>
                        </Card>
                        <div className='mt-2 flex flex-col'>
                            <div className='flex gap-10 mb-5'>
                                <Button
                                    className="bg-primary text-secondary px-4 py-2 rounded hover:bg-red-100 duration-300"
                                    onClick={() => {
                                        handleDeleteSubCategory(categoryId ,subCategory._id )
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                        
                        </div>
                    </div>
                ))
            ) : (
                <p>No subcategories found.</p>
            )}
        </div>
    );
}


ListViewSubCategory.propTypes = {
    categoryId : PropTypes.any,
    handleDeleteSubCategory : PropTypes.func
}

export default ListViewSubCategory;
