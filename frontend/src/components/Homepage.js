// src/components/Homepage.js
import React from 'react';
import Map from './Map';

const Homepage = () => {
    return (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>

            <h1><strong>Welcome to our library!</strong></h1>
            <p>
                Welcome! We are the best library in the UK! On our site you can manage your book reservations!
            </p>
            <img 
                src="tenor.gif" 
                alt="Welcome GIF" 
                style={{ width: '100%', maxWidth: '600px', margin: '20px 0' }} 
            />

            <h2>About Us</h2>
            <p>
                Welcome to our library! We are dedicated to providing a rich collection of books and resources to our community. Our mission is to promote literacy, lifelong learning, and a love for reading. Whether you're a student, a researcher, or a casual reader, we have something for everyone.
            </p>

            <h2>News</h2>
            <p>
                We are excited to announce the opening of our new reading room, which will be available to the public starting next month! Join us for our grand opening event, where we will host author readings, book signings, and refreshments. Stay tuned for more details!
            </p>

            <h2>Meet the Team</h2>
            <p>
                Our team is passionate about literature and dedicated to serving our community. Here are a few of our key team members:
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ textAlign: 'center' }}>
                    <img src="IMG_7629.jpg" alt="Jane Doe" style={{ width: '100px', height: '120px', borderRadius: '50%' }} />
                    <h3>William</h3>
                    <p><strong>Library Director:</strong> William oversees the library’s operations and is committed to enhancing community engagement.</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <img src="IMG_3358.jpeg" alt="John Smith" style={{ width: '100px', height: '120px', borderRadius: '50%' }} />
                    <h3>Harry</h3>
                    <p><strong>Head Librarian:</strong> Harry is an expert in library sciences and helps curate our collection.</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <img src="20240825_103937.jpg" alt="Emily Johnson" style={{ width: '100px', height: '120px', borderRadius: '50%' }} />
                    <h3>Stylianos</h3>
                    <p><strong>Community Outreach Coordinator:</strong> Stylianos works on programs and events that connect the library to the community.</p>
                </div>
            </div>

            <h2>Find Us</h2>
            <p>
                We are located down the road at the library.
            </p>
            <Map /> {/* Include the Map component */}


            <h2>Contact Us</h2>
            <p>
                Call us on our new phone number: 999
            </p>

        </div>
    );
};

export default Homepage;
