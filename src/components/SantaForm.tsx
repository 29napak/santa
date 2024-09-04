import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SantaForm.css'; // Import CSS file
import { fetchUsersAndProfiles } from '../utils/api';
import Modal from './Modal'; // Import Modal Component

const SantaForm = () => {
    const [userId, setUserId] = useState('');
    const [wish, setWish] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const { users, profiles } = await fetchUsersAndProfiles();
            console.log(users, profiles);
        };

        fetchData();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (wish.length > 100) {
            alert('Your wish is too long! Please keep it under 100 characters.');
            return;
        }

        console.log('Sending userid:', userId); // Check the userid before sending
        console.log('Sending wish:', wish); // Check the wish before sending

        try {
            const response = await axios.post('/', { userid: userId, wish });
            setModalMessage(response.data);
            setIsModalOpen(true); // Open Modal
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response); // Check the server response
                alert(error.response?.data || 'An error occurred');
            } else {
                alert('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="santa-form-container">
            <h1 className="glitter">🎄 A Letter to Santa 🎅</h1>

            <form onSubmit={handleSubmit} className="santa-form">
                <input
                    name="userid"
                    placeholder="charlie.brown"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="form-input"
                />
                <p className="form-text">What do you want for Christmas?</p>
                <textarea
                    name="wish"
                    rows={5}
                    maxLength={100}
                    placeholder="Gifts!"
                    value={wish}
                    onChange={(e) => setWish(e.target.value)}
                    className="form-textarea"
                ></textarea>
                <button type="submit" className="form-button">
                    Send
                </button>
            </form>

            {/* Add Modal for displaying messages */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                message={modalMessage}
            />
        </div>
    );
};

export default SantaForm;
