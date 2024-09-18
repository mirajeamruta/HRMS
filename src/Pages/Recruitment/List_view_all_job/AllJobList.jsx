import { useEffect, useState, useRef } from 'react';
import { HiUserPlus } from "react-icons/hi2";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { PiCheckSquare } from "react-icons/pi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { BiRevision } from "react-icons/bi";
import { IoFilterSharp, IoSearchSharp } from "react-icons/io5";
import { TiArrowUnsorted } from "react-icons/ti";
import { MdDateRange } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdWork } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { RiFilterOffFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import './AllJobList.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IoIosCloseCircleOutline } from "react-icons/io";
import { GiBackstab, GiNotebook } from "react-icons/gi";
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import { OutsideClick } from '../../../components/OutSideClick';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LodinImg from '../../../assets/loding.gif'
import { OutsideClickStatus } from './OutsideClickStatus.jsx'; // Adjust import path if necessary

const AllJobList = () => {

    const jobs = useSelector((state) => state.job.jobs);
    // console.log('jobs', jobs)
    const { isOpen: isFilterOpen, ref: filterRef, buttonRef: filterButtonRef, handleToggle: toggleFilter } = OutsideClick();
    const { isOpen: isFilterOpen2, ref: filterRef2, buttonRef: filterButtonRef2, handleToggle: toggleFilter2 } = OutsideClick();
    const { isOpen: isFilterOpen3, ref: filterRef3, buttonRef: filterButtonRef3, handleToggle: toggleFilter3 } = OutsideClick();
    // const { isOpen: isStatusOpen, ref: statusRef, buttonRef: statusButtonRef, handleToggle: toggleStatusDropdown } = OutsideClickStatus();


    // 
    const [loading, setLoading] = useState(true);
    const [sms, setSms] = useState('')
    const [statusId, setStatusId] = useState('')
    const [statusNew, setStatusNew] = useState('')
    // 
    const [allDel, setAllDel] = useState(true);
    const [thisDel, setThisDel] = useState(false)
    const [toggleLeft, setToggleLeft] = useState(false)
    const [isOpen, setIsOpen] = useState(null);
    // 

    const [employees, setEmployees] = useState([
        // { JobTitle: "IT Consultant", Department: "Marketing", Positions: "10", ExperienceRequired: "03 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Open", isChecked: false },
        // { JobTitle: "Cloud Architect", Department: "Customer Success", Positions: "10", ExperienceRequired: "01 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Draft", isChecked: false },
        // { JobTitle: "Software Engineer", Department: "Office Administration", Positions: "10", ExperienceRequired: "03 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "On hold", isChecked: false },
        // { JobTitle: "IT Auditor", Department: "Operations", Positions: "10", ExperienceRequired: "07 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Cancelled", isChecked: false },
        // { JobTitle: "Technical Writer", Department: "Executive Management", Positions: "10", ExperienceRequired: "02 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "On hold", isChecked: false },
        // { JobTitle: "UI/UX Designer", Department: "Product", Positions: "10", ExperienceRequired: "2.6 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Filled", isChecked: false },
        // { JobTitle: "Database Administrator", Department: "UX", Positions: "10", ExperienceRequired: "03 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Filled", isChecked: false },
        // { JobTitle: "Network Administrator", Department: "Finance", Positions: "10", ExperienceRequired: "03 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Open", isChecked: false },
        // { JobTitle: "QA Engineer", Department: "Sales", Positions: "10", ExperienceRequired: "01 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Open", isChecked: false },

    ]);
    const [employees2, setEmployees2] = useState();

    useEffect(() => {
        // Employees ka data employees2 me set karna
        setEmployees2(employees);
    }, [employees]); // Jab bhi employees change hoga, yeh effect trigger hoga


    const DelThis = () => {
        setThisDel(!thisDel);

    }

    const toggleDropdown = (i) => {
        setIsOpen(prev => (prev == i ? null : i));
    };
    // console.log('isOpen', isOpen)


    // 

    const [filteredEmployees, setFilteredEmployees] = useState(employees);
    const [hidImport, setHidImport] = useState(true);
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectAll, setSelectAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // console.log('searchQuery', searchQuery)
    

    // console.log(selectedDepartment)

    const handleHidImport = () => {
        setHidImport(!hidImport);
        toggleFilter3()
    };
    // table select checkbox
    const handleSelectAll = () => {
        setAllDel(!allDel)
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
    // table select checkbox


    // page index active
    // Function to generate the pages to display

    const indexOfLastEmployee = currentPage * rowsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
    // 
    // setFilteredEmployees(currentEmployees)
    // setSurrentEmployees2(currentEmployees)
    // console.log('currentEmployees2', filteredEmployees)

    const generatePages = () => {
        let pages = [];

        // If total pages <= 5, show all pages
        if (totalPages <= 5) {
            pages = [...Array(totalPages).keys()].map(pageIndex => pageIndex + 1);
        }
        // If total pages > 5
        else {
            if (currentPage <= 3) {
                pages = [1, 2, 3, 4, 5];
            } else if (currentPage >= totalPages - 2) {
                pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }

        return pages;
    };

    // Function to handle page change
    const handlePageChange = (page) => {
        if (page !== '...') {
            setCurrentPage(page);
        }
    };
    // page index active
    // 

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const statuses = ['Open', 'Draft', 'On hold', 'Filled', 'Cancelled'];


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // index page
    const handleFilterChange = (e) => {

        setSelectedDepartment(e.target.value);
        let updatedEmployees = employees;
        console.log('updatedEmployees', updatedEmployees)
        if (searchQuery) {
            updatedEmployees = updatedEmployees.filter(emp =>
                emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
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


    // refresh all page
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

    const JobDetailsPage = () => {
        navigate('/job-details')
    }
    const NewJobPage = () => {
        navigate('/add-job')
    }

    const filter_left = () => {
        setToggleLeft(!toggleLeft)
    }
    // const filter_leftClose = () => {
    //     // setToggleLeft(false)
    //     toggleFilter2()
    // }
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name); // Set the file name in the state
        }
    };


    // console.log('updateId', statusId)
    // console.log('status', statusId)

    const UpdateStatusHndle = (id) => {
        setStatusId(id)
    }

    // api get6 list
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        axios.post('https://devstronauts.com/public/api/jobopening/list', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {


                setEmployees(response.data.job_opening);
                setFilteredEmployees(response.data.job_opening); // filteredEmployees ko bhi sync karo
                // console.log('response 🥳', response.data.job_opening);
                setLoading(false);
                // setSms()
            })
            .catch(error => {
                console.error("Error fetching data: ", error);


            });
    }, [statusId, statusNew, token, sms]);
    // update status


    useEffect(() => {

        if (statusId && statusNew) {

            axios.post('https://devstronauts.com/public/api/jobopening/status-update', {
                job_id: statusId,
                job_status: statusNew
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    // setUpdatingEmpId(statusId);
                    setSms(`Status update successfully`)
                    toast.success('Status update successfully.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    if (response.data.success === true) {
                        // setShowAlert(true)
                        // setTimeout(() => {
                        //     setShowAlert(false)
                        // }, 4000);
                    }
                })
                .catch(error => {
                    // setSms('Status update Failed')
                    // alert(error)
                    toast.error('Status update Failed.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    // setShowAlertError(true)
                    // setTimeout(() => {
                    //     setShowAlertError(false)
                    // }, 4000);

                    console.error("Error fetching data: ", error);
                });
        }
    }, [statusNew]);


    const handleStatusChange = (index, newStatus) => {
        setStatusNew(newStatus)
        // console.log('status chenge:::', newStatus)
        const updatedEmployees = [...filteredEmployees];
        updatedEmployees[index].status = newStatus;
        setFilteredEmployees(updatedEmployees);
        setIsOpen(null);
        // toast.info('Please Wait Status Updating...', {
        //     position: "top-right",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        // });
        setSms('')
    };
    const [activeFilter, setActiveFilter] = useState(null); // Track the active filter
    // const filterRef2 = useRef(null);

    const filter_leftClose = (filterType) => {
        console.log(`${filterType} 👉`);
        setActiveFilter(filterType); // Set the active filter
        toggleFilter2()
    };
    // 
  
    

    return (
        <div id='allEmp'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="error"
            />
            <div className="EmpOn_main_container">
                <div className="EmpOn_header">
                    <div className="top-bar">
                        <h2>
                            <div className='span'><HiUserPlus /></div>
                            All Jobs list <p>204 total</p>
                        </h2>
                        <div className="Emp_Head_Right">
                            <div className="addEmp" onClick={NewJobPage}>
                                <p><span><IoMdAdd /></span> Add New Job</p>
                            </div>
                            <div className="menu_head" onClick={handleHidImport} ref={filterButtonRef3}>
                                <div className="div_top"><CiMenuKebab /></div>
                                <div className={`bottom_import ${!isFilterOpen3 ? 'bottom_import_hide' : ''}`} ref={filterRef3}>
                                    {fileName ? '' : <AiOutlineCloudUpload />}
                                    <input type="file" accept="image/*" onChange={handleFileChange} />
                                    {fileName ? fileName : 'import'}
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
            <div className="EmpOn_Second_Head">
                <div id='filter_left' onClick={toggleFilter2} ref={filterButtonRef2}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#7f7f7f" fill="none">
                        <path d="M7 21H16.9999C19.3569 21 20.5354 21 21.2677 20.2678C21.9999 19.5355 21.9999 18.357 21.9999 16C21.9999 13.643 21.9999 12.4645 21.2677 11.7322C20.5354 11 19.3569 11 16.9999 11H7C4.64302 11 3.46453 11 2.7323 11.7322C2.00007 12.4644 2.00005 13.6429 2 15.9999C1.99995 18.357 1.99993 19.5355 2.73217 20.2677C3.4644 21 4.64294 21 7 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6 7C6.00004 5.5998 6.00006 4.89969 6.27259 4.3649C6.51227 3.89457 6.89467 3.51218 7.36501 3.27252C7.89981 3 8.59991 3 10.0001 3H14C15.4001 3 16.1002 3 16.635 3.27248C17.1054 3.51217 17.4878 3.89462 17.7275 4.36502C18 4.8998 18 5.59987 18 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16 15L15.7 15.4C15.1111 16.1851 14.8167 16.5777 14.3944 16.7889C13.9721 17 13.4814 17 12.5 17H11.5C10.5186 17 10.0279 17 9.60557 16.7889C9.18328 16.5777 8.88885 16.1851 8.3 15.4L8 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                {/* <div className={`left ${!isFilterOpen2 ? 'filterLeftOpen' : 'filterLeftClose'}`} ref={filterRef2} >
                    <div className="all">
                        <div className='listActive' onClick={filter_leftClose}>
                            <span> <FaList /></span>All
                        </div>
                    </div>
                    <div className="active" onClick={filter_leftClose}>
                        <div>
                            <span><PiCheckSquare /></span>Draft
                        </div>
                    </div>
                    <div className="inactive" onClick={filter_leftClose}>
                        <div>
                            <span> <MdWork /> </span>Open
                        </div>
                    </div>
                    <div className="resigned" onClick={filter_leftClose}>
                        <div>
                            <span> <FaRegClock /> </span>On hold
                        </div>
                    </div>
                    <div className="terminated" onClick={filter_leftClose}>
                        <div>
                            <span><PiCheckSquare /></span>Filled
                        </div>
                    </div>
                    <div className="notice_period" onClick={filter_leftClose}>
                        <div>
                            <span><IoIosCloseCircleOutline /></span>Cancelled
                        </div>
                    </div>
                </div> */}

                <div className={`left ${!isFilterOpen2 ? 'filterLeftOpen' : 'filterLeftClose'}`} ref={filterRef2}>
                    <div className="all">
                        <div
                            className={`listActive ${activeFilter === 'all' ? 'listActive' : ''}`}
                            onClick={() => filter_leftClose('all')}
                        >
                            <span><FaList /></span>All
                        </div>
                    </div>
                    <div
                        className={`active ${activeFilter === 'draft' ? 'listActive' : ''}`}
                        onClick={() => filter_leftClose('draft')}
                    >
                        <div>
                            <span><PiCheckSquare /></span>Draft
                        </div>
                    </div>
                    <div
                        className={`inactive ${activeFilter === 'open' ? 'listActive' : ''}`}
                        onClick={() => filter_leftClose('open')}
                    >
                        <div>
                            <span><MdWork /></span>Open
                        </div>
                    </div>
                    <div
                        className={`resigned ${activeFilter === 'onHold' ? 'listActive' : ''}`}
                        onClick={() => filter_leftClose('onHold')}
                    >
                        <div>
                            <span><FaRegClock /></span>On hold
                        </div>
                    </div>
                    <div
                        className={`terminated ${activeFilter === 'filled' ? 'listActive' : ''}`}
                        onClick={() => filter_leftClose('filled')}
                    >
                        <div>
                            <span><PiCheckSquare /></span>Filled
                        </div>
                    </div>
                    <div
                        className={`notice_period ${activeFilter === 'cancelled' ? 'listActive' : ''}`}
                        onClick={() => filter_leftClose('cancelled')}
                    >
                        <div>
                            <span><IoIosCloseCircleOutline /></span>Cancelled
                        </div>
                    </div>
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
                                placeholder='Search Employee name, phone number...'
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyUp={handleFilterChange}
                            />
                        </div>
                    </div>
                    <div className="filter divRight">
                        <div className='div_box' onClick={toggleFilter} ref={filterButtonRef}>
                            <span><IoFilterSharp /></span>
                        </div>

                        {isFilterOpen && (
                            <div className="filter-container" ref={filterRef}>
                                <div className="filter-options">
                                    {/* <div className="filter-option" onClick={handleCustomDateClick}>
                                        <p>Custom Date </p>
                                        {showCustomDate && (
                                            <div className="dropdown-content date-h">
                                                <div><MdDateRange /> Select Custom date</div>
                                                <input type="date" />
                                            </div>
                                        )}
                                    </div> */}
                                    <div className="filter-option">
                                        <p onClick={handleEmploymentTypeClick}>Experience Level</p>
                                        {showEmploymentType && (
                                            <div className="dropdown-content">
                                                <ul>
                                                    <li>
                                                        <input type="radio" id="permanent" name="employmentType" className="custom-radio" />
                                                        <label htmlFor="permanent">Entry level</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="contract" name="employmentType" className="custom-radio" />
                                                        <label htmlFor="contract">Mid level</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="intern" name="employmentType" className="custom-radio" />
                                                        <label htmlFor="intern">Senior</label>
                                                    </li>

                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="filter-option">
                                        <p onClick={handleDepartmentClick}>Department</p>
                                        {showDepartment && (
                                            <div className="dropdown-content">
                                                <ul>
                                                    <li>
                                                        <input type="radio" id="all-department" name="department" className="custom-radio" />
                                                        <label htmlFor="all-department">All Department</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="it" name="department" className="custom-radio" />
                                                        <label htmlFor="it">IT</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="hr" name="department" className="custom-radio" />
                                                        <label htmlFor="hr">HR</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="sales" name="department" className="custom-radio" />
                                                        <label htmlFor="sales">Sales</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="management" name="department" className="custom-radio" />
                                                        <label htmlFor="management">Management</label>
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
            <div className="allEmployeeList">
                {/* <div className="head">
                </div> */}
                <div className="employee-table">

                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                    {/* {!allDel &&
                                        <span id='deleteAll'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ff0000" fill="none">
                                                <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                <path d="M9 11.7349H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                <path d="M10.5 15.6543H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                <path d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            </svg>
                                        </span>
                                    } */}
                                </th>
                                <th> <div>Job Title<span><TiArrowUnsorted /></span></div></th>
                                <th>Department</th>
                                <th>Positions</th>
                                <th>Experience Required</th>
                                <th>Skills Required</th>

                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>

                            {currentEmployees.map((emp, index) => (
                                <tr key={index}  >
                                    <td>
                                        <input type="checkbox" checked={emp.isChecked} onChange={() => handleCheckboxChange(indexOfFirstEmployee + index)} onClick={DelThis} />
                                        {/* {emp.isChecked &&
                                            <span id='deleteThis'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ff0000" fill="none">
                                                    <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                    <path d="M9 11.7349H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                    <path d="M10.5 15.6543H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                    <path d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                </svg>
                                            </span>
                                        } */}
                                    </td>
                                    <td onClick={() => navigate(`/job-details/${emp.id}`)}>{emp.job_title}</td>
                                    <td onClick={() => navigate(`/job-details/${emp.id}`)}>{emp.department}</td>
                                    <td onClick={() => navigate(`/job-details/${emp.id}`)}>{emp.designation}</td>
                                    <td onClick={() => navigate(`/job-details/${emp.id}`)}>{emp.experience}</td>
                                    <td onClick={() => navigate(`/job-details/${emp.id}`)}>{emp.skills}</td>
                                    <td >
                                        {/* <div className="status-dropdown" >

                                            <div key={index} className="status-container">
                                                <div
                                                    className={`status-display ${emp.job_status ? emp.job_status.toLowerCase().replace(' ', '-') : ''}`}
                                                    onClick={() => toggleDropdown(index)}
                                                >
                                                    <span className={`left_dot ${emp.job_status ? emp.job_status.toLowerCase().replace(' ', '-') : ''}`}></span>
                                                    <div onClick={() => {
                                                        UpdateStatusHndle(emp.id);
                                                    }}>
                                                        <div


                                                        >
                                                            {emp.job_status}
                                                        </div>
                                                        <div className="^wdown">
                                                            <MdOutlineKeyboardArrowDown />
                                                        </div>
                                                    </div>
                                                </div>
                                                {isOpen === index && (
                                                    <div>
                                                        <div className="status-options" >
                                                            {
                                                                statuses.map(status => (
                                                                    <div
                                                                        key={status}
                                                                        className="status-option"
                                                                        onClick={() => {
                                                                            handleStatusChange(index, status)
                                                                        }
                                                                        }
                                                                    >
                                                                        {status}
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>

                                                    </div>
                                                )}
                                            </div>
                                        </div> */}


                                        <div className="status-dropdown" >
                                            <div key={index} className="status-container" >
                                                <div
                                                    className={`status-display ${emp.job_status ? emp.job_status.toLowerCase().replace(' ', '-') : ''}`}
                                                    onClick={() => toggleDropdown(index)}
                                                >
                                                    <span className={`left_dot ${emp.job_status ? emp.job_status.toLowerCase().replace(' ', '-') : ''}`}></span>
                                                    <div onClick={() => {
                                                        UpdateStatusHndle(emp.id);
                                                    }}>
                                                        <div
                                                           
                                                        >
                                                            {emp.job_status}
                                                        </div>
                                                        <div className="^wdown">
                                                            <MdOutlineKeyboardArrowDown />
                                                        </div>
                                                    </div>
                                                </div>
                                                {isOpen === index && (
                                                    <div>
                                                        <div className="status-options" >
                                                            {
                                                                statuses.map(status => (
                                                                    <div
                                                                        key={status}
                                                                        className="status-option"
                                                                        onClick={() => {
                                                                            handleStatusChange(index, status)
                                                                        }
                                                                        }
                                                                    >
                                                                        {status}
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>

                                                    </div>
                                                )}
                                            </div>
                                        </div>


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {loading ? (
                        <div id='Loading'>
                            <img src="https://i.pinimg.com/originals/6a/59/dd/6a59dd0f354bb0beaeeb90a065d2c8b6.gif" alt="" />
                        </div> // Show loading text or spinner when data is being fetched
                    ) : ('')}
                </div>
                <div className="pagination">
                    <div className="rows-per-page">
                        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                            <option value={5}>5 par page</option>
                            <option value={10}>10 par page</option>
                            <option value={30}>30 par page</option>
                            <option value={50}>50 par page</option>
                            <option value={70}>70 par page</option>
                            <option value={100}>100 par page</option>
                        </select>
                    </div>
                    <div className="page-navigation">
                        <div className="page-numbers">
                            {[...Array(totalPages)].map((_, pageIndex) => (
                                <button
                                    key={pageIndex + 1}
                                    className={currentPage === pageIndex + 1 ? 'activePageIndex' : ''}
                                    onClick={() => handlePageChange(pageIndex + 1)}
                                >
                                    {pageIndex + 1}
                                    {/* {console.log('currentPage', pageIndex + 1)} */}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}> <FaAngleLeft /></button>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}><FaAngleRight /></button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AllJobList;
// 