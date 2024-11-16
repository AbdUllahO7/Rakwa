import { MessageCircle, LayoutDashboard, Network, ChartNoAxesCombined, DollarSign, Heart } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { getMessagesByUser, getUnreadMessagesCount } from '@/store/userSlice/MessageSlice';

const adminSideBarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/userProfile/dashboard',
        icon: <LayoutDashboard />
    },
    {
        id: 'business',
        label: 'Business',
        path: '/userProfile/UserBusiness',
        icon: <Network />
    },
    {
        id: 'messages',
        label: 'Messages',
        path: '/userProfile/Messages',
        icon: <MessageCircle />,
        notifications: 0, // Default to 0, we'll update this dynamically
    },
    {
        id: 'plan',
        label: 'Pricing Plan',
        path: '/userProfile/PricingPlan',
        icon: <DollarSign />,
        notifications: 0, // Default to 0, we'll update this dynamically
    },
    {
        id: 'favorites',
        label: 'favorites',
        path: '/userProfile/Favorites',
        icon: <Heart />,
        notifications: 0, // Default to 0, we'll update this dynamically
    },
];

function MenuItems({ unreadMessages, setOpen }) {
    const navigate = useNavigate();

    return (
        <nav className="mt-8 flex-col flex gap-2">
            {adminSideBarMenuItems.map(menuItem => (
                <div
                    key={menuItem.id}
                    onClick={() => {
                        navigate(menuItem.path);
                        setOpen ? setOpen(false) : null;
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground text-xl"
                >
                    {menuItem.icon}
                    <span>{menuItem.label}</span>
                    {menuItem.id === 'messages' && unreadMessages > 0 && (
                        <span className="ml-2 inline-block w-6 h-6 text-center bg-red-600 text-white rounded-full text-sm">
                            {unreadMessages}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
}

MenuItems.propTypes = {
    unreadMessages: PropTypes.number.isRequired,
    setOpen: PropTypes.func,
};

function UserSideBar({ open, setOpen }) {
    const navigate = useNavigate();
    const [unreadMessages, setUnreadMessages] = useState(0);
    const dispatch = useDispatch();

    // Get the unread messages count from the store or API
    const { messages } = useSelector(state => state.messages);
    const { user } = useSelector(state => state.auth);

    // Fetch the unread messages count when messages or user change
    useEffect(() => {
        if (user?.id) {
            dispatch(getMessagesByUser({ userId: user.id }));
            dispatch(getUnreadMessagesCount(user.id));
        }
    }, [dispatch, user?.id]);

    useEffect(() => {
        if (messages?.messages?.length) {
            // Filter unread messages based on 'replayed' field and match with the current user's receiver
            const unreadCount = messages.messages.filter(
                message => message.replayed === false && message.userReceiver?._id === user?.id
            ).length;
            setUnreadMessages(unreadCount);
        }
    }, [messages, user?.id]);
    


    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="border-b">
                            <SheetTitle className="flex gap-2 mt-5 mb-5">
                                <ChartNoAxesCombined size={30} />
                                <h1 className="text-2xl font-extrabold">User Panel</h1>
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems unreadMessages={unreadMessages} setOpen={setOpen} />
                    </div>
                </SheetContent>
            </Sheet>

            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div onClick={() => navigate('/user/userProfile')} className="flex cursor-pointer items-center gap-2">
                    <ChartNoAxesCombined size={30} />
                    <h1 className="text-2xl font-extrabold">User Panel</h1>
                </div>
                <MenuItems unreadMessages={unreadMessages} />
            </aside>
        </Fragment>
    );
}

UserSideBar.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
};

export default UserSideBar;
