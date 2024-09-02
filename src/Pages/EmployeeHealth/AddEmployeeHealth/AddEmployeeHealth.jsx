import { useState } from 'react';
// import './AddEmloyee.scss';
// import './NavbarForm.scss';
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { GrCloudUpload } from "react-icons/gr";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
// import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import './AddEmployeeHealth.scss';

import { IoMdCloseCircleOutline } from "react-icons/io";
 

import { HiUserPlus } from "react-icons/hi2";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdAdd, IoIosCloseCircleOutline } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { PiCheckSquare } from "react-icons/pi";
import { GiBackstab, GiNotebook } from "react-icons/gi";
import { FaPersonWalkingArrowLoopLeft, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { BiRevision } from "react-icons/bi";
import { IoFilterSharp, IoSearchSharp } from "react-icons/io5";
import { TiArrowUnsorted } from "react-icons/ti";
import { MdDateRange } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";




const AddEmployeeHealth = ({ onSubmit }) => {
    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [inconSelect, setInconSelect] = useState(false)
    const navigate = useNavigate();
    const [hidImport, setHidImport] = useState(true);
    const [formData, setFormData] = useState({
        employeeId: '',
        department: '',
        gender: '',
        EmergencyContactNumber: '',
        EmergencyContactName: '',
        bloodgroup:'',
        healthcheckresult:'',
        coviedeffected:''
    });

    const [dropdowns, setDropdowns] = useState({
        gender: false,
        weight: false,
        Height: false,
        Allergies: false,
        ChronicConditions: false,
        CurrentMedications: false,
        LastHealthCheckupDate: false,
        NextScheduledCheckUpDate: false,
        HealthCheckResults: false,
        COVIDAffected: false,
        COVIDVaccinationStatus: false,
        ShareCOVIDTestResults: false,

    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setIsUploaded(true);
            setFormData(prevState => ({
                ...prevState,
                photo: file
            }));
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        setFormData({
            employeeId: '',
            department: '',
            gender: '',
            EmergencyContactNumber: '',
            EmergencyContactName: '',

        });
    };

    const toggleDropdown = (dropdown) => {
        setDropdowns(prevState => ({
            ...prevState,
            [dropdown]: !prevState[dropdown]
        }));
    };

    const selectOption = (dropdown, value) => {
        setFormData(prevState => ({
            ...prevState,
            [dropdown]: value
        }));
        setDropdowns(prevState => ({
            ...prevState,
            [dropdown]: false
        }));
    };

    const handleHidImport = () => {
        setHidImport(!hidImport);
    };
    
    const AddEmployeeHealthDetails=()=>{
        navigate('/employeehealthdetails');
    }


    const handleCloseButton1 = () => {
        // Handle the close button click
        navigate(-1); // Go back to the previous page
    }
    return (
        <>
            <div className="" >
            <div className="EmpOn_main_container">
                    <div className="EmpOn_header">
                        <div className="top-bar">
                            <h2 className='headerline'>
                                <div className='span'><HiUserPlus /></div>
                                Edit UI Designer Designation
                            </h2>
                            <div className="Emp_Head_Right">
                             
                                 <div className='close_btn' id='closebtn22' onClick={handleCloseButton1}>
                                 <IoMdCloseCircleOutline />
                    </div>
                            </div>
                            <div className="_div">
                                <span className="1"></span>
                                <span className="2"></span>
                                <span className="3"></span>
                                <span className="4"></span>
                                <span className="5"></span>
                                <span className="6"></span>
                                <span className="7"></span>
                                <span className="8"></span>
                                <span className="9"></span>
                                <span className="10"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <form >
                    <div className='info1'> <h2>Personal Information</h2></div>
               

                    <div className="from1" id="personalnfo">
                      
                        <div className="form-group">

                            <label style={{color:"red"}}>Employee Name *</label>
                            <div className="form-group">
                        
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('employeeId')}>
                                    <div style={{color:"rgb(202 201 201)"}}>{formData.department || "Choose Employee"}</div>
                                    <span id='toggle_selectIcon'> {!dropdowns.employeeId ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>

                                </div>
                                {dropdowns.employeeId && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('employeeId', '')}></div>
                                        <div className="dropdown-item" onClick={() => selectOption('employeeId', '')}></div>
                                        <div className="dropdown-item" onClick={() => selectOption('employeeId', '')}></div>
                                    </div>
                                )}
                            </div>

                        </div>
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <div className="form-group">
                        
                        <div className="dropdown">
                            <div className="dropdown-button" onClick={() => toggleDropdown('department')}>
                                <div style={{color:"rgb(202 201 201)"}}>{formData.department || "Choose Department"}</div>
                                <span id='toggle_selectIcon'> {!dropdowns.department ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>

                            </div>
                            {dropdowns.department && (
                                <div className="dropdown-menu">
                                    <div className="dropdown-item" onClick={() => selectOption('department', '')}></div>
                                    <div className="dropdown-item" onClick={() => selectOption('department', '')}></div>
                                    <div className="dropdown-item" onClick={() => selectOption('department', '')}></div>
                                </div>
                            )}
                        </div>

                    </div>
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <div className="form-group">
                        
                        <div className="dropdown">
                            <div className="dropdown-button" onClick={() => toggleDropdown('gender')}>
                                <div style={{color:"rgb(202 201 201)"}}>{formData.department || "Male"}</div>
                                <span id='toggle_selectIcon'> {!dropdowns.gender ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>

                            </div>
                            {dropdowns.gender && (
                                <div className="dropdown-menu">
                                    <div className="dropdown-item" onClick={() => selectOption('gender', '')}></div>
                                    <div className="dropdown-item" onClick={() => selectOption('gender', '')}></div>
                                    <div className="dropdown-item" onClick={() => selectOption('gender', '')}></div>
                                </div>
                            )}
                        </div>

                    </div>
                        </div>
                       
                        <div className="form-group">
                            <label>Emergency Contact Number</label>
                            <input
                                type="text"
                                name="dob"
                                  placeholder="Emergency Contact Number"
                                value={formData.EmergencyContactNumber}
                                onChange={handleChange}
                                required
                                style={{color:"rgb(202 201 201)"}}
                            />
                        </div>
                        <div className="form-group">
                            <label>Emergency Contact Name</label>
                            <input
                                type="number"
                                placeholder="Emergency Contact Name"
                                name="age"
                                value={formData.EmergencyContactName}
                                onChange={handleChange}
                                required
                                style={{color:"rgb(202 201 201)"}}
                            />
                        </div>

                    </div>
                    <div className='info2'>
                        <h2>Health Information</h2>
                    </div>
                    <div className="from1 form2" id="healinfo">


                        <div className="form-group">
                            <label style={{color:"red"}}>Blood Group*</label>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('bloodgroup')}>
                                    <div  style={{color:"rgb(202 201 201)"}}>{formData.bloodgroup || "Select department"}</div>
                                    <span id='toggle_selectIcon'> {!dropdowns.department ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>

                                </div>
                                {dropdowns.bloodgroup && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('bloodgroup', '')}></div>
                                        <div className="dropdown-item" onClick={() => selectOption('bloodgroup', '')}></div>
                                        <div className="dropdown-item" onClick={() => selectOption('bloodgroup', '')}></div>
                                    </div>
                                )}
                            </div>

                        </div>
                       
                        <div className="form-group">
                            <label>weight</label>
                            <input
                            placeholder='Enter Weight'
                                type="number"
                                name="doj"
                                value={formData.weight}
                                onChange={handleChange}
                                required
                                style={{color:"rgb(202 201 201)"}}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Height</label>
                            <input
                            placeholder='Enter Height'
                                type="number"
                                name="doj"
                                value={formData.height}
                                onChange={handleChange}
                                required
                                style={{color:"rgb(202 201 201)"}}
                            />
                        </div>
                        <div className="form-group">
                            <label>Allergies</label>
                            <input
                            placeholder='Enter Allergies '
                                type="text"
                                name="doj"
                                value={formData.Allergies}
                                onChange={handleChange}
                                required
                                style={{color:"rgb(202 201 201)"}}
                            />
                        </div>
                        <div className="form-group">
                            <label>Chronic Conditions</label>
                            <input
                            placeholder='Enter Chronic Conditions'
                                type="type"
                                name="doj"
                                value={formData.ChronicConditions}
                                onChange={handleChange}
                                required
                                style={{color:"rgb(202 201 201)"}}
                            />
                        </div>
                        <div className="form-group">
                            <label>Current Medications</label>
                            <input
                                type="type"
                                placeholder='Enter Current Medications'
                                name="doj"
                                value={formData.CurrentMedications}
                                onChange={handleChange}
                                required
                                style={{color:"rgb(202 201 201)"}}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Health Checkup Date</label>
                            <input
                                type="date"
                                name="doj"
                                 placeholder='Choose Date'
                                value={formData.LastHealthCheckupDate}
                                onChange={handleChange}
                                required
                                style={{color:"rgb(202 201 201)"}}
                            />
                        </div>
                        <div className="form-group">
                            <label>Next Scheduled Check-Up Date</label>
                            <input
                                type="date"
                                placeholder='Choose Date'
                                name="doj"
                                value={formData.NextScheduledCheckUpDate}
                                onChange={handleChange}
                                required
                                style={{color:"rgb(202 201 201)"}}
                            />
                        </div>
                        <div className="form-group">
                            <label>Health Check Results</label>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('healthcheckresult')}>
                                    <div  style={{color:"rgb(202 201 201)"}}>{formData.healthcheckresult || "Choose result"}</div>
                                    <span id='toggle_selectIcon'> {!dropdowns.healthcheckresult ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>

                                </div>
                                {dropdowns.healthcheckresult && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('healthcheckresult', 'Management')}></div>
                                        <div className="dropdown-item" onClick={() => selectOption('healthcheckresult', 'Development')}></div>
                                        <div className="dropdown-item" onClick={() => selectOption('healthcheckresult', 'HR')}></div>
                                    </div>
                                )}
                            </div>


                        </div>
                        <div className="form-group">
                            <label style={{color:"red"}}>COVID Affected*</label>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('coviedeffected')}>
                                    <div  style={{color:"rgb(202 201 201)"}}>{formData.department || "No"}</div>
                                    <span id='toggle_selectIcon'> {!dropdowns.coviedeffected ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>

                                </div>
                                {dropdowns.coviedeffected && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('coviedeffected', 'Yes')}>Yes</div>
                                        <div className="dropdown-item" onClick={() => selectOption('coviedeffected', 'No')}>No</div>

                                    </div>
                                )}
                            </div>


                        </div>
                        <div className="form-group">
                            <label>COVID Vaccination Status</label>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('department')}>
                                    <div  style={{color:"rgb(202 201 201)"}}>{formData.department || "1 st dose"}</div>
                                    <span id='toggle_selectIcon'> {!dropdowns.department ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>

                                </div>
                                {dropdowns.department && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('department', '1 st dose')}>1 st dose</div>
                                        <div className="dropdown-item" onClick={() => selectOption('department', '2 nd dose')}>2 nd dose</div>
                                        <div className="dropdown-item" onClick={() => selectOption('department', 'Both')}> Both</div>
                                    </div>
                                )}
                            </div>


                        </div>


                        <div className="form-group">
                            <label>Share COVID Test Results</label>
                            <div className="file-upload">
                                <input
                                    type="file"
                                    name='photo'
                                    accept="image/*"
                                    id="file"
                                    onChange={handleFileChange}
                                    required
                                    style={{color:"rgb(202 201 201)"}}
                                />
                                <label htmlFor="file" className="custom-file-upload">
                                    {!isUploaded && <GrCloudUpload size={20} />}
                                    <span>{isUploaded ? fileName : 'Uploaddocument'}</span>
                                </label>
                            </div>
                        </div>
      
                    </div>
                    <div id='submitBtn_next_main'>
                        <div id='submitBtn' >
                            <div className='div'>
                                <button type="submit" onClick={AddEmployeeHealthDetails}>Submit </button>
                                <span><CiCircleChevRight /></span>
                            </div>
                            <div className="lineBar"></div>
                            <div className='x'>
                                <span> <TfiClose /></span>
                            </div>
                        </div>
                        <div className="form">
                            <p>Next Page</p>
                            <span className='not_active'><IoIosArrowDropleft /></span>
                            <button type='submit'><IoIosArrowDropright /></button>
                        </div>
                    </div>
                </form>

            </div>

        </>
    );
};
export default AddEmployeeHealth;