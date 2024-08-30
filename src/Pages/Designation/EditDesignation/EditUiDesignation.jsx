import { useState } from 'react';

import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdWorkHistory } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { BiEditAlt } from "react-icons/bi";
import './EditUiDesignation.scss';
import { MdDeleteOutline } from "react-icons/md";
// 

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


import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { GrCloudUpload } from "react-icons/gr";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const handleHidImport = () => {
    setHidImport(!hidImport);
};




const AddEmployee=()=>{
    navigate('/add-employee');
}

const EditUiDesignation = () => {
    const [activeTab, setActiveTab] = useState('experience');
    const [hidImport, setHidImport] = useState(true);
    return (
<div>
<div className="EmpOn_main_container">
                    <div className="EmpOn_header">
                        <div className="top-bar">
                            <h2 className='headerline'>
                                <div className='span'><HiUserPlus /></div>
                                Edit UI Designer Designation
                            </h2>
                            <div className="Emp_Head_Right">
                                {/* <div className="addEmp" onClick={AddEmployee}>
                                    <p><span><IoMdAdd /></span> Add New Employee</p>
                                </div> */}
                                {/* <div className="menu_head" onClick={handleHidImport}>
                                    <div className="div_top"><CiMenuKebab /></div>
                                    <div className={`bottom_import  ${hidImport ? 'bottom_import_hide' : ''}`}>
                                        <AiOutlineCloudUpload /> Import
                                        <input type="file" accept='image/*' />
                                    </div>
                                </div> */}
                                 <div className='close_btn'>
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

        <div className="profile-page1">
            <div className="details1">
                <div className="title_top1">
                    {/* <h2>Edit UI Designer Designation</h2> */}
                   
                </div>

                <div className="form-container">
                    <form>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="designation-name" style={{color:"red"}}>Designation name*</label>
                                <input
                                    type="text"
                                    id="designation-name"
                                    placeholder="UI Designer"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="department">Department</label>
                                <select id="department">
                                    <option>UI/UX Design</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="job-level">Job Level</label>
                                <select id="job-level">
                                    <option>Entry Level</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="number-of-employees">Number Of Employees</label>
                                <input
                                    type="text"
                                    id="number-of-employees"
                                    placeholder="12"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reporting-manager">Reporting Manager</label>
                                <input
                                    type="text"
                                    id="reporting-manager"
                                    placeholder="Mr. Akash Shinde"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="skills-required">Skills Required</label>
                                <div className="skills">
                                    <span className="skill">PHP</span>
                                    <span className="skill">Java</span>
                                    <span className="skill">Laravel</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                placeholder="Urgent requirement for experienced Software developer..."
                            >

                            </textarea>
                           
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
            </div>
        </div>
        </div>
    );
};

export default EditUiDesignation;
