
import React, { useState } from 'react';

const Usermanagement = ({ users, setUsers, currentUser }) => {
    const [newUserName, setNewUserName] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');

    const handleAddUser = () => {
        if (newUserName.trim() === '' || newUserPassword.trim() === '') {
            alert("Both username and password are required");
            return;
        }
        
        const newUser = { id: Date.now(), name: newUserName, password: newUserPassword };
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setNewUserName(''); 
        setNewUserPassword('');
    };

    const handleDeleteUser = (id) => {
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id)); 
    };

    return (
        <div>
            <h2>User Management</h2>
            <input
                type="text"
                placeholder="Add new username"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
            />
            <input
                type="password"
                placeholder="Add new password"
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
            />
            <button onClick={handleAddUser}>Add User</button>

            <h3>User List</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name}
                        {user.name !== currentUser.name && ( // Don't allow deleting the current user
                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Usermanagement;