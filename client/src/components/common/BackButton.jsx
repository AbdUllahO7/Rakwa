import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function BackButton({ link = -1 }) {
    const navigate = useNavigate();

    return (
        <div>
            <Button
                className="pl-5 pr-5 flex gap-2 hover:bg-hover text-title bg-secondary duration-300"
                onClick={() => navigate(link)}
            >
                <ArrowLeft />
                Back
            </Button>
        </div>
    );
}

// PropTypes for type checking
BackButton.propTypes = {
    link: PropTypes.oneOfType([
        PropTypes.string, // For named routes or paths
        PropTypes.number, // For relative navigation (e.g., -1 for "go back")
    ]),
};

export default BackButton;
