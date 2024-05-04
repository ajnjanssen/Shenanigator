'use client'
import React, { useState } from 'react';

interface Item {
    id: number;
    name: string;
    assignedUser: string;
}

const NewItem: React.FC = () => {
    const [itemName, setItemName] = useState('');
    const [assignedUser, setAssignedUser] = useState('');

    // Dummy user list
    const [users] = useState([
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        { id: 3, name: 'User 3' },
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Generate a unique ID for the new item
        const newItemId = Math.floor(Math.random() * 1000);

        // Create a new item object
        const newItem: Item = {
            id: newItemId,
            name: itemName,
            assignedUser: assignedUser,
        };

        // TODO: Add logic to save the new item to your data source

        // Reset the form fields
        setItemName('');
        setAssignedUser('');
    };

    return (
        <div className="w-full p-4 bg-base-200 my-4 rounded-md">
            <form className="flex items-center justify-end gap-4" onSubmit={handleSubmit}>
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Shenanigan"
                        className="input input-bordered w-full"
                        id="itemName"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </div>
                <div>
                    <select
                        id="assignedUser"
                        className="select select-bordered"
                        value={assignedUser}
                        onChange={(e) => setAssignedUser(e.target.value)}
                    >
                        <option disabled value="">Select a user</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.name}>{user.name}</option>
                        ))}
                    </select>
                </div>
                
                <button type="submit" className=" btn btn-primary">Add Shenanigan</button>
            </form>
        </div>
    );
};

export default NewItem;
