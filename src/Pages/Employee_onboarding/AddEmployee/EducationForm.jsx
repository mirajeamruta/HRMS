import { useState, useEffect } from 'react';
import './AddEmloyee.scss';
import './NavbarForm.scss';
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { GrCloudUpload } from "react-icons/gr";
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import axios from 'axios';
const EducationForm = ({ onSubmit }) => {
    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [error, setError] = useState(''); // Ensure error state is defined
    const [submitTriggered, setSubmitTriggered] = useState(false); // State to track submission
   
    const token = localStorage.getItem('access_token'); 
    const [educationForms, setEducationForms] = useState([
        {
            instituteName: '',
            degree: '',
            specialization: '',
            completionDate: '',
            fromDate: '',
            toDate: '',
            attachment: ''
        }
    ]);

    const handleFileChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setIsUploaded(true);
            const newForms = [...educationForms];
            newForms[index].attachment = file;
            setEducationForms(newForms);
        }
    };

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newForms = [...educationForms];
        newForms[index][name] = value;
        setEducationForms(newForms);
    };

    const handleAddEducation = () => {
        setEducationForms([
            ...educationForms,
            {
                instituteName: '',
                degree: '',
                specialization: '',
                completionDate: '',
                fromDate: '',
                toDate: '',
                attachment: ''
            }
        ]);
    };

    const handleRemoveEducation = (index) => {
        const newForms = educationForms.filter((_, i) => i !== index);
        setEducationForms(newForms);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(educationForms);
        // form submission logic yahan handle karein
    };

  // Trigger submission when the submitTriggered state is true
  useEffect(() => {
    if (!submitTriggered) return; // Avoid running if submit not triggered

    const submitForm = async () => {
        setError(''); // Clear previous errors

        const formData = new FormData();

        educationForms.forEach((form, index) => {
            formData.append(`education[${index}][instituteName]`, form.instituteName);
            formData.append(`education[${index}][degree]`, form.degree);
            formData.append(`education[${index}][specialization]`, form.specialization);
            formData.append(`education[${index}][completionDate]`, form.completionDate);
            formData.append(`education[${index}][fromDate]`, form.fromDate);
            formData.append(`education[${index}][toDate]`, form.toDate);
            if (form.attachment) {
                formData.append(`education[${index}][attachment]`, form.attachment);
            }
        });

        if (!token) {
            console.error('Token not found');
            return;
        }

        try {
            const response = await axios.post('https://devstronauts.com/public/api/employee/create/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log('Data submitted successfully', response.data);
            if (onSubmit) onSubmit(response.data);
        } catch (err) {
            console.error('Error submitting data:', err);
            setError(`Failed to submit data. Error: ${err.response?.data?.message || err.message}`);
        } finally {
            setSubmitTriggered(false); // Reset submit trigger state after submission
        }
    };

    submitForm(); // Call the form submission function when submitTriggered is true

}, [submitTriggered, educationForms, token, onSubmit]); // Dependencies that trigger the effect


 


    return (
        <div onSubmit={onSubmit} id="Education_form">
             <form onSubmit={handleSubmit}> 
                {educationForms.map((form, index) => (
                    <div key={index} id='form' >
                        <div className='div_heading add_exp'>
                            <h2>Education {index + 1}</h2>
                            {index === 0 ?
                                <div
                                    type="button"
                                    onClick={handleAddEducation}
                                >
                                    <li className='li_add_emp'>
                                        <IoMdAddCircleOutline />
                                        <div id='hover_P'>
                                            <p id='remove_p'>Add More</p>
                                            <div></div>
                                        </div>
                                    </li>
                                </div>
                                :
                                <div
                                    id='removeBtn'
                                    style={{ color: 'red', cursor: 'pointer' }}
                                    onClick={() => handleRemoveEducation(index)}
                                >
                                    <li className='li_add_emp '>
                                        <IoMdCloseCircleOutline />
                                        <div id='hover_P'>
                                            <p id='remove_p'>Remove</p>
                                            <div></div>
                                        </div>
                                    </li>
                                </div>
                            }
                        </div>

                        <div className="from1">
                            <div className="form-group">
                                <label>Institute Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Institute Name"
                                    name="instituteName"
                                    value={form.instituteName}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Degree</label>
                                <input
                                    type="text"
                                    name="degree"
                                    placeholder='Enter Degree '
                                    value={form.degree}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Specialization</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    value={form.specialization}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                    placeholder='Enter Specialization'
                                />
                            </div>

                            <div className="form-group">
                                <label>Attachment</label>
                                <div className="file-upload">
                                    <input
                                        type="file"
                                        name='attachment'
                                        accept="image/*"
                                        id="file"
                                        onChange={(e) => handleFileChange(index, e)}
                                        required
                                    />
                                    <label htmlFor="file" className="custom-file-upload">
                                        {!isUploaded && <GrCloudUpload className="upload-icon" />}
                                        {isUploaded ? fileName : 'Upload Document'}
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Date of Completion</label>
                                <input
                                    type="date"
                                    name="completionDate"
                                    value={form.completionDate}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                    placeholder='Date of Completion'
                                />
                            </div>
                            <div className="form-group " id='form_group_Duration'>
                                <div id='div_Duration'>
                                    <label> From</label>
                                    <label>To</label>
                                </div>
                                <div className='divDate'>
                                    <input
                                        type="date"
                                        name="fromDate"
                                        value={form.fromDate}
                                        onChange={(e) => handleChange(index, e)}
                                        required
                                    />
                                    <input
                                        type="date"
                                        name="toDate"
                                        value={form.toDate}
                                        onChange={(e) => handleChange(index, e)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
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
                        {error && <p>{error}</p>}
                    </div>
                </div>
              
            </form>
        </div>
    );
};

export default EducationForm;
