import { useState } from 'react';
// import './EmployeeDetails.scss';
// import Experience from './Experience.jsx';
// import Education from './Education.jsx';
// import Documents from './Documents.jsx';
import { IoMdCloseCircleOutline } from "react-icons/io";
// import Img_user from '../../../assets/user.png'
import { MdWorkHistory } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { BiEditAlt } from "react-icons/bi";
// import img_emp1 from '../../../assets/emp1.png';
import img_emp1 from '../../../assets/emp1.png';
import iconEdu from '../../../assets/icons/edu.png'

import { MdDeleteOutline } from "react-icons/md";

import './EmployeeHealthDetails.scss';

const EmployeeHealthDetails = () => {
    const [employees, setEmployees] = useState([
        { name: "Record Date :", Roll: "08-Mar-2024", },
        { name: "Health Check Type :", Roll: "Annual", },
        { name: "Results :", Roll: "Annual", },
        { name: "Doctor/Clinic  :", Roll: "Dr.Satyam Bhosale", },
        { name: "Hospitalizations :", Roll: "Not Yet", },


    ]);
    const [activeTab, setActiveTab] = useState('experience');
    const getTopNewEmployees = employees.slice(0, 4);



    return (
        <div className="profile-page">
            <div className="details">
                <div className="title_top">
                    <h2>EmployeeHealth Details</h2>
                    <div className='close_btn'><IoMdCloseCircleOutline /></div>
                </div>
                <div className="profile_card">
                    <div className="img_card">
                        <div className="progress-circle" >
                            <img src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" alt="" />
                        </div>
                        <div className="about_user">
                            <h3>Akash Shinde</h3>
                            <p>Web Developer / Full-Time</p>
                            <div><h4></h4> <h5>Active</h5></div>
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
                        <div className='top_head'> <h3> <span><MdWorkHistory /></span>Employee Information</h3></div>
                        <div className='contentInformation'>
                      
                                <div>
                                    <h4>Department</h4>
                                    <p>Research & Development</p>
                                </div>
                                <div>
                                    <h4>Overall Health Status</h4>
                                    <p>Excellent</p>
                                </div>
                                <div>
                                    <h4>Last Health Check Date</h4>
                                    <p>04-Apr-2024</p>
                                </div>
                                <div>
                                    <h4>Next Health Check Date</h4>
                                    <p>25-Mar-2024</p>
                                </div>
                                <div>
                                    <h4>Allergies</h4>
                                    <p>-</p>
                                </div>
                                <div>
                                    <h4>Chronic Conditions</h4>
                                    <p>-</p>
                                </div>

                                <div>
                                    <h4>Notes</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur. Neque dui ipsumsectetur. Neque dui ipsum</p>
                                </div>
                            </div>
                       
                    </div>
                    <div className="card">
                        <div className='top_head'> <h3> <span><MdWorkHistory /></span>Health Information</h3></div>
                        <div className="card">

                            <div className="card">

                                <div className='contentInformation'>
                                    <div className="Emp00">
                                        {getTopNewEmployees.map((emp, i) => (
                                            <div key={i} className='div_dob00'>
                                                <div className='img_dob_name00'>

                                                    <div>
                                                        <h3 className='empname00'>{emp.name}</h3>
                                                        <p className='roll' id="emproll00"> {emp.Roll}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* Personal information content */}
                    </div>
                </div>


                {/* <div className="content">
                    {renderContent()}
                </div> */}
            </div>
        </div>
    );
};

export default EmployeeHealthDetails;
