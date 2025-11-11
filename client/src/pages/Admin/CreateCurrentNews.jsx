import React from 'react'
import { useState } from 'react';
import { InputText } from "primereact/inputtext";
import { Button } from '../../Components/Button';

function CreateCurrentNews() {

    const [newsInfo, setNewsInfo] = useState({})



    const inputHandler = (e) => {
        const { name, value, files } = e.target;

        setNewsInfo((prevData) => ({
            ...prevData,
            [name]: name !== 'file' ? value : files[0],
        }));
    };

    const handleSubmit = () => {
        //  e.preventDefault();
        console.log('news form', newsInfo)
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
                                />
                            </div>
                            <div className="col-md-4 mb-4">
                                <InputText
                                    name="description"
                                    placeholder="Description"
                                    onChange={inputHandler}
                                />
                            </div>
                            <div className="col-md-4 mb-4">
                                <InputText

                                    name="message"
                                    placeholder="Message"
                                    onChange={inputHandler}
                                />
                            </div>
                            <div className='col-md-4'>
                                <input type="file" name="file" onChange={inputHandler} />
                            </div>
                        </div>
                        <div>
                            <Button variant='primary' type='submit' emitBtn={handleSubmit}>Create</Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateCurrentNews
