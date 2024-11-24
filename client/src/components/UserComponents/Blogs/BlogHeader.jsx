import { Button } from '@/components/ui/button'
import stables from '@/constants/stables'
import { renderAverageStars } from '@/utils/Star'
import { PhoneCall, QrCode, Save, Share, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

function BlogHeader({
    averageOverallRating,
    title,
    tags,
    photo,
    author ,
    date ,
    content,
}) {
    console.log(photo)
    return (
        <>
        <div className="flex-col gap-1 flex-wrap items-center justify-center w-[500px] text-start">
            <h2 className="text-4xl font-bold text-secondary mb-1  ">{title}</h2>
            {tags?.map((item, index) => (
                <Link
                    to=""
                    key={index}
                    className="bg-secondary text-primary font-bold mr-2 text-lg p-1 rounded-lg"
                >
                    {item}
                </Link>
            ))}

            <div className=''>
                <h2>Published Data :  {new Date(date).toLocaleDateString()}</h2>
                <h2>Write by : {author?.userName}</h2>
            </div>

        </div>

        <div className="flex justify-center items-end gap-6 w-[600px] flex-wrap ">
            <img
                src={photo ? stables.UPLOAD_FOLDER_BASE_URL + photo : stables.defaultImageBlog }
                alt={title}
                className="rounded-lg w-[200px]"
            />
            <div className="flex gap-2">
                <Button className="bg-secondary rounded-lg hover:bg-hover duration-300 dark:text-primary"><Star /></Button>
                <Button className="bg-secondary rounded-lg hover:bg-hover duration-300 dark:text-primary"><Share /></Button>
                <Button className="bg-secondary rounded-lg hover:bg-hover duration-300 dark:text-primary"><Save /></Button>
                <Button className="bg-secondary rounded-lg hover:bg-hover duration-300 dark:text-primary"><PhoneCall /></Button>
                <Button className="bg-secondary rounded-lg hover:bg-hover duration-300 dark:text-primary"><QrCode /></Button>
            </div>
            <div className="flex gap-4 mt-6">
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-bold">Overall Rating</h2>
                    <div className="flex gap-1">{renderAverageStars(averageOverallRating)}</div>
                    <span className="font-bold text-primary">{averageOverallRating.toFixed(1)} / 5</span>
                    </div>

            
            </div>
        </div>
    </>
    )
}

export default BlogHeader
