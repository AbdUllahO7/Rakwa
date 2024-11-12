import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PropTypes from 'prop-types';

function AdminCategoryList({ 
    Category,
    setCurrentEditId,
    setOpenCreateProductDialog,
    setFormData,
    handleDeleteCategory, 
    openSubCategoryDialog, // New prop to handle subcategory dialog
}) {    


    return (
        <div className="p-2 dark:border dark:border-gray-500 shadow-2xl text-primary  font-bold mx-auto w-[300px]  md:w-[250px]  flex flex-col items-center justify-center cursor-pointer duration-500 rounded-lg">
            <Card className="w-full h-full flex flex-col items-center justify-between p-4 bg-secondary ">
                <CardHeader className="flex flex-col justify-center items-center text-center">
                    {Category.image && (
                        <img
                            src={Category.image}
                            alt="Category Icon"
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover mb-2"
                        />
                    )}
                    <h2 className="text-[18px] md:text-[20px] sm:text-[14px] text-primary">{Category?.title}</h2>
                </CardHeader>
            </Card>
            <div className='mt-2 flex flex-col'>
                <div className='flex gap-10 mb-5'>
                    <Button 
                        className="bg-primary text-secondary px-4 py-2 rounded hover:bg-red-100 duration-300" 
                        onClick={() => {
                            setOpenCreateProductDialog(true); 
                            setCurrentEditId(Category?._id);
                            setFormData(Category);
                        }}
                    >
                        Edit
                    </Button>
                    <Button 
                        className="bg-primary text-secondary px-4 py-2 rounded hover:bg-red-100 duration-300" 
                        onClick={() => handleDeleteCategory(Category?._id)}
                    >
                        Delete
                    </Button>
                </div>
                <div className='mx-auto mb-2'>
                    <Button 
                        className="bg-primary text-secondary px-4 py-2 rounded hover:bg-red-100 duration-300" 
                        onClick={openSubCategoryDialog} // Open the subcategory dialog
                    >
                        Add SubCategory
                    </Button>
                </div>
            </div>
        </div>
    );
}

AdminCategoryList.propTypes = {
    Category: PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string,
    }),
    setCurrentEditId: PropTypes.func.isRequired,
    setOpenCreateProductDialog: PropTypes.func.isRequired,
    setFormData: PropTypes.func.isRequired,
    handleDeleteCategory: PropTypes.func.isRequired,
    openSubCategoryDialog: PropTypes.func.isRequired, // New prop type
};

export default AdminCategoryList;
