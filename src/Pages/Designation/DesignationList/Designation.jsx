import { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import './Designation.scss';

const Designation = () => {
    const [hidImport, setHidImport] = useState(true);
    const [employees, setEmployees] = useState([
        { deptName: "UI Designer", deptHead: "Application Development", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },
        { deptName: "UX Designer", deptHead: "UI/UX Design", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },
        { deptName: "Chief Financial Officer", deptHead: "Game Client", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },
        { deptName: "President", deptHead: "QC", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },
        { deptName: "Chief Operating Officer", deptHead: "Art", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },
        { deptName: "Head of HR", deptHead: "Game Client", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },
        { deptName: "Chief Technology Officer", deptHead: "UI/UX Design", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },
        { deptName: "Director", deptHead: "Backend", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },
        { deptName: "Project Manager", deptHead: "Backend", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },
        { deptName: "Delivery Manager", deptHead: "Game Design", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },


    ]);
    const [filteredEmployees, setFilteredEmployees] = useState(employees);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectAll, setSelectAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isOpen, setIsOpen] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedDepartmentDetails2, setSelectedDepartmentDetails2] = useState(null);
    console.log(selectedDepartment)

    const handleHidImport = () => {
        setHidImport(!hidImport);
    };

    const handleSelectAll = () => {
        const updatedEmployees = filteredEmployees.map(emp => ({
            ...emp,
            isChecked: !selectAll
        }));
        setFilteredEmployees(updatedEmployees);
        setSelectAll(!selectAll);
    };

    const handleCheckboxChange = (index) => {
        const updatedEmployees = [...filteredEmployees];
        updatedEmployees[index].isChecked = !updatedEmployees[index].isChecked;
        setFilteredEmployees(updatedEmployees);
    };

    const indexOfLastEmployee = currentPage * rowsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };


    const handleFilterChange = (e) => {
        setSelectedDepartment(e.target.value);
        let updatedEmployees = employees;

        if (searchQuery) {
            updatedEmployees = updatedEmployees.filter(emp =>
                emp.deptHead.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.phone.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedDepartment !== 'All') {
            updatedEmployees = updatedEmployees.filter(emp => emp.department === selectedDepartment);
        }

        if (selectedStatus !== 'All') {
            updatedEmployees = updatedEmployees.filter(emp => emp.status === selectedStatus);
        }

        setFilteredEmployees(updatedEmployees);
    };



    const handleRefresh = () => {
        setFilteredEmployees(employees);
        setSearchQuery('');
        setSelectedDepartment('All');
        setSelectedStatus('All');
        setCurrentPage(1);
        setRowsPerPage(10);
    };
    // 
    const [showFilter, setShowFilter] = useState(false);
    const [showCustomDate, setShowCustomDate] = useState(false);
    const [showEmploymentType, setShowEmploymentType] = useState(false);
    const [showDepartment, setShowDepartment] = useState(false);

    const showFilterHandle = () => {
        setShowFilter(!showFilter)
    }
    const handleCustomDateClick = () => {
        setShowCustomDate(!showCustomDate);
        setShowEmploymentType(false);
        setShowDepartment(false);
    };

    const handleEmploymentTypeClick = () => {
        setShowEmploymentType(!showEmploymentType);
        setShowCustomDate(false);
        setShowDepartment(false);
    };

    const handleDepartmentClick = () => {
        setShowDepartment(!showDepartment);
        setShowCustomDate(false);
        setShowEmploymentType(false);
    };

    const handleAddDesginationClick = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleDesignationclick2 = (designation) => {
        setSelectedDepartmentDetails2(designation);
    };
    const navigate = useNavigate();

    const DesignationDetails = () => {
        navigate('/designationdeatils');
    }



    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        jobOpening: '',
        resume: '',
        coverLetter: '',
        country: '',
        state: '',
        city: '',
        zipCode: '',
        source: '',
        availabilityDate: '',
        expectedSalary: '',
        referredPerson: ''
    });
    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files[0] ? files[0].name : ''
        }));
    };
    const [dropdowns, setDropdowns] = useState({
        department: false
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate if file input is provided
        // if (!formData.resume || !formData.coverLetter) {
        //     alert("Please upload both Resume and Cover Letter");
        //     return;
        // }

        console.log("add-applicant Form Data:", formData);

        // Reset form after submission
        setFormData({
            fullName: '',
            email: '',
            contactNumber: '',
            jobOpening: '',
            resume: '',
            coverLetter: '',
            country: '',
            state: '',
            city: '',
            zipCode: '',
            source: '',
            availabilityDate: '',
            expectedSalary: '',
            referredPerson: ''
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
        <div>
            <div className="EmpOn_main_container">
                <div className="EmpOn_header">
                    <div className="top-bar">
                        <h2>
                            <div className='span'><HiUserPlus /></div>
                            All Designation list <p>10 total</p>
                        </h2>
                        <div className="Emp_Head_Right">
                            <div className="addEmp" onClick={handleAddDesginationClick}>
                                <p><span><IoMdAdd /></span> AddNew Designation</p>
                            </div>
                            <div className="menu_head" onClick={handleHidImport}>
                                <div className="div_top"><CiMenuKebab /></div>
                                <div className={`bottom_import  ${hidImport ? 'bottom_import_hide' : ''}`}>
                                    <AiOutlineCloudUpload />
                                    <input type="file" accept='image/*' />
                                </div>
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
            <div className="EmpOn_Second_Head" id='searchhead'>
                <div className="left">

                </div>
                <div className="right">
                    <div className="refresh divRight" onClick={handleRefresh}>
                        <div className='div_box'>
                            <span><BiRevision /></span>
                        </div>
                    </div>
                    <div className="search divRight">
                        <div className='search div_box'>
                            <span className='search_icon'><IoSearchSharp /></span>
                            <input
                                type="search"
                                name="search"
                                placeholder='Search designation name, department...'
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyUp={handleFilterChange}
                            />
                        </div>
                    </div>
                    <div className="filter divRight">
                        <div className='div_box' onClick={showFilterHandle}>
                            <span><IoFilterSharp /></span>
                        </div>

                        {showFilter && (
                            <div className="filter-container">
                                <div className="filter-options">
                                    <div className="filter-option" onClick={handleCustomDateClick}>
                                        <p>Custom Date </p>
                                        {showCustomDate && (
                                            <div className="dropdown-content date-h">
                                                <div><MdDateRange /> Select Custom date</div>
                                                <input type="date" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="filter-option">
                                        <p onClick={handleEmploymentTypeClick}>Date Range</p>
                                        <div className="dropdown-content date-h">
                                            <p>Form Date </p>
                                            <div><MdDateRange /> Select Form date</div>
                                            <input type="date" />
                                        </div>

                                    </div>
                                    <div className="filter-option">
                                        <p onClick={handleDepartmentClick}>Department</p>
                                        {showDepartment && (
                                            <div className="dropdown-content">
                                                <ul>

                                                    <li>
                                                        <input type="radio" id="it" name="department" className="custom-radio" />
                                                        <label htmlFor="it">Entry</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="hr" name="department" className="custom-radio" />
                                                        <label htmlFor="hr">Medium</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="sales" name="department" className="custom-radio" />
                                                        <label htmlFor="sales">Senior</label>
                                                    </li>

                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>




                        )}

                    </div>
                </div>
            </div>
            {/* All Employee  List*/}
            <div className="allEmployeeList" id="allemployeetable">
                {/* <div className="head">
                </div> */}
                <div className="employee-table">

                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
                                <th> <div>Designation Name<span><TiArrowUnsorted /></span></div></th>
                                <th>Department</th>
                                <th>Description</th>

                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.map((emp, index) => (
                                <tr key={index} onClick={() => handleDesignationclick2(DesignationDetails)}>
                                    <td><input type="checkbox" checked={emp.isChecked} onChange={() => handleCheckboxChange(indexOfFirstEmployee + index)} /></td>
                                    <td>{emp.deptName}</td>
                                    <td>{emp.deptHead}</td>
                                    <td>{emp.parentDept}</td>



                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showPopup && (
                        <div className="popup-overlay">
                            <div className="popup-content">
                                <div className="add-designation-header">
                                    <h2>Add New Designation</h2>
                                    <button className="close_btn" onClick={closePopup}>
                                        <IoIosCloseCircleOutline />
                                    </button>
                                </div>
                                <div className="add-designation-body">
                                    <form>
                                        <div className="side-by-side">
                                            {/* <div>
                                                <label style={{ color: "red" }}>Designation Name *</label>
                                                <input type="text" id="designname" placeholder="Enter designation name" />
                                            </div> */}

                                            <div className="form-group">
                                                <label className='starred'>Designation Name*</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter designation name "
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group" id="depart">
                                                <label>Department</label>
                                                <div className="dropdown10">
                                                    <div className="dropdown-button10" onClick={() => toggleDropdown('department')}>
                                                        <div className='choose1'>{formData.department || "Choose department"}</div>
                                                        <span id='toggle_selectIcon'> {!dropdowns.department ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                                    </div>

                                                    {dropdowns.department && (
                                                         <div className="dropdown-menu10">
                                            <div className="dropdown-item10" onClick={() => selectOption('department', 'Department1')}>Department1</div>
                                            <div className="dropdown-item10" onClick={() => selectOption('department', 'Department2')}>Department2</div>
                                            <div className="dropdown-item10" onClick={() => selectOption('department', 'Department3')}>Department3</div>
                                            <div className="dropdown-item10" onClick={() => selectOption('department', 'Department4')}>Department4</div>
                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* <div>
                                                <label>Department </label>
                                                <input type="text" id="designname1" placeholder="Enter department" />
                                            </div> */}
                                        </div>
                                        <div className='despt'>  <label>Description</label></div>

                                        <textarea placeholder="Enter description"></textarea>

                                        <button type="submit">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pagination">
                        <div className="rows-per-page">
                            <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                                <option value={5}>5 per page</option>
                                <option value={10}>10 per page</option>
                                <option value={30}>30 per page</option>
                                <option value={50}>50 per page</option>
                                <option value={70}>70 per page</option>
                                <option value={100}>100 per page</option>
                            </select>
                        </div>
                        <div className="page-navigation">
                            <div className="page-numbers">
                                {[...Array(totalPages)].map((_, pageIndex) => (
                                    <button
                                        key={pageIndex + 1}
                                        className={currentPage === pageIndex + 1 ? 'active' : ''}
                                        onClick={() => handlePageChange(pageIndex + 1)}
                                    >
                                        {pageIndex + 1}
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}> <FaAngleLeft /></button>
                            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}><FaAngleRight /></button>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default Designation;