import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './styles/App.scss';
import _404 from './components/_404.jsx';
// import Login from './components/Login';
{/* dashboard & Profile Page */ }
import AdminDashboard from './Pages/Dashboard_and_Profile/AdminDashboard/AdminDashboard.jsx';
import AdminProfile from './Pages/Dashboard_and_Profile/AdminProfile/AdminProfile.jsx';
import EmployeeDashboard from './Pages/Dashboard_and_Profile/EmployeeDashboard/EmployeeDashboard.jsx';
{/* {Employee onboarding } */ }
import AllEmployeeList from './Pages/Employee_onboarding/AllEmployeeList/AllEmployeeList.jsx';
import AddEmloyee from './Pages/Employee_onboarding/AddEmployee/AddEmloyee.jsx';
// import EmployeeDetails from './Pages/Employee_onboarding/EmployeeDetail/EmployeeDetails.jsx';

import EmployeeDetails from './Pages/Employee_onboarding/EmployeeDetail/EmployeeDetails.jsx';
// import SignUp from './components/SignUp';
// import ViewattendenceLogin from './components/ViewattendenceLogin'; // Import the new ViewattendenceLogin component
// import TrackPerformance from './components/TrackPerformance'; // Import the new TrackPerformance component
// import SendOTP from './components/SendOTP'; // Import OTPVerification component
import './styles/App.scss';
// import ForgotPassword from './components/ForgotPassword'; // Import the ForgotPassword component
// import SetNewPassword from './components/SetNewPassword'; // Import the SetNewPassword component

// 
// import Department from './Pages/Employee_onboarding/EmployeeDetail/Department.jsx';

// 
import AllJobList from './Pages/Recruitment/List_view_all_job/AllJobList.jsx'
import AddNewJob from './Pages/Recruitment/Add Job/AddNewJob.jsx';
import JobDetails from'./Pages/Recruitment/Job_details_page/JobDetails.jsx';
import EmployeeProfile from'./Pages/Dashboard_and_Profile/EmployeeProfile/EmployeeProfile.jsx';

// All_Applicant
import All_Applicant_list from'./Pages/Applicant_tracking/All_Applicant_list.jsx';
import Applicant_detail from'./Pages/Applicant_tracking/Applicant_detail/Applicant_detail.jsx';
import Add_applicant from'./Pages/Applicant_tracking/Add-applicant/Add_applicant.jsx';
import AllAttendanceList from'./Pages/Attedance_tracking/AllAttendanceList.jsx'

// Login

import Login from './Views/Login/Login.jsx';
import SignUp from './Views/SignUp/SignUp.jsx';
import ForgotPassword  from './Views/ForgotPassword/ForgotPassword.jsx';
import SetNewPassword from './Views/ForgotPassword/SetNewPassword.jsx';
import SendOTP from './Views/ForgotPassword/SendOTP.jsx';

import ViewattendenceLogin from './Views/Login/ViewattendenceLogin.jsx'; // Import the new ViewattendenceLogin component
import TrackPerformance from './Views/Login/TrackPerformance.jsx'; // Import the new TrackPerformance component


import Department from './Pages/Department/DepartmentList/Department.jsx';
import DepartmentDetails from './Pages/Department/DepartmentDetails/DepartmentDetails.jsx';
import Designation from './Pages/Designation/DesignationList/Designation.jsx';
import DesignationDetails from './Pages/Designation/DesignationDetail/DesignationDetails.jsx';

import EditUiDesignation from './Pages/Designation/EditDesignation/EditUiDesignation.jsx';
import AddEmployeeHealth from './Pages/EmployeeHealth/AddEmployeeHealth/AddEmployeeHealth.jsx';

import EmployeeHealth from './Pages/EmployeeHealth/EmployeeHealthList/EmployeeHealth.jsx'

import EmployeeHealthDetails from './Pages/EmployeeHealth/EmployeeHealthDetails/EmployeeHealthDetails.jsx';

import BirthdayList from './Pages/Birthday/BirthdayList/BirthdayList.jsx';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem('isLoggedIn')) || false
  );

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <Router>
      {!isLoggedIn ? (
        // {/* <Login setIsLoggedIn={setIsLoggedIn} /> */ }
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login-attendance" element={<ViewattendenceLogin setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/track-performance' element={<TrackPerformance setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<SendOTP />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          {/* nav bar */}
          <div id="app_">
            <Navbar setIsLoggedIn={setIsLoggedIn} />
            <div className="app">
              {/* side bar */}
              <div className="sideBar_app">
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
              </div>
              <div className="content">
                <Routes>
                  {/* 404 page */}
                  {/* dashboard & Profile Page */}
                  <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
                  <Route path="/" element={<AdminDashboard />}></Route>

                  <Route path='/*' element={<_404 />} />
                  <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                  {/* {Employee onboarding } */}
                  <Route path="/admin-profile" element={<AdminProfile />} />
                  <Route path="/Employee-profile" element={<EmployeeProfile />} />
                  <Route path="/all-employee-list" element={<AllEmployeeList />} />
                  <Route path="/add-employee" element={<AddEmloyee />} />
                  <Route path="/employee-details" element={<EmployeeDetails />} />
                  <Route path="/department" element={<Department />} />
                  {/* recruitment */}
                  <Route path="/all-job-list" element={<AllJobList />} />
                  <Route path="/add-job" element={<AddNewJob />} />
                  <Route path="/job-details" element={<JobDetails />} />
                    {/* { } */}
                    <Route path="/all-applicant-list" element={<All_Applicant_list />} />
                    <Route path="/add-applicant" element={<Add_applicant />} />
                    <Route path="/applicant-details" element={<Applicant_detail />} />
                    {/* {AllAttendanceList } */}
                    <Route path="/all-attendance-list" element={<AllAttendanceList />} />
                    {/*  */}
                    <Route path="/department" element={<Department/>}/>
                  <Route path="/designation" element={<Designation/>}/>
                  <Route path="/departmentdetails" element={<DepartmentDetails/>}/>
                  <Route path="/designationdeatils" element={<DesignationDetails/>}/>
                  <Route path="/editUidesignation" element={<EditUiDesignation/>}/>
                  <Route path="/health" element={<EmployeeHealth/>}/>
                  <Route path="/addemployeehealth" element={<AddEmployeeHealth/>}/>
                  <Route path="/employeehealthdetails" element={<EmployeeHealthDetails/>}/>
                  <Route path="/birthday" element={<BirthdayList/>}/>
                </Routes>

              </div>
            </div>
          </div>
        </>
      )
      }
    </Router>
  );
};

export default App;