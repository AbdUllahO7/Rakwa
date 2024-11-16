import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/UserView/Home'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/authSlice';
import LoadingSpinner from './components/ui/LoadingSpinner';
import CheckAuth from './components/common/check-auth';
import AuthLayout from './components/auth/AuthLayout';
import AuthLogin from './pages/auth/AuthLogin';
import AuthRegister from './pages/auth/AuthRegister';
import HomeLayout from './components/UserComponents/HomeLayout';
import AdminLayout from './components/AdminComponents/AdminLayout';
import AdminDashboard from './pages/AdminView/AdminDashboard';
import AdminCategory from './pages/AdminView/AdminCategory';
import AllCategory from './pages/UserView/AllCategory';
import SingleCategory from './pages/UserView/SingleCategory';
import PricingPlans from './pages/UserView/PricingPlans';
import AdminPricingPlan from './pages/AdminView/AdminPricingPlan';
import JobInfoLayout from './pages/UserView/JobInfoLayout';
import ReviewJobPage from './pages/UserView/ReviewJobPage';
import AdminUserBusiness from './pages/AdminView/AdminUserBusiness';
import ProfileLayout from './pages/UserView/Porfile/ProfileLayout';
import UserDashBoard from './components/UserComponents/Profile/UserDashBoard';
import UserBusiness from './components/UserComponents/Profile/UserBusiness';
import BusinessInfo from './components/UserComponents/Profile/BusinessInfo';
import BusinessDetails from './pages/UserView/BusinessDetails';
import UserMessages from './components/UserComponents/Profile/UserMessages';
import AllMessages from './components/UserComponents/Profile/AllMessages';
import UserPricingPlan from './components/UserComponents/Profile/UserPricingPlan';

function App() {
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Global Loading Animation for all pages
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner /> {/* Add your custom loading spinner here */}
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <Routes>
        {/* Authentication routes */}
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* User-specific routes */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} /> {/* Default route */}
          <Route path="AllCategory" element={<AllCategory />} />
          <Route path="SingleCategory/:id" element={<SingleCategory />} />
          <Route path="PricingPlans" element={<PricingPlans />} />
          <Route path="JobInfo" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <JobInfoLayout />
            </CheckAuth>
          } />
          <Route path="reviewJobPage" element={<ReviewJobPage />} />
          <Route path="userProfile" element={<ProfileLayout />}>
            <Route path="dashboard" element={<UserDashBoard />} />
            <Route path="UserBusiness" element={<UserBusiness />} />
            <Route path="BusinessInfo/:businessId" element={<BusinessInfo isAdmin={false} />} />
            <Route path="Messages" element={<UserMessages />} />
            <Route path="AllMessages" element={<AllMessages />} />
            <Route path="PricingPlan" element={<UserPricingPlan />} />
          </Route>
          <Route path="BusinessDetails/:id" element={<BusinessDetails />} />
        </Route>

        {/* Admin-specific routes */}
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="category" element={<AdminCategory />} />
          <Route path="PricingPlan" element={<AdminPricingPlan />} />
          <Route path="AdminUserBusiness" element={<AdminUserBusiness />} />
          <Route path="BusinessInfo/:businessId" element={<BusinessInfo isAdmin={true} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
