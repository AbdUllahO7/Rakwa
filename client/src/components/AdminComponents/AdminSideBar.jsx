import { 
    Book, 
    ChartBarStacked, 
    ChartNoAxesCombined, 
    CircleDollarSign, 
    Home, 
    LayoutDashboard, 
    Users 
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSideBarMenuItems = [
    {
        id: 'homePage',
        label: 'Home Page',
        path: '/',
        icon: <Home />
    },
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <LayoutDashboard />
    },
    {
        id: 'category',
        label: 'Category',
        path: '/admin/category',
        icon: <ChartBarStacked />
    },
    {
        id: 'pricingPlan',
        label: 'Pricing Plan',
        path: '/admin/pricingPlan',
        icon: <CircleDollarSign />
    },
    {
        id: 'adminUserBusiness',
        label: 'User Business',
        path: '/admin/AdminUserBusiness',
        icon: <Users />
    },
    {
        id: 'adminBlogs',
        label: 'Blogs',
        path: '/admin/adminBlogs',
        icon: <Book />
    },
];

function MenuItems({ setOpen }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="mt-8 flex-col flex gap-2">
            {adminSideBarMenuItems.map(menuItem => {
                const isActive = location.pathname === menuItem.path;
                return (
                    <div
                        key={menuItem.id}
                        onClick={() => {
                            navigate(menuItem.path);
                            if (setOpen) setOpen(false);
                        }}
                        className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-xl ${
                            isActive
                                ? "bg-hover text-white"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                    >
                        {menuItem.icon}
                        <span>{menuItem.label}</span>
                    </div>
                );
            })}
        </nav>
    );
}

MenuItems.propTypes = {
    setOpen: PropTypes.func,
};

function AdminSideBar({ open, setOpen }) {
    const navigate = useNavigate();

    return (
        <Fragment>
            {/* Mobile Sidebar */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="border-b">
                            <SheetTitle className="flex gap-2 mt-5 mb-5">
                                <ChartNoAxesCombined size={30} />
                                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen} />
                    </div>
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div 
                    onClick={() => navigate('/admin/dashboard')} 
                    className="flex cursor-pointer items-center gap-2"
                >
                    <ChartNoAxesCombined size={30} />
                    <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
    );
}

AdminSideBar.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
};

export default AdminSideBar;
