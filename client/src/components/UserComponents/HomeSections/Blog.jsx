import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import stables from '@/constants/stables';
import { Calendar, Heart, Rss, User } from 'lucide-react';
import PropTypes from 'prop-types';

function Blog({ blog, handleCardClick }) {

    return (
        <Card
            className="w-full max-w-sm mx-auto duration-500 hover:bg-hover bg-secondary shadow-lg hover:-translate-y-3 cursor-pointer mb-2"
            onClick={() => handleCardClick(blog?.slug)}
        >
            <div>
                <div className="relative">
                    <img
                        src={
                            blog?.photo
                                ? stables.UPLOAD_FOLDER_BASE_URL + blog.photo
                                : stables.defaultImageBlog
                        }
                        alt={blog?.title}
                        className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                    <Badge className="absolute bottom-2 left-2 bg-secondary flex gap-3 group">
                        <Heart className="text-primary w-5 h-5 group-hover:text-secondary" />
                    </Badge>
                    <Badge className="absolute text-primary bottom-2 right-2 bg-secondary flex gap-3 group">
                        <Rss className="text-primary w-3 h-3 group-hover:text-secondary" />
                        <h2 className="text-primary group-hover:text-secondary line-clamp-1 w-20 overflow-hidden">{blog?.tags.map((tag) => tag).join(', ') } </h2>
                    </Badge>
                </div>
                <CardContent className="p-4">
                    <h2 className="text-xl text-title font-bold mb-2">{blog?.title}</h2>
                    <p className="line-clamp-2 text-description">{blog?.caption }</p>
                </CardContent>
                <CardFooter className="flex justify-start items-start border-t mt-1 pt-3 flex-col">
                    <div className="flex justify-between items-center mb-2 gap-2">
                        <User className="size-5 text-description" />
                        <span className="text-md text-description font-bold">
                            {blog?.owner?.userName}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-2 gap-2">
                        <Calendar className="size-5 text-description" />
                        <span className="text-md text-description font-bold">
                            {new Date(blog?.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </CardFooter>
            </div>
        </Card>
    );
}

Blog.propTypes = {
    blog: PropTypes.object,
    handleCardClick: PropTypes.func,
};

export default Blog;
