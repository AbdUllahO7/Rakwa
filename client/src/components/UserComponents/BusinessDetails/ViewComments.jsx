import PropTypes from 'prop-types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { renderStars } from '@/utils/Star';

function ViewComments({
    comments,
    reviewsToShow,
    showMoreReviews
}) {
  return (
    <>
        <div className="mb-10 w-full">
            <h1 className="font-bold text-2xl text-secondary">Customer Reviews</h1>
            <div className="flex flex-wrap w-full gap-7">
            {comments && comments.length > 0 ? (
                comments.slice(0, reviewsToShow).map((commentItem, index) => (
                <div key={index} className="flex flex-row gap-4 mt-5 flex-wrap w-[300px]">
                    <div className="flex gap-4 items-center w-full">
                    <Avatar className="bg-black">
                        <AvatarFallback className="bg-secondary text-primary cursor-pointer font-extrabold">
                        {commentItem?.user?.userName?.[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex gap-1 flex-col">
                        <div className="flex gap-2">
                        <span>Over All</span>
                        {renderStars(commentItem?.overallRating)}
                        </div>
                        <div className="flex gap-2">
                        customerService{renderStars(commentItem?.customerService)}
                        </div>
                        <div className="flex gap-2">
                        prices{renderStars(commentItem?.prices)}
                        </div>
                        <div className="flex flex-col gap-2">
                        <p className="text-black font-bold">{commentItem?.comment}</p>
                        </div>
                    </div>
                    </div>
                </div>
                ))
            ) : (
                <p>No reviews yet.</p>
            )}
            {comments && comments.length > reviewsToShow && (
                <div className="mx-auto">
                <Button className="bg-secondary dark:text-primary" onClick={showMoreReviews}>
                    Show More Reviews
                </Button>
                </div>
            )}
            </div>
        </div>
    </>
  );
}

ViewComments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      overallRating: PropTypes.number,
      customerService: PropTypes.number,
      prices: PropTypes.number,
      comment: PropTypes.string,
      user: PropTypes.shape({
        userName: PropTypes.string
      })
    })
  ),
  reviewsToShow: PropTypes.number,
  showMoreReviews: PropTypes.func.isRequired
};

export default ViewComments;
