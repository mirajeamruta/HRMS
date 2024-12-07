import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EmployeeDetails.scss';
import Experience from './Experience.jsx';
import Education from './Education.jsx';
import Documents from './Documents.jsx';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdWorkHistory } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

const EmployeeDetails = () => {
    const [activeTab, setActiveTab] = useState('experience');
    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('access_token');
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch employee details based on ID
    useEffect(() => {
        console.log("Fetching employee data for ID: ", id);
        console.log("Token: ", token);
        
        axios.post(`https://devstronauts.com/public/api/employee/details`, { emp_id: id }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log("Employee Data Response:", response.data);
            if (response.data && response.data.employee) {
                setEmployeeData(response.data.employee);
            } else {
                setEmployeeData(null);
            }

            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching employee data:", error);
            setError("Error fetching employee data. Please try again.");
            setLoading(false);
        });
    }, [id, token]);


    // Navigate to all employee list
    const AllEmp = () => {
        navigate('/all-employee-list');
    }

    // Handle tab switching
    const renderContent = () => {
        switch (activeTab) {
            case 'experience':
                return <Experience />;
            case 'education':
                return <Education />;
            case 'documents':
                return <Documents />;
            default:
                return <Experience />;
        }
    };

    if (loading) {
        return <div style={{textAlign:"center",display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize:"20px",
            height: "100vh" /* Adjust the height based on your container */}}>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!employeeData) {
        return <div>Error: Employee data not found.</div>;
    }

    return (
        <div className="profile-page">
            <div className="details">
                <div className="title_top">
                    <h2>Employee Details</h2>
                    <div className='close_btn' onClick={AllEmp}>
                        <IoMdCloseCircleOutline />
                    </div>
                </div>
                <div className="profile_card">
                    <div className="img_card">
                        <div className="progress-circle">
                        <img src="https://w7.pngwing.com/pngs/564/690/png-transparent-computer-icons-web-browser-new-job-hand-business-silhouette-thumbnail.png" alt="" />
                        </div>
                        <div className="about_user">
                            <h3>{employeeData?.first_name || "N/A"}</h3>
                            <p>{employeeData?.position || "Position not available"}</p>
                            <div><h4></h4> <h5>{employeeData?.status || "Status not available"}</h5></div>
                        </div>
                    </div>
                    <div className="action_card">
                        <div><RxReload /></div>
                        <div><BiEditAlt /></div>
                        <div><span><MdDeleteOutline /></span>Delete</div>
                    </div>
                </div>
                <div className="info-cards">
                    <div className="card">
                        <div className='top_head'><h3><span><MdWorkHistory /></span>Work Information</h3></div>
                        <div className='contentInformation'>
                        <div>
                                <h4>Department</h4>
                                <p>{employeeData?.department_id|| "N/A"}</p>
                            </div>
                            <div>
                                <h4>Employment Status</h4>
                                <p>{employeeData?.employee_status|| "N/A"}</p>
                            </div>
                            <div>
                                <h4>Date of Joining</h4>
                                <p>{`${new Date(employeeData.joining_date).getDate()}-${new Date(employeeData.joining_date).toLocaleString('en-US', { month: 'short' })}-${new Date(employeeData.joining_date).getFullYear()}`}</p>
                            </div>
                            <div>
                                <h4>Designation</h4>
                                <p>{employeeData?.designation_id|| "N/A"}</p>
                            </div>
                            <div>
                                <h4>Reporting manager</h4>
                                <p>{employeeData?.reporting_manager|| "N/A"}</p>
                            </div>
                            <div>
                                <h4>Source of Hire</h4>
                                <p>{employeeData?.source_of_hire|| "N/A"}</p>
                            </div>
                            <div>
                                <h4>Employee Type</h4>
                                <p>{employeeData?.employment_type|| "N/A"}</p>
                            </div>
                             <div>
                                <h4>Work Mail</h4>
                                <p>{employeeData?.email|| "N/A"}</p>
                            </div>
                            <div>
                                <h4>Date of Exit</h4>
                                <p>{employeeData?.date_of_exit || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className='top_head'><h3><span><MdWorkHistory /></span>Personal Information</h3></div>
                        <div className='contentInformation'>
                        <div>
                                <h4>Employee ID</h4>
                                <p>{employeeData?.employee_id}</p>
                            </div>
                            <div>
                                <h4>Contact Number</h4>
                                <p>{employeeData?.mobile}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{employeeData?.email}</p>
                            </div>
                            <div>
                                <h4>Date of Birth</h4>
                                <p>{`${new Date(employeeData.date_of_birth).getDate()}-${new Date(employeeData.date_of_birth).toLocaleString('en-US', { month: 'short' })}-${new Date(employeeData.date_of_birth).getFullYear()}`}</p>
                            </div>
                            <div>
                                <h4>Age</h4>
                                <p>{employeeData?.age}</p>
                            </div>
                            <div>
                                <h4>Gender</h4>
                                <p>{employeeData?.gender}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-bar">
                    <button className={activeTab === 'experience' ? 'active' : ''} onClick={() => setActiveTab('experience')}>Experience</button>
                    <button className={activeTab === 'education' ? 'active' : ''} onClick={() => setActiveTab('education')}>Education</button>
                    <button className={activeTab === 'documents' ? 'active' : ''} onClick={() => setActiveTab('documents')}>Documents</button>
                </div>
                <div className="contents">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
