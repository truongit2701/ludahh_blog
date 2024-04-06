import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import NotFound from './components/common/NotFound';
import Category from './page/Category';
import Login from './page/Login';
import MainPage from './page/MainPage';
import MainPost from './page/MainPost';
import PostManage from './page/Manage/Post';
import User from './page/Manage/User';
import Register from './page/Register';
import Write from './page/Write';

function App() {
   const auth = useSelector((state) => state.auth.login.user);
   const queryClient = new QueryClient();
   const location = useLocation();
   const navigate = useNavigate();

   const { pathname } = location;
   useEffect(() => {
      if (pathname === '/') navigate('/news');
   }, [pathname]);

   // var DEBUG = process.env.DEBUG;
   // // ENABLE/DISABLE Console Logs
   // if (!DEBUG) {
   //    console.log = function () {};
   // }

   return (
      <HelmetProvider>
         <QueryClientProvider client={queryClient}>
            <ToastContainer />
            {/* <Example /> */}
            <Navbar auth={auth} />
            <Routes>
               <Route path="/news" index element={<MainPage />} />
               <Route path="/p/:id" element={<MainPost />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/write" element={<Write />} />
               <Route path="/category" element={<Category />} />
               <Route path="/user-manage" element={<User />} />
               <Route path="/post-manage" element={<PostManage />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
         </QueryClientProvider>
      </HelmetProvider>
   );
}

export default App;
