import { useState, useEffect } from 'react';
import '../../Employee_onboarding/AddEmployee/AddEmloyee.scss';
import '../../Employee_onboarding/AddEmployee/NavbarForm.scss';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { GrCloudUpload } from "react-icons/gr";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addJobForm } from '../../../slices/jobSlice';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const JobUpdateForm = ({ onSubmit }) => {
    const { id } = useParams(); // Get the job ID from the URL

    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.job.jobs);

    const [sms, setSms] = useState('')

    const [showAlert, setShowAlert] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);



    console.log('jobRRR', jobs)
    const [formData, setFormData] = useState({
        jobTitle: '',
        designation: '',
        department: '',
        jobLocation: [],
        jobStatus: '',
        noOfPositions: '',
        employmentType: '',
        experience: '',
        requiredSkills: '',
        description: ''
    });

    const [dropdowns, setDropdowns] = useState({
        designation: false,
        department: false,
        jobStatus: false,
        employmentType: false,
        experience: false,
        requiredSkills: false
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (event) => {
        const { value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            jobLocation: [value]
        }));
    };

    //  filter search
    const [searchQueryEmploymentType, setSearchQueryEmploymentType] = useState('');
    const [searchQueryDepartment, setSearchQueryDepartment] = useState('');
    const [searchQueryDesignation, setSearchQueryDesignation] = useState('');
    const [searchQueryRequiredSkills, setSearchQueryRequiredSkills] = useState('');

    // filter search

    const token = localStorage.getItem('access_token');

    const handleSubmit = (event) => {
        event.preventDefault();  // Prevent default form submission

        axios.post(`https://devstronauts.com/public/api/jobopening/create/update`,
            {
                id: id,  // Replace this with dynamic if needed
                job_title: formData.jobTitle,
                department: formData.department,
                designation: formData.designation,
                job_location: formData.jobLocation.join(', '),
                job_status: formData.jobStatus,
                no_of_position: formData.noOfPositions,
                employee_type: formData.employmentType,
                experience: formData.experience,
                skills: formData.requiredSkills,
                description: formData.description,
            }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

            .then(response => {
                console.log('Job Data Updated successfully **:', response);
                setSms('Updated Job successfully')

                // alert(error)
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false)
                }, 4000);

                // Clear the form after successful submission
                setFormData({
                    jobTitle: '',
                    designation: '',
                    department: '',
                    jobLocation: [],
                    jobStatus: '',
                    noOfPositions: '',
                    employmentType: '',
                    experience: '',
                    requiredSkills: '',
                    description: ''
                });
            })
            .catch(error => {
                console.error('Error:', error.message);
                const er = error.message
                setSms(`${er}`)
                // alert(error)
                setShowAlertError(true)
                setTimeout(() => {
                    setShowAlertError(false)
                }, 4000);
            });
    };

   


    const toggleDropdown = (dropdown) => {
        // Reset all dropdowns to false, then toggle the selected one
        setDropdowns({
            designation: false,
            department: false,
            jobStatus: false,
            employmentType: false,
            experience: false,
            requiredSkills: false,
            [dropdown]: !dropdowns[dropdown]
        });
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

    // get
    // Fetch job data on component mount
    useEffect(() => {
        axios.post(`https://devstronauts.com/public/api/jobopening/list`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                // const jobData = response.data;
                const jobData = response.data.job_opening.find(job => job.id == id);

                setFormData({
                    jobTitle: jobData.job_title,
                    designation: jobData.designation,
                    department: jobData.department,
                    jobLocation: jobData.job_location.split(', '),
                    jobStatus: jobData.job_status,
                    noOfPositions: jobData.no_of_position,
                    employmentType: jobData.employee_type,
                    experience: jobData.experience,
                    requiredSkills: jobData.skills,
                    description: jobData.description
                });
                console.log('setFormData', formData)
                console.log('response', response)
            })
            .catch(error => {
                console.error('Error fetching job data:❗', error);
            });
    }, [id, token]);
    // 

    // filter search

    const handleSearchQueryChangeEmploymentType = (e) => setSearchQueryEmploymentType(e.target.value);
    const handleSearchQueryChangeDepartment = (e) => setSearchQueryDepartment(e.target.value);
    const handleSearchQueryChangeDesignation = (e) => setSearchQueryDesignation(e.target.value);
    const handleSearchQueryChangeRequiredSkills = (e) => setSearchQueryRequiredSkills(e.target.value);

    const employmentTypeOptions = [
        'Part-time', 'Full-time', 'Consultant', 'Permanent', 'On Contract', 'Intern', 'Trainee'
    ];

    const requiredSkillsOptions = [
        'Communication Skills', 'Software Development', 'Leadership Skills', 'Team Collaboration',
        'Problem Solving', 'Project Management', 'Data Analysis'
    ];

    const filteredRequiredSkillsOptions = requiredSkillsOptions.filter(option =>
        option.toLowerCase().includes(searchQueryRequiredSkills.toLowerCase())
    );
    const filteredEmploymentTypeOptions = employmentTypeOptions.filter(option =>
        option.toLowerCase().includes(searchQueryEmploymentType.toLowerCase())
    );

    // filter search

    return (
        <>
            <div className="" onSubmit={onSubmit}>
                {showAlert ? <div> <div id='showAlert' ><p> {sms}</p></div> </div> : ''}
                {showAlertError ? <div> <div id='showAlertError' ><p>{sms}</p></div> </div> : ''}

                <form onSubmit={handleSubmit}>
                    <div id='form'>
                        <div className="from1">
                            <div className="form-group">
                                <label className='starred'>Job Title*</label>
                                <input
                                    type="text"
                                    placeholder="Enter Job title"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    required
                                />
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
                                            <input
                                                type="search"
                                                className='search22'
                                                placeholder="Search designation"
                                                value={searchQueryDesignation}
                                                id='searchDepartmentHead'
                                                onChange={handleSearchQueryChangeDesignation}
                                            />
                                            <div className="dropdown_I">
                                                {['Administration', 'Developer', 'Manager'].filter(option =>
                                                    option.toLowerCase().includes(searchQueryDesignation.toLowerCase())
                                                ).map(option => (
                                                    <div className="dropdown-item" onClick={() => selectOption('designation', option)} key={option}>
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

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
                                            <input
                                                type="search"
                                                className='search22'
                                                placeholder="Search department"
                                                value={searchQueryDepartment}
                                                id='searchDepartmentHead'

                                                onChange={handleSearchQueryChangeDepartment}
                                            />
                                            <div className="dropdown_I">
                                                {['Management', 'Development', 'HR'].filter(option =>
                                                    option.toLowerCase().includes(searchQueryDepartment.toLowerCase())
                                                ).map(option => (
                                                    <div className="dropdown-item" onClick={() => selectOption('department', option)} key={option}>
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Job Location Checkboxes */}
                            <div className="form-group" >
                                <label>Job Location*</label>
                                <div id='checkbox' className='checkbox'>
                                    <div className='checkboxDivJob'>
                                        <input
                                            type="checkbox"
                                            value="In Office"
                                            name="JobLocation"
                                            checked={formData.jobLocation.includes("In Office")}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className='checkboxLable'> In Office </label>
                                    </div>
                                    <div className='checkboxDivJob'>
                                        <input
                                            type="checkbox"
                                            value="Hybrid"
                                            name='JobLocation'
                                            checked={formData.jobLocation.includes("Hybrid")}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className='checkboxLable'> Hybrid</label>
                                    </div>
                                    <div className='checkboxDivJob'>
                                        <input
                                            type="checkbox"
                                            value="Remote"
                                            name="JobLocation"
                                            checked={formData.jobLocation.includes("Remote")}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className='checkboxLable' > Remote</label>
                                    </div>
                                </div>
                            </div>

                            {/* Job Status Dropdown */}
                            <div className="form-group">
                                <label>Job Status*</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" onClick={() => toggleDropdown('jobStatus')}>
                                        <div>{formData.jobStatus || "Select Job Status"}</div>
                                        <span id='toggle_selectIcon'> {!dropdowns.jobStatus ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                    </div>

                                    {dropdowns.jobStatus && (
                                        <div className="dropdown-menu">
                                            <div className="dropdown-item" onClick={() => selectOption('jobStatus', 'Open')}>Open</div>
                                            <div className="dropdown-item" onClick={() => selectOption('jobStatus', 'Draft')}>Draft</div>
                                            <div className="dropdown-item" onClick={() => selectOption('jobStatus', 'Filled')}>Filled</div>
                                            <div className="dropdown-item" onClick={() => selectOption('jobStatus', 'Cancelled')}>Cancelled</div>
                                            <div className="dropdown-item" onClick={() => selectOption('jobStatus', 'On Hold')}>On Hold</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>No. of Positions*</label>
                                <input
                                    type="number"
                                    placeholder="Enter No. of Positions"
                                    name="noOfPositions"
                                    value={formData.noOfPositions}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Employment Type Dropdown */}
                            <div className="form-group">
                                <label>Employment Type</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" onClick={() => toggleDropdown('employmentType')}>
                                        <div>{formData.employmentType || "Select employment type"}</div>
                                        <span id='toggle_selectIcon'>
                                            {!dropdowns.employmentType ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                        </span>
                                    </div>
                                    {dropdowns.employmentType && (
                                        <div className='dropdown-menu'>
                                            <input
                                                type="search"
                                                className='search22'
                                                placeholder="Search employment type"
                                                value={searchQueryEmploymentType}
                                                onChange={handleSearchQueryChangeEmploymentType}
                                                id='searchDepartmentHead'

                                            />
                                            <div className="dropdown_I">
                                                {filteredEmploymentTypeOptions.map(option => (
                                                    <div
                                                        key={option}
                                                        className="dropdown-item"
                                                        onClick={() => selectOption('employmentType', option)}
                                                    >
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Experience*</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" onClick={() => toggleDropdown('experience')}>
                                        <div>{formData.experience || "Select Experience"}</div>
                                        <span id='toggle_selectIcon'> {!dropdowns.experience ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                    </div>

                                    {dropdowns.experience && (
                                        <div className="dropdown-menu">
                                            <div className="dropdown-item" onClick={() => selectOption('experience', 'Fresher')}>Fresher</div>
                                            <div className="dropdown-item" onClick={() => selectOption('experience', 'Experienced')}>Experienced</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Required Skills*</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" onClick={() => toggleDropdown('requiredSkills')}>
                                        <div>{formData.requiredSkills || "Select Required Skills"}</div>
                                        <span id='toggle_selectIcon'>
                                            {!dropdowns.requiredSkills ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                        </span>
                                    </div>

                                    {dropdowns.requiredSkills && (
                                        <div className="dropdown-menu">
                                            <input
                                                type="search"
                                                className='search22'
                                                id='searchDepartmentHead'
                                                placeholder="Search skills"
                                                value={searchQueryRequiredSkills}
                                                onChange={handleSearchQueryChangeRequiredSkills}
                                            />
                                            <div className="dropdown_I">
                                                {filteredRequiredSkillsOptions.map(option => (
                                                    <div
                                                        key={option}
                                                        className="dropdown-item"
                                                        onClick={() => selectOption('requiredSkills', option)}
                                                    >
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                        <div id='Description' className='DescriptionJob'>
                            <div className="form-group">
                                <label>Description*</label>
                                <textarea
                                    placeholder="Enter Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
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

export default JobUpdateForm;
// 