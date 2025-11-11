import React, { useEffect, useState } from 'react';
import PageTitle from '../Components/PageTitle';
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Button } from '../Components/Button';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function RaisesComplaints() {
  const [complaintInfo, setComplaintInfo] = useState({
    title: '',
    description: '',
    street: '',
    contactNumber: '',
    houseNo: '',
    houseThalaivarName: '',
    houseThalaivarNumber: '',
  });

  const [file, setFile] = useState(null);

  const [errors, setErrors] = useState({});

  const [token, setToken] = useState(null);

  const [loading, isLoading] = useState(false);


  const { axios } = useAppContext();

  const navigate = useNavigate();



  const inputHandler = (e) => {
    const { name, value } = e.target;

    const alphabetFields = ['title', 'description', 'street', 'houseThalaivarName'];

    const numberFields = ['contactNumber', 'houseThalaivarNumber'];

    if (alphabetFields.includes(name)) {
      const regex = /[^a-zA-Z\s]/g;
      if (regex.test(value)) {
        return;
      }
    }

    if (numberFields.includes(name)) {
      const regex = /[^0-9]/g;

      if (regex.test(value) || value.length > 10) {
        return;
      }
    }

    setComplaintInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  }


  const validateForm = () => {
    let newErrors = {};

    // Check if any required field is empty
    const requiredFields = [
      'title',
      'description',
      'street',
      'contactNumber',
      'houseNo',
      'houseThalaivarName',
      'houseThalaivarNumber',
    ];

    const missingFields = requiredFields.filter(
      (field) => !complaintInfo[field]?.trim()
    );

    if (missingFields.length > 0) {
      newErrors.form = 'All fields are required.';
    }

    setErrors(newErrors);

    // Return true if valid, false if not
    console.log('newErrors', newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      isLoading(true);
      try {
        const formData = new FormData();
        formData.append('title', complaintInfo.title);
        formData.append('description', complaintInfo.description);
        formData.append('street', complaintInfo.street);
        formData.append('contact', complaintInfo.contactNumber);
        formData.append('houseNo', complaintInfo.houseNo);
        formData.append('houseThalaivarName', complaintInfo.houseThalaivarName);
        formData.append('houseThalaivarNumber', complaintInfo.houseThalaivarNumber);

        if (file) {
          formData.append('image', file);
        }

        const { data: response } = await axios.post('/api/complaint/createComplaint', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.success) {
          toast.success('Complaint raised successfully');
          setTimeout(() => {
            isLoading(false);
            navigate('/app/view-complaints');
          }, 2000);
        }

      } catch (error) {
        const errorMsg =
          error.response?.data?.message || 'Something went wrong. Please try again.';
        toast.error(errorMsg);
        isLoading(false);
      }
    } else {
      console.log('Form has validation errors.');
    }
  };



  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    setToken(token);
  })
  return (
    <>
      <PageTitle title={'Raise Complaint'} />

      <div className="card p-4">
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-4">
                <InputText
                  onChange={inputHandler}
                  name="title"
                  placeholder="Title"
                  value={complaintInfo.title}
                />
              </div>
              <div className="col-md-6 mb-4">
                <InputText
                  onChange={inputHandler}
                  name="description"
                  placeholder="Description"
                  value={complaintInfo.description}
                />
              </div>
              <div className="col-md-6 mb-4">
                <InputText
                  onChange={inputHandler}
                  name="street"
                  placeholder="Street"
                  value={complaintInfo.street}
                />
              </div>
              <div className="col-md-6 mb-4">
                <InputText
                  onChange={inputHandler}
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={complaintInfo.contactNumber}
                />
              </div>
              <div className="col-md-6 mb-4">
                <InputText
                  onChange={inputHandler}
                  name="houseNo"
                  placeholder="House No"
                  value={complaintInfo.houseNo}
                />
              </div>
              <div className="col-md-6 mb-4">
                <InputText
                  onChange={inputHandler}
                  name="houseThalaivarName"
                  placeholder="Your House Thalaivar Name"
                  value={complaintInfo.houseThalaivarName}
                />
              </div>
              <div className="col-md-6 mb-4">
                <InputText
                  onChange={inputHandler}
                  name="houseThalaivarNumber"
                  placeholder="Your House Thalaivar Number"
                  value={complaintInfo.houseThalaivarNumber}
                />
              </div>
              <div className="col-md-6 d-flex align-items-center gap-2 mb-4">
                <input type="file" name="file" onChange={fileHandler} />
                <div>
                  {file && (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Uploaded preview"
                      style={{ width: '50px', height: '50px' }}
                    />
                  )}

                </div>

              </div>

              {errors.form && (
                <p style={{ color: 'red', marginLeft: '15px' }}>{errors.form}</p>
              )}

              <div className="col-12">
                <Button variant="primary" type="submit" emitBtn={handleSubmit} isLoading={loading}>
                  Raise Complaint
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RaisesComplaints;
