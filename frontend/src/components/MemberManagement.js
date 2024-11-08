// src/components/MemberManagement.js
import React, { useState, useEffect } from 'react';
import Dialog from './Dialog';

const MemberManagement = () => {
    const [members, setMembers] = useState([]);
    const [newMember, setNewMember] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        phone: ''
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch('/api/members');
                const data = await response.json();
                setMembers(data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, []);

    const handleAddMember = async (e) => {
        e.preventDefault();

        const formData = new URLSearchParams(); // Create form data
        formData.append('firstName', newMember.firstName);
        formData.append('lastName', newMember.lastName);
        formData.append('dateOfBirth', newMember.dateOfBirth);
        formData.append('email', newMember.email);
        formData.append('phone', newMember.phone);

        try {
            const response = await fetch('/api/members/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Set content type for form data
                },
                body: formData.toString(), // Convert form data to string
            });

            if (response.ok) {
                const addedMember = await response.text(); // Assuming the response is just a success message
                setMembers([...members, { ...newMember, memberId: members.length + 1 }]); // Adjusting ID temporarily
                setNewMember({ firstName: '', lastName: '', dateOfBirth: '', email: '', phone: '' });
                setIsDialogOpen(false); // Close the dialog
            } else {
                const errorText = await response.text(); // Read error message
                alert(errorText || 'Error adding member');
            }
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };

    return (
        <div>
            <h2>Member Management</h2>
            <button onClick={() => setIsDialogOpen(true)}>Add New Member</button>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date of Birth</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.memberId}>
                            <td>{member.firstName}</td>
                            <td>{member.lastName}</td>
                            <td>{member.dateOfBirth}</td>
                            <td>{member.email}</td>
                            <td>{member.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <h3>Add a New Member</h3>
                <form onSubmit={handleAddMember}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={newMember.firstName}
                        onChange={(e) => setNewMember({ ...newMember, firstName: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={newMember.lastName}
                        onChange={(e) => setNewMember({ ...newMember, lastName: e.target.value })}
                        required
                    />
                    <input
                        type="date"
                        placeholder="Date of Birth"
                        value={newMember.dateOfBirth}
                        onChange={(e) => setNewMember({ ...newMember, dateOfBirth: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newMember.email}
                        onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={newMember.phone}
                        onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                        required
                    />
                    <button type="submit">Add Member</button>
                </form>
            </Dialog>
        </div>
    );
};

export default MemberManagement;
