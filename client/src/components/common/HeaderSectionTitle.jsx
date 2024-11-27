import { StarIcon } from 'lucide-react'
import PropTypes from 'prop-types';

function HeaderSectionTitle({title}) {
    return (
        <div className='flex justify-center items-center mx-auto w-full mb-8'>
            <StarIcon className='text-yellow-600 mr-4' />
        <h2 className='text-3xl font-bold text-center'>{title}</h2>
        
    </div>

    )
}
HeaderSectionTitle.propTypes = {
    title: PropTypes.string,
};

export default HeaderSectionTitle
