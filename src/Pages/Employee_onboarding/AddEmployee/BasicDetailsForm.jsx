import { useState } from 'react';
import './AddEmloyee.scss';
import './NavbarForm.scss';
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { GrCloudUpload } from "react-icons/gr";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const BasicDetailsForm = ({ onSubmit }) => {
    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [inconSelect, setInconSelect] = useState(false)

    const [formData, setFormData] = useState({
        employeeId: '',
        firstName: '',
        lastName: '',
        photo: '',
        dob: '',
        age: '',
        gender: '',
        email: '',
        contactNumber: '',
        reportingManager: '',
        department: '',
        designation: '',
        doj: '',
        maritalStatus: '',
        doe: '',
        employmentType: '',
        employeeStatus: '',
        sourceOfHire: ''
    });

    const [dropdowns, setDropdowns] = useState({
        gender: false,
        reportingManager: false,
        department: false,
        designation: false,
        maritalStatus: false,
        employmentType: false,
        employeeStatus: false,
        sourceOfHire: false
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
            firstName: '',
            lastName: '',
            dob: '',
            age: '',
            gender: '',
            email: '',
            contactNumber: '',
            reportingManager: '',
            department: '',
            designation: '',
            doj: '',
            photo: '',
            maritalStatus: '',
            doe: '',
            employmentType: '',
            employeeStatus: '',
            sourceOfHire: ''
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


    return (
        <>
            <div className="" onSubmit={onSubmit}>
                <form onSubmit={handleSubmit}>
                    <div className="from1">
                        <div className="form-group">
                            <label>Employee ID</label>
                            <input
                                type="text"
                                placeholder="Enter employee id"
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                placeholder="Enter first name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                placeholder="Enter last name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Age</label>
                            <input
                                type="number"
                                placeholder="Enter age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Gender Dropdown */}
                        <div className="form-group">
                            <label>Gender</label>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('gender')}>
                                    <div>{formData.gender || "Select gender"}  </div> 
                                    <span id='toggle_selectIcon'> {!dropdowns.gender ? <IoIosArrowDown /> : <IoIosArrowUp /> } </span>
                                </div>
                                
                                {dropdowns.gender && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('gender', 'Male')}>Male</div>
                                        <div className="dropdown-item" onClick={() => selectOption('gender', 'Female')}>Female</div>
                                        <div className="dropdown-item" onClick={() => selectOption('gender', 'Other')}>Other</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email ID</label>
                            <input
                                type="email"
                                placeholder="Enter email id"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact Number</label>
                            <input
                                type="text"
                                placeholder="Enter contact number"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Reporting Manager Dropdown */}
                        <div className="form-group">
                            <label>Reporting Manager</label>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('reportingManager')}>
                                    <div>{formData.reportingManager || "Select manager"} </div>
                                    <span id='toggle_selectIcon'> {!dropdowns.reportingManager ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                </div>
                                {dropdowns.reportingManager && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('reportingManager', 'Johan Smith')}>Johan Smith</div>
                                        <div className="dropdown-item" onClick={() => selectOption('reportingManager', 'Ram Jain')}>Ram Jain</div>
                                        <div className="dropdown-item" onClick={() => selectOption('reportingManager', 'Yas Pall')}>Yas Pall</div>
                                        <div className="dropdown-item" onClick={() => selectOption('reportingManager', 'Deepak Ji')}>Deepak Ji</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="from1 form2">
                        {/* Department Dropdown */}
                        <div className="form-group">
                            <label>Department</label>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('department')}>
                                    <div>{formData.department || "Select department"}</div>
                                    <span id='toggle_selectIcon'> {!dropdowns.department ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>

                                </div>
                                {dropdowns.department && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('department', 'Management')}>Management</div>
                                        <div className="dropdown-item" onClick={() => selectOption('department', 'Development')}>Development</div>
                                        <div className="dropdown-item" onClick={() => selectOption('department', 'HR')}>HR</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Designation Dropdown */}
                        <div className="form-group">
                            <label>Designation</label>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('designation')}>
                                    <div>{formData.designation || "Select designation"}</div>
                                    <span id='toggle_selectIcon'> {!dropdowns.designation ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>

                                </div>
                                {dropdowns.designation && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('designation', 'Administration')}>Administration</div>
                                        <div className="dropdown-item" onClick={() => selectOption('designation', 'Developer')}>Developer</div>
                                        <div className="dropdown-item" onClick={() => selectOption('designation', 'Manager')}>Manager</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Date of Joining</label>
                            <input
                                type="date"
                                name="doj"
                                value={formData.doj}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Upload Profile Picture</label>
                            <div className="file-upload">
                                <input
                                    type="file"
                                    name='photo'
                                    accept="image/*"
                                    id="file"
                                    onChange={handleFileChange}
                                    required
                                />
                                <label htmlFor="file" className="custom-file-upload">
                                    {!isUploaded && <GrCloudUpload size={20} />}
                                    <span>{isUploaded ? fileName : 'Upload photo'}</span>
                                </label>
                            </div>
                        </div>
                        {/* Marital Status Dropdown */}
                        <div className="form-group">
                            <label>Marital Status</label>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('maritalStatus')}>
                                    <div>{formData.maritalStatus || "Select status"}</div>
                                    <span id='toggle_selectIcon'> {!dropdowns.maritalStatus ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>

                                </div>
                                {dropdowns.maritalStatus && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('maritalStatus', 'Single')}>Single</div>
                                        <div className="dropdown-item" onClick={() => selectOption('maritalStatus', 'Married')}>Married</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Date of Exit</label>
                            <input
                                type="date"
                                name="doe"
                                value={formData.doe}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Employment Type Dropdown */}
                        <div className="form-group">
                            <label>Employment Type</label>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('employmentType')}>
                                    <div>{formData.employmentType || "Select employment type"}</div>
                                    <span id='toggle_selectIcon'> {!dropdowns.employmentType ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                </div>
                                {dropdowns.employmentType && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('employmentType', 'Part-time')}>Part-time</div>
                                        <div className="dropdown-item" onClick={() => selectOption('employmentType', 'Full-time')}>Full-time</div>
                                        <div className="dropdown-item" onClick={() => selectOption('employmentType', 'Consultant')}>Consultant</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Employee Status Dropdown */}
                        <div className="form-group">
                            <label>Employee Status</label>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('employeeStatus')}>
                                    <div>{formData.employeeStatus || "Select status"}</div>
                                    <span id='toggle_selectIcon'> {!dropdowns.employeeStatus ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                </div>
                                {dropdowns.employeeStatus && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('employeeStatus', 'Permanent')}>Permanent</div>
                                        <div className="dropdown-item" onClick={() => selectOption('employeeStatus', 'Probation')}>Probation</div>
                                        <div className="dropdown-item" onClick={() => selectOption('employeeStatus', 'Intern')}>Intern</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Source of Hire Dropdown */}
                        <div className="form-group">
                            <label>Source of Hire</label>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('sourceOfHire')}>
                                    <div>{formData.sourceOfHire || "Select source"}</div>
                                    <span id='toggle_selectIcon'> {!dropdowns.sourceOfHire ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>

                                </div>
                                {dropdowns.sourceOfHire && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('sourceOfHire', 'Referral')}>Referral</div>
                                        <div className="dropdown-item" onClick={() => selectOption('sourceOfHire', 'Direct')}>Direct</div>
                                        <div className="dropdown-item" onClick={() => selectOption('sourceOfHire', 'Campus')}>Campus</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div id='submitBtn_next_main'>
                        <div id='submitBtn' >
                            <div className='div'>
                                <button type="submit" >Submit </button>
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
export default BasicDetailsForm;