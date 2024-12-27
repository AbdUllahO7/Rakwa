import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function CommentRatingForm({ 
    overallRating, 
    setOverallRating, 
    customerServiceRating, 
    setCustomerServiceRating, 
    priceRating, 
    setPriceRating,
    comment,
    setComment,
    handleSubmit 
}) {
    const { user , isAuthenticated } = useSelector(state => state.auth);

  return (
    <div className="w-full mb-10">
        <h1 className="font-bold text-2xl">Rating</h1>
        <div className="flex flex-wrap w-full justify-center items-center gap-7 mb-5">
            
            {/* Overall Rating */}
            <div>
            {
                    overallRating !==null ? (
                        <>
                            <h2 className="font-bold mb-1 text-center">Overall Rating</h2>
                            <Select onValueChange={setOverallRating} value={overallRating || ""}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Rate" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Overall Rating</SelectLabel>
                                        <SelectItem value="1">1 Star</SelectItem>
                                        <SelectItem value="2">2 Stars</SelectItem>
                                        <SelectItem value="3">3 Stars</SelectItem>
                                        <SelectItem value="4">4 Stars</SelectItem>
                                        <SelectItem value="5">5 Stars</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </>
                    ) : null  
                }
        
            </div>
            
            {/* Customer Service Rating */}
            <div>
            {
                    customerServiceRating !== null ? (
                        <>
                        <h2 className="font-bold mb-1 text-center">Customer Service</h2>
                            <Select onValueChange={setCustomerServiceRating} value={customerServiceRating || ""}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Rate" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Customer Service</SelectLabel>
                                    <SelectItem value="1">1 Star</SelectItem>
                                    <SelectItem value="2">2 Stars</SelectItem>
                                    <SelectItem value="3">3 Stars</SelectItem>
                                    <SelectItem value="4">4 Stars</SelectItem>
                                    <SelectItem value="5">5 Stars</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        </>
                    ) : null 
                }
            
            </div>
            
            {/* Price Rating */}
            <div>
                {
                    priceRating !==null ? (
                        <>
                            <h2 className="font-bold mb-1 text-center">Prices</h2>
                            <Select onValueChange={setPriceRating} value={priceRating || ""}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Rate" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Prices</SelectLabel>
                                        <SelectItem value="1">1 Star</SelectItem>
                                        <SelectItem value="2">2 Stars</SelectItem>
                                        <SelectItem value="3">3 Stars</SelectItem>
                                        <SelectItem value="4">4 Stars</SelectItem>
                                        <SelectItem value="5">5 Stars</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </>
                    ) : null 
                }

            </div>
        </div>
        <div className="mb-10 grid w-full gap-2">
            <Textarea placeholder="Type your Comment here."                    
                value={comment}
                onChange={(e) => setComment(e.target.value)} />
            <Button
                onClick={() => handleSubmit(user?._id)}
                className={`bg-secondary dark:text-primary ${(!comment ) && "opacity-50 cursor-not-allowed"}`}
                disabled={!isAuthenticated}
            >
                Send Comment
            </Button>
        </div>
    </div>
  );
}

CommentRatingForm.propTypes = {
    overallRating: PropTypes.string, 
    setOverallRating: PropTypes.func, 
    customerServiceRating: PropTypes.string, 
    setCustomerServiceRating: PropTypes.func, 
    priceRating: PropTypes.string, 
    setPriceRating: PropTypes.func, 
    comment: PropTypes.string, 
    setComment: PropTypes.func, 
    handleSubmit: PropTypes.func 
};

export default CommentRatingForm;
