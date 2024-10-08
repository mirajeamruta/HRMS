import { useState } from 'react';
import './DepartmentDetails.scss';
// import Experience from '../../Employee onboarding/EmployeeDetail/Experience.jsx';
// import Education from '../../Employee onboarding/EmployeeDetail/Education.jsx';
// import Documents from '../../Employee onboarding/EmployeeDetail/Documents.jsx';
// import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";
// import Img_user from '../../../assets/user.png'
import { MdWorkHistory } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { BiEditAlt } from "react-icons/bi";
import img_emp1 from '../../../assets/emp1.png';
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { MdDeleteOutline } from "react-icons/md";
import iconEdu from '../../../assets/icons/edu.png'
import { useNavigate } from 'react-router-dom';
const DepartmentDetails = () => {
    const [employees, setEmployees] = useState([
        { name: "Akash Shinde", Roll: "Lead Design",  phone: "9876896754", Image: img_emp1, },
        { name: "Ravi Kumar", Roll: "Senior UI/UX Designer",  phone: "9876896754", Image: img_emp1,  },
        { name: "Sita Sharma", Roll: "UX Writer",  phone: "9876896754", Image: img_emp1, },
        { name: "Mohan Verma", Roll: "Visual Designer",  phone: "9876896754", Image: img_emp1,  },
      
    ]);
    const [activeTab, setActiveTab] = useState('experience');
    const getTopNewEmployees = employees.slice(0, 4);


    const navigate = useNavigate();

    const handleCloseButton1 = () => {
        // Handle the close button click
        navigate(-1); // Go back to the previous page
    }


    return (
        <div className="profile-page">
            <div className="details">
                <div className="title_top">
                    <h2>Department Details</h2>
                    <div className='close_btn' onClick={handleCloseButton1}>
                        <IoMdCloseCircleOutline /></div>
                </div>
                <div className="profile_card">
                    <div className="img_card">
                        <div className="progress-circle" >
                            <img src="https://w7.pngwing.com/pngs/564/690/png-transparent-computer-icons-web-browser-new-job-hand-business-silhouette-thumbnail.png" alt="" />
                        </div>
                        <div className="about_user">
                            <h3>UI/UX Designer</h3>
                            <p>UI/UX Designer</p>

                        </div>
                    </div>
                    <div className="action_card">
                        <div><RxReload /></div>
                        <div><BiEditAlt /></div>
                        <div><span><MdDeleteOutline /></span>Delete</div>
                    </div>
                </div>
                <div className="info-cards" style={{ paddingBottom: '30px' }}>
                    <div className="card" id="DepINfo">
                        <div className='top_head'> <h3> <span><MdWorkHistory /></span>Department Information</h3></div>
                        {/* <div className='contentInformation'>
                            <div>
                                <h4>Department</h4>
                                <p>Research & Development</p>
                            </div>
                            <div>
                                <h4>Designation</h4>
                                <p>Engineer</p>
                            </div>
                            <div>
                                <h4>Required Experience</h4>
                                <p>Mid Level</p>
                            </div>
                            <div>
                                <h4>Job Location</h4>
                                <p>Office</p>
                            </div>
                            <div>
                                <h4>No. Of Positions</h4>
                                <p>10</p>
                            </div>
                            <div>
                                <h4>Employee Type</h4>
                                <p>Permanent-Full time</p>
                            </div>
                            <div>
                                <h4>Required Skills</h4>
                                <p>PHP, Laravel, Java</p>
                            </div>
                            <div>
                                <h4>Created By</h4>
                                <p>Mr.Admin</p>
                            </div>
                            <div>
                                <h4>Creation At</h4>
                                <p>12-Apr-2024</p>
                            </div>
                        </div> */}
                        <div className='contentInformation'>
                            <div>
                                <h4>Department Code</h4>
                                <p>DP-001</p>
                            </div>
                            <div>
                                <h4>Department Head</h4>
                                <p>Mr. Arman Wagh</p>
                            </div>
                            <div>
                                <h4>Location</h4>
                                <p>Office Building</p>
                            </div>
                            <div>
                                <h4>Parent Department</h4>
                                <p>Web Development</p>
                            </div>
                            <div>
                                <h4>Sub Department</h4>
                                <p>-</p>
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
                                <p>02-Jan-2024</p>
                            </div>
                            <div>
                                <h4>Created Date</h4>
                                <p>01-Jan-2024</p>
                            </div>
                            <div id='DescriptionJOB'>
                                <h4>Description</h4>
                                <p className='paragra'>Lorem ipsum dolor sit amet consectetur. Ultrices nunc at sollicitudin leo nunc 
                                Lorem ipsum dolor sit amet consectetur.  
                                   </p>
                            </div>
                        </div>
                        {/* <div className='empcont'>
                        <input 
                        type="text" 
                        placeholder="Employee Contact" 
                        id="tagbox"
                    />
                    </div> */}
                    </div>
                    <div className="card" id="imagecard">
                        <div className='top_head'> <h3> <span><MdWorkHistory /></span>Employees in Department</h3></div>


                        <div className='contentInformation' id="infoooo">
                            <div className="Emp22" id="depart999">
                                {getTopNewEmployees.map((emp, i) => (
                                    <div key={i} className='div_dob22'>
                                        <div className='img_dob_name22'>
                                            <img src={emp.Image} alt={emp.name} />
                                            <div className='totaldata'>
                                                <h3 className='empname22'>{emp.name}</h3>
                                                <p className='emproll22' id='dateofemppo'> {emp.Roll}</p>
                                            </div>
                                        </div>
                                        <p style={{color:"gray"}}>{emp.phone}</p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    

                    <div>
                   
                    </div>
                    {/* Personal information content */}

                </div>

                {/* <div className="info-cards">
                    <div className="card" id="departmentcard">
                        <div className='top_head'> <h3> <span><MdWorkHistory /></span>Department Information</h3></div>
                        <div className='contentInformation'>
                            <div>
                                <h4>Department Code</h4>
                                <p>DP-001</p>
                            </div>
                            <div>
                                <h4>Department Head</h4>
                                <p>Mr. Arman Wagh</p>
                            </div>
                            <div>
                                <h4>Location</h4>
                                <p>Office Building</p>
                            </div>
                            <div>
                                <h4>Parent Department</h4>
                                <p>Web Development</p>
                            </div>
                            <div>
                                <h4>Sub Department</h4>
                                <p>-</p>
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
                                <p>02-Jan-2024</p>
                            </div>
                            <div>
                                <h4>Created Date</h4>
                                <p>01-Jan-2024</p>
                            </div>
                            <div id='DescriptionJOB'>
                               <h4>Description</h4>
                                <p>Lorem ipsum dolor sit amet consectetur. Ultrices nunc at sollicitudin leo nunc lorem ac tellus gravida. 
                                    Tellus eu tortor lectus nulla vel egestas massa viverra.</p>
                            </div>
                        </div>
                    </div>
                    <div className="card" id="emplooo">
                        <div className='top_head'> <h3> <span><MdWorkHistory /></span>Employees in Department</h3></div>
                        <div className="card">
                       
                        <div className='contentInformation' id="infoooo">
                            <div className="Emp22">
                                {getTopNewEmployees.map((emp, i) => (
                                    <div key={i} className='div_dob22'>
                                        <div className='img_dob_name22'>
                                            <img src={emp.Image} alt={emp.name} />
                                            <div className='totaldata'>
                                                <h3 className='empname22'>{emp.name}</h3>
                                                <p className='emproll22' id='dateofemppo'> {emp.Roll}</p>
                                            </div>
                                        </div>
                                        <p>{emp.phone}</p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    </div>
                </div> */}
                <div className="prjecttab" id="tableforlist">
                    <div className="section-header">
                        {/* <FaGraduationCap className="icon" /> */}
                        <img src={iconEdu} alt="" className='icon' />
                        <h2>Project List</h2>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>PROJECT NAME</th>
                                <th>PROJECT MANAGER</th>
                                <th>CONTACT</th>
                                <th>CREATED DATE</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>E-commerce Website Redesign</td>
                                <td>Abha Patel</td>

                                <td>919555502041</td>
                                <td>12/06/2020</td>
                                <td>Completed</td>
                            </tr>
                            <tr>
                                <td>Learning Platform Development</td>
                                <td>Adarsh Pal</td>

                                <td>919555502041</td>
                                <td>12/06/2020</td>
                                <td>Completed</td>
                            </tr>
                            <tr>
                                <td>Marketing Campaign</td>
                                <td>Akanksha Tewatia</td>

                                <td>919555502041</td>
                                <td>12/06/2020</td>
                                <td>Completed</td>
                            </tr>
                            <tr>
                                <td>  User Interface Improvements</td>
                                <td>Abishek Tiwari</td>

                                <td>919555502041</td>
                                <td>12/06/2020</td>
                                <td>Completed</td>
                            </tr>
                            <tr>
                                <td>User Interface Improvements</td>
                                <td>Adri Green</td>

                                <td>919555502041</td>
                                <td>12/06/2020</td>
                                <td>Completed</td>
                            </tr>


                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    );
};

export default DepartmentDetails;
