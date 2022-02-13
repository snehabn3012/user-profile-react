import React, { useContext } from 'react';
import './UserTable.css';

const UserTable = ({ UserContext }) => {
    const userList = useContext(UserContext);
    return (
        <div className="tableContainer">
            {
                userList && userList.length > 0
                    ? (
                        <>
                            <div className="header">All User Details </div>
                            <table className="userlistTable">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        userList.map(({ name: userName, age, email, phoneNumber }) => (
                                            <tr>
                                                <td>{userName}</td>
                                                <td>{age}</td>
                                                <td>{email}</td>
                                                <td>{phoneNumber}</td>
                                            </tr>
                                        ))

                                    }
                                </tbody>
                            </table>
                        </>
                    )
                    : <div className="noUserData">No User Data.</div>
            }
        </div>
    )
}

export default UserTable;