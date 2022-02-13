import React, { useEffect, useState, createContext } from 'react';

import UserTable from './UserTable';
import FormErrors from './FormErrors'

import './UserDetailForm.css';

const UserDetailForm = () => {

    const [data, setData] = useState({});
    const [userList, setUserList] = useState([]);

    const UserContext = createContext();

    const validateField = () => {
        const nameValid = data.name.match(/^[A-Za-z]+$/);
        const ageValid = data.age > 0 && data.age < 150;
        const emailValid = data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        const phoneNumberValid = data.phoneNumber.length === 10;

        const fieldValidationErrors = {
            name: nameValid ? '' : 'Only alphabets to be used for names',
            age: ageValid ? '' : 'Age should be less than 150',
            email: emailValid ? '' : 'Please enter valid Email',
            phoneNumber: phoneNumberValid ? '' : 'Please enter 10 digits of valid mobile number'
        }

        setData({
            ...data,
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            phoneNumberValid: phoneNumberValid,
        });
        
        return nameValid && ageValid && emailValid && phoneNumberValid;
    }

    const onInputChange = (event, key) => {
        const value = event.target.value;
        setData({
            ...data,
            [key]: value
        })
    }

    const handleSubmit = () => {
        if (!validateField()) return;
        const { name, age, email, phoneNumber } = data;
        const formData = {
            name,
            age,
            email,
            phoneNumber
        }
        setUserList([...userList, formData]);
        resetForm();
    }

    const resetForm = () => {
        setData({
            name: '',
            age: '',
            email: '',
            phoneNumber: '',
            formErrors: { 
                name: '',
                age: '',
                email: '', 
                phoneNumber: '' 
            },
            emailValid: false,
            phoneNumberValid: false
        })
    };

    useEffect(() => {
        resetForm();
    }, [])

    return (
        <div className="formContainer">
            <div className="boxContainer">
                <div className="header">
                    Please enter user details
                </div>
                <div className="demoForm" onSubmit={() => handleSubmit()}>
                    <div className="formControl">
                        <label>Name*</label>
                        <input
                            type="text" value={data.name}
                            onChange={(e) => onInputChange(e, 'name')}
                        />
                    </div>


                    <div className="formControl">
                        <label>age*</label>
                        <input
                            type="number"
                            value={data.age}
                            onChange={(e) => onInputChange(e, 'age')}
                        />
                    </div>

                    <div className="formControl">
                        <label>Email*</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => onInputChange(e, 'email')}
                        />
                    </div>

                    <div className="formControl">
                        <label>Phone Number*</label>
                        <input
                            type="number"
                            value={data.phoneNumber}
                            onChange={(e) => onInputChange(e, 'phoneNumber')}
                        />
                    </div>

                    <div className="errorDisplay">
                        <FormErrors formErrors={data.formErrors} />
                    </div>

                    <div className="formControl">
                        <div>{data.name} {data.age} {data.email} {data.phoneNumber}</div>
                        <div className="btnContainer">
                            <input
                                type="submit"
                                className="submitBtn"
                                disabled={!data.name || !data.age || !data.email || !data.phoneNumber}
                                value="Submit"
                                onClick={handleSubmit}
                            />
                            <input
                                type="submit"
                                className="resetBtn"
                                value="Reset"
                                onClick={resetForm}
                            />
                        </div>
                    </div>

                </div>
            </div>


            <UserContext.Provider value={userList}>
                <UserTable UserContext={UserContext} />
            </UserContext.Provider>
        </div>
    );
};

export default UserDetailForm;