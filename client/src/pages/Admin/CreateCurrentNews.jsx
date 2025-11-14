import React from 'react'
import { useState } from 'react';
import { InputText } from "primereact/inputtext";
import { Button } from '../../Components/Button';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

function CreateCurrentNews() {

    const initialFormState = {
        title: '',
        description: '',
        message: '',
        file: null
    };


    const [newsInfo, setNewsInfo] = useState(initialFormState)

    const [load, setLoad] = useState(false);

    const{axios}=useAppContext()

    const navigate=useNavigate();



    const inputHandler = (e) => {
        const { name, value } = e.target;
        const fields = ['title', 'description', 'message'];

        if (fields.includes(name)) {
            // Allow only letters and spaces
            const regex = /^[a-zA-Z\s]*$/;
            if (!regex.test(value)) {
                return; // stop if invalid character
            }
        }

        setNewsInfo((prevData) => ({
            ...prevData,
            [name]: name !== 'file' ? value : e.target.files[0],
        }));
    };


    const handleSubmit = async () => {
        //  e.preventDefault();
        const formValid = newsInfo.title && newsInfo.description && newsInfo.message && newsInfo.file;

        if (formValid) {
            setLoad(true);
            const formData = new FormData();
            formData.append('title', newsInfo.title);
            formData.append('description', newsInfo.description);
            formData.append('message', newsInfo.message);
            formData.append('image', newsInfo.file)

            try {
                const { data: response } = await axios.post('/api/news/createNews', formData);

                if (response.success) {
                    toast.success(response.message);
                    setTimeout(() => {
                        setLoad(false);
                        setNewsInfo(initialFormState)
                        navigate('/app/current-news')
                    }, 2000)
                }
            } catch (error) {
                const errorMsg =
                    error.response?.data?.message || 'Something went wrong. Please try again.';
                toast.error(errorMsg);
                setLoad(false);
            }
        }
        else{
            toast.error('Please Fill All Fileds')
        }
    }

    return (
        <>
            <section>
                <div>
                    <div className="card p-4">
                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <InputText
                                    name="title"
                                    placeholder="Title"
                                    onChange={inputHandler}
                                    value={newsInfo.title}
                                />
                            </div>
                            <div className="col-md-4 mb-4">
                                <InputText
                                    name="description"
                                    placeholder="Description"
                                    onChange={inputHandler}
                                    value={newsInfo.description}
                                />
                            </div>
                            <div className="col-md-4 mb-4">
                                <InputText
                                    name="message"
                                    placeholder="Message"
                                    value={newsInfo.message}
                                    onChange={inputHandler}
                                />
                            </div>
                            <div className='col-md-4'>
                                <input type="file" name="file" onChange={inputHandler} />
                            </div>
                        </div>
                        <div>
                            <Button variant='primary' type='submit' emitBtn={handleSubmit} isLoading={load}>Create</Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateCurrentNews
