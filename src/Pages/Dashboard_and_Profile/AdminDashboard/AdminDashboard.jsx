import { useState, useEffect } from 'react';
import Admin_IMG from '../../../assets/user.png'
import { GiAlarmClock } from "react-icons/gi";
import { FaAngleDown, FaChevronRight, FaRegCalendarAlt } from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import img_emp1 from '../../../assets/emp1.png'
import { CiMenuKebab } from "react-icons/ci";
import { RiUser6Line } from "react-icons/ri";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import { MdOutlineInsertChart } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

import './AdminDashboard.scss'
const AdminDashboard = () => {
    const [time, setTime] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0); // State to track current slide
    const navigate = useNavigate();
    //   Live (*) time  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    useEffect(() => {
        const updateTime = () => {
            const currentTime = new Date();
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
            setTime(formattedTime);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);
    //   Live (*) time ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // 
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Today');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectOption = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
    // 

    // all employees json data
    const [employees, setEmployees] = useState([
        { name: "Akash Shinde", Roll: "Lead Design", email: "Akashhrms@gmail.com", phone: "+918555031082", Image: img_emp1, DOB: '2024-08-12' },
        { name: "Ravi Kumar", Roll: "Developer", email: "ravikumar@gmail.com", phone: "+918888888881", Image: img_emp1, DOB: '2023-07-11' },
        { name: "Sita Sharma", Roll: "Designer", email: "sitasharma@gmail.com", phone: "+918888888882", Image: img_emp1, DOB: '2024-08-12' },
        { name: "Mohan Verma", Roll: "Tester", email: "mohanverma@gmail.com", phone: "+918888888883", Image: img_emp1, DOB: '2024-06-15' },
        { name: "New Employee 1", Roll: "HR", email: "newemp1@gmail.com", phone: "+918888888884", Image: img_emp1, DOB: '2024-08-10' },
        { name: "New Employee 2", Roll: "Manager", email: "newemp2@gmail.com", phone: "+918888888885", Image: img_emp1, DOB: '2024-08-12' },
        { name: "New Employee 3", Roll: "Support", email: "newemp3@gmail.com", phone: "+918888888886", Image: img_emp1, DOB: '2024-08-18' },
        { name: "New Employee 4", Roll: "Developer", email: "newemp4@gmail.com", phone: "+918888888887", Image: img_emp1, DOB: '2024-08-13' },
    ]);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // const today = new Date().toISOString().split('T')[0];
    const today = '2024-08-12'
    // all employees json data

    // new join

    const getTopNewEmployees = employees.slice(0, 4);
    // new join
    // 
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,  // To hide next/prev buttons
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex), // Track the current slide
        customPaging: (i) => (
            <div
                style={{
                    width: i === currentSlide ? "25px" : "10px",

                    height: "3px",
                    background: i === currentSlide ? "purple" : "gray",
                    borderRadius: "10px",
                    transition: "all 0.3s ease",
                }}
            />
        ),
        dotsClass: "slick-dots slick-thumb custom-dots", // Custom class for dots
    };
    // 
    
    const Birthdaypage=()=>{
        navigate('/birthday');
    }
      
    return (
        <div className='ADMIN_EMP'>
            {/* header time */}
            <div className="Top_Head_Admin_Dashboard">
                {/* left */}
                <div className="Left_admin_hello">
                    <img src={Admin_IMG} alt="Admin_image" />
                    <div>
                        <h2>Hello Admin 👋</h2>
                        <p>Welcome back, Track your team progress here</p>
                    </div>
                </div>
                {/* right */}
                <div className="Right_Time">
                    <div className="Check_in_time">
                        <h3>CHECK IN TIME</h3>
                        <span><GiAlarmClock /></span>
                        <h2>{time}</h2>
                    </div>
                    <div className="check_out_time">
                        <h3>CHECK OUT TIME</h3>
                        <button>Check Out</button>
                    </div>
                </div>
            </div>
            {/* center Cart */}
            <div className="content_emp_three">
                <div className="Left_cart">
                    <div className="Attendance_Overview">
                        <div className="head">
                            <h3>Attendance Overview</h3>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={toggleDropdown}>
                                    <div>{selectedOption}</div>
                                    <div><FaAngleDown /></div>
                                </div>
                                {isOpen && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('Today')}>Today</div>
                                        <div className="dropdown-item" onClick={() => selectOption('Week')}>Week</div>
                                        <div className="dropdown-item" onClick={() => selectOption('Month')}>Month</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='Left_right'>
                            <div className="left">
                                <div>
                                    <span className="present"></span>
                                    <h3>Present</h3>
                                </div>
                                <div>
                                    <span className="absent"></span>
                                    <h3>Absent</h3>
                                </div>
                                <div>
                                    <span className="halfday"></span>
                                    <h3>Half Day</h3>
                                </div>
                            </div>
                            <div className="right">
                                <div className="span1"></div>
                                <div className="span2"></div>
                                <div className="gauge">
                                    <span>Total Employees</span>
                                    <h1>256</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="left_Bottom_cart">
                        <div className="header_Birthday" onClick={Birthdaypage}>
                            <h3>Employee Birthday Today</h3>
                            <div>
                                <LiaBirthdayCakeSolid />
                            </div>
                        </div>
                        <div className="top_border"></div>
                        <div className="Emp">
                            <Slider {...settings}>
                                {employees.map((emp, i) => (
                                    emp.DOB === today && (
                                        <div key={i} className='div_dob'>
                                            <div className='img_dob_name'>
                                                <img src={emp.Image} alt={emp.name} />
                                                <div>
                                                    <h3>{emp.name}</h3>
                                                    <p>{formatDate(emp.DOB)}</p>
                                                </div>
                                            </div>
                                            {/* <p>{emp.email}</p> */}
                                            <img src="https://i.pinimg.com/originals/85/82/1b/85821bd4bbd0fedade2553543bb79ac7.gif" alt=""  />
                                        </div>
                                    )
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
                <div className="flex_right">
                    <div className="center_Cart">
                        <div className="newEmployee">
                            <div className="header_newEmp">
                                <div className='number_new_hire'>
                                    <h3>New Employee </h3>
                                    <div>
                                        <h2>04</h2>
                                        <h3>New Hires</h3>
                                    </div>
                                </div>
                                <div className='newEmp_img'>
                                    {getTopNewEmployees.map((emp, i) => (
                                        <div key={i} className='div_newEmp_img'>
                                            <img src={emp.Image} alt={emp.name} />
                                        </div>
                                    ))}
                                    <div className="img_add">
                                        +
                                    </div>
                                </div>
                            </div>
                            <div className="top_border"></div>
                            <div className="Emp">
                                {getTopNewEmployees.map((emp, i) => (
                                    <div key={i} className='div_dob'>
                                        <div className='img_dob_name'>
                                            <img src={emp.Image} alt={emp.name} />
                                            <div>
                                                <h3>{emp.name}</h3>
                                                <p> {emp.Roll}</p>
                                            </div>
                                        </div>
                                        <p>{emp.phone}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="Right_cart">
                        <div className="employeesOnLeave">
                            <div className="newEmployee">
                                <div className="header_newEmp">
                                    <div className='number_new_hire'>
                                        <h3> Employees On Leave </h3>
                                        <div>
                                            <p>Monday,15th April</p>
                                        </div>
                                    </div>
                                    <button>See All</button>
                                </div>
                                <div className="top_border"></div>
                                <div className="Emp">
                                    {getTopNewEmployees.map((emp, i) => (
                                        <div key={i} className='div_dob'>
                                            <div className='img_dob_name'>
                                                <img src={emp.Image} alt={emp.name} />
                                                <div>
                                                    <h3>{emp.name}</h3>
                                                    {/* <p> {emp.Roll}</p> */}
                                                    <p>15April-17April</p>
                                                    <div><p className='content_dot_red'> Sick Leave </p></div>
                                                </div>
                                            </div>
                                            <p> <FaChevronRight /> </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* four div */}
            <div className="content_emp_four" >
                <div className="box_">
                    <div className="head">
                        <p>All Employees</p>
                        <span> <CiMenuKebab /></span>
                    </div>
                    <div className="centerData">
                        <div>
                            <div><span> <RiUser6Line /></span></div>
                            <h2>210</h2>
                        </div>
                        <div className='up'>
                            <span> <IoMdTrendingUp /></span>
                            <p>2%</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <p>Last Month: <span>173</span></p>
                    </div>
                </div>
                <div className="box_">
                    <div className="head">
                        <p>New Employees</p>
                        <span> <CiMenuKebab /></span>
                    </div>
                    <div className="centerData">
                        <div>
                            <div><span> <RiUser6Line /></span></div>
                            <h2>27</h2>
                        </div>
                        <div className='up'>
                            <span> <IoMdTrendingUp /></span>
                            <p>4%</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <p>Last Month: <span>7</span></p>
                    </div>
                </div>
                <div className="box_">
                    <div className="head">
                        <p>Resigned</p>
                        <span> <CiMenuKebab /></span>
                    </div>
                    <div className="centerData">
                        <div>
                            <div><span> <RiUser6Line /></span></div>
                            <h2>10</h2>
                        </div>
                        <div className='down'>
                            <span> <IoMdTrendingDown /></span>
                            <p>4%</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <p>Last Month: <span>6</span></p>
                    </div>
                </div>
                <div className="box_">
                    <div className="head">
                        <p>On Leave</p>
                        <span> <CiMenuKebab /></span>
                    </div>
                    <div className="centerData">
                        <div>
                            <div><span> <RiUser6Line /></span></div>
                            <h2>10</h2>
                        </div>
                        <div className='down'>
                            <span> <IoMdTrendingDown /></span>
                            <p>4%</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <p>Last Month: <span>6</span></p>
                    </div>
                </div>

            </div>
            {/*  */}
            <div className="dashboard-container">
                <div className="section upcoming-holidays">
                    <div className="header">
                        <h3>Upcoming Holidays</h3>
                        <select>
                            <option>This Month</option>
                            <option>This Week</option>
                        </select>
                    </div>
                    <ul>
                        <li>
                            <div className="date">02</div>
                            <div className="details">
                                <h4>Ganesh Chaturthi</h4>
                                <p>Lorem Ipsum Dolor Sit Amet Consectetur</p>
                            </div>
                            <span>17-Apr</span>
                        </li>
                        <li>
                            <div className="date icon2">07</div>
                            <div className="details">
                                <h4>Eid-Ul-Fitr</h4>
                                <p>Lorem Ipsum Dolor Sit Amet Consectetur</p>
                            </div>
                            <span>17-Apr</span>
                        </li>
                        <li>
                            <div className="date">10</div>
                            <div className="details">
                                <h4>Good Friday</h4>
                                <p>Lorem Ipsum Dolor Sit Amet Consectetur</p>
                            </div>
                            <span>17-Apr</span>
                        </li>
                    </ul>
                    <a href="#" className='a'>View All</a>
                </div>

                <div className="section announcements">
                    <div className="header">
                        <h3>Announcements</h3>
                        <select>
                            <option>Today</option>
                        </select>
                    </div>
                    <ul>
                        <li>
                            <div className="icon"><MdOutlineInsertChart /></div>
                            <div className="details">
                                <h4>Launch Slot Pending</h4>
                                <p>Lorem Ipsum Dolor Sit Amet Consectetur</p>
                            </div>
                            <span>09:00am</span>
                        </li>
                        <li>
                            <div className="icon icon2"><FaRegCalendarAlt /></div>
                            <div className="details">
                                <h4>BOAT Event Upcoming</h4>
                                <p>Lorem Ipsum Dolor Sit Amet Consectetur</p>
                            </div>
                            <span>09:00am</span>
                        </li>
                        <li>
                            <div className="icon"><MdOutlineInsertChart /></div>
                            <div className="details">
                                <h4>Meeting Will Be On Next Month</h4>
                                <p>Lorem Ipsum Dolor Sit Amet Consectetur</p>
                            </div>
                            <span>09:00am</span>
                        </li>
                    </ul>
                    <a href="#" className='a'>View All</a>
                </div>

                <div className=" quick-links">
                    <div className="header">
                        <h3>Quick Links</h3>
                        <a href="#" className='seeAll'>See All</a>
                    </div>
                    <ul>
                        <li>
                            <a href="#">My Projects</a>
                            <button>+</button>
                        </li>
                        <li>
                            <a href="#">All Jobs</a>
                            <button>+</button>
                        </li>
                        <li>
                            <a href="#">All Employees</a>
                            <button>+</button>
                        </li>
                        <li>
                            <a href="#">All Employees</a>
                            <button>+</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
