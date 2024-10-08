import { useState } from 'react';
// import './DepartmentDetails.scss';
// import Experience from './Experience.jsx';
// import Education from './Education.jsx';
// import Documents from './Documents.jsx';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdWorkHistory } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { BiEditAlt } from "react-icons/bi";
import { TfiClose } from "react-icons/tfi";
import img_emp1 from '../../../assets/emp1.png';
import './DesignationDetails.scss';
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import '../../Employee_onboarding/EmployeeDetail/EmployeeDetails.scss';
const DesignationDetails = () => {
    const [activeTab, setActiveTab] = useState('experience');
    const [employees, setEmployees] = useState([
        { name: "Akash Shinde", Roll: "UI/UX Designer", email: "Akashhrms@gmail.com", phone: "12-Jan-2024", Image: img_emp1, DOB: '2024-08-12' },
        { name: "Ravi Kumar", Roll: "UI/UX Designer", email: "ravikumar@gmail.com", phone: "12-Jan-2024", Image: img_emp1, DOB: '2023-07-11' },
        { name: "Sita Sharma", Roll: "UI/UX Designer", email: "sitasharma@gmail.com", phone: "12-Jan-2024", Image: img_emp1, DOB: '2024-08-12' },
        { name: "Mohan Verma", Roll: "UI/UX Designer", email: "mohanverma@gmail.com", phone: "12-Jan-2024", Image: img_emp1, DOB: '2024-06-15' },
        { name: "New Employee 1", Roll: "UI/UX Designer", email: "newemp1@gmail.com", phone: "12-Jan-2024", Image: img_emp1, DOB: '2024-08-10' },
        { name: "New Employee 2", Roll: "UI/UX Designer", email: "newemp2@gmail.com", phone: "12-Jan-2024", Image: img_emp1, DOB: '2024-08-12' },
        { name: "New Employee 3", Roll: "UI/UX Designer", email: "newemp3@gmail.com", phone: "12-Jan-2024", Image: img_emp1, DOB: '2024-08-18' },
        { name: "New Employee 4", Roll: "UI/UX Designer", email: "newemp4@gmail.com", phone: "12-Jan-2024", Image: img_emp1, DOB: '2024-08-13' },
    ]);
    const navigate = useNavigate();
    const [selectedesignationDetails, setSelectedEditdesignationDetails] = useState(null);
    const getTopNewEmployees = employees.slice(0, 4);

    const handleDepartmentClick3 = (EditUiDesignation) => {
        setSelectedEditdesignationDetails(EditUiDesignation);
    };

    const EditUiDesignation=()=>{
        navigate('/editUidesignation');
    }

    const handleCloseButton = () => {
        // Handle the close button click
        navigate(-1); // Go back to the previous page
    }

    return (
        <div className="profile-page">
            <div className="details">
                <div className="title_top">
                    <h2>Designation Details</h2>
                    <div className='close_btn' onClick={handleCloseButton}><IoMdCloseCircleOutline /></div>
                </div>
                <div className="profile_card">
                    <div className="img_card">
                    <div className="progress-circle" >
                            <img src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" alt="" />
                        </div>
                        <div className="about_user">
                            <h3>UI/UX Designer</h3>
                            <p>UI/UX Designer</p>
                        </div>
                    </div>
                    <div className="action_card">
                        <div><RxReload /></div>
                        <div onClick={() => handleDepartmentClick3(EditUiDesignation)}><BiEditAlt /></div>
                        <div><span><MdDeleteOutline /></span>Delete</div>
                    </div>
                </div>
                <div className="info-cards" id="wholecards">
                    <div className="card">
                        <div className='top_head'>
                            <h3><span><MdWorkHistory /></span>Designation Information</h3>
                        </div>
                        <div className='contentInformation' id="ConTInfoo">
                            <div>
                                <h4>Level</h4>
                                <p>Junior</p>
                            </div>
                            <div>
                                <h4>Required Skills</h4>
                                <p>Wireframing, Prototyping, Visual Design, UX Writing</p>
                            </div>
                            <div>
                                <h4>Reports To</h4>
                                <p>Project Manager</p>
                            </div>
                            <div>
                                <h4>Created By</h4>
                                <p>Mr.Admin</p>
                            </div>
                            <div>
                                <h4>Last Modified By</h4>
                                <p>Akash Shinde</p>
                            </div>
                            <div>
                                <h4>Last Modified Date</h4>
                                <p>16-Apr-2024</p>
                            </div>
                            <div className='respo'>
                                <h4 className="respo-title">Responsibilities</h4>
                                <p>Provide forecasting, reporting, and budgeting support to senior management
                                  
                                       
                                    </p>
                            </div>

                        </div>
                    </div>
                    <div className="card">
                        <div className='top_head'>
                            <h3><span><MdWorkHistory /></span>Employees in Designation</h3>
                        </div>
                        <div className='contentInformation'>
                            <div className="Emp1">
                                {getTopNewEmployees.map((emp, i) => (
                                    <div key={i} className='div_dob1'>
                                        <div className='img_dob_name1'>
                                            <img src={emp.Image} alt={emp.name} />
                                            <div>
                                                <h3 className='empname'>{emp.name}</h3>
                                                <p className='emproll'> {emp.Roll}</p>
                                            </div>
                                        </div>
                                        <p>{emp.phone}</p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesignationDetails;
