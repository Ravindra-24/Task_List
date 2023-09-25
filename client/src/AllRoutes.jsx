import React, {useEffect, useState} from 'react'
import { Toaster } from 'react-hot-toast';
import { Route, Routes, useLocation } from 'react-router';
import LoadingBar from "react-top-loading-bar";
import NotFound from './Components/NotFound';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Home from './pages/Tasks/Home';


const AllRoutes = () => {
    const location = useLocation();

    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
      setProgress(40)
      const timeout = setTimeout(() => {
        setProgress(100)
      })
      return () => clearTimeout(timeout)
    }, [location.pathname]);
  return (
    <>
      <Toaster />
      <Nav/>
      <div className="gradient-progress-wrapper">
        <LoadingBar
          // className="loading-bar"
          color="#44f044"
          height={3}
          shadow={true}
          progress={progress}
          loaderSpeed={400}
          containerStyle={{ zIndex: 1000 }}
          transitionTime={200}
          // waitingTime={500}
          onLoaderFinished={() => setProgress(0)}
        />
      </div>
      <Routes>
        <Route path="/" element={<Home setProgress={setProgress} />} />
        <Route path="/login" element={<Login setProgress={setProgress} />} />
        <Route path="/signup" element={<Signup setProgress={setProgress} />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword setProgress={setProgress} />}
        />
        <Route
          path="/reset-password/:token"
          element={<ResetPassword setProgress={setProgress} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default AllRoutes
