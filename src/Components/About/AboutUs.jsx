import React from "react";
import './aboutUs.css';
import jahanzaib from "../images/jahanzaib.jpg";
import add from "../images/add.png";
import rayyan from "../images/rayyan.jpg";
import saad from "../images/Saad.jpg";
import rana from "../images/rana.jpg"; // Import the missing image

const teamMembers = [
    {
        name: 'Rana Sahab',
        title: 'Team lead and Misogynistic ah Developer.',
        description: 'Angry nigga',
        email: 'RanaShahmeer@example.com',
        imgSrc: rana // Use the imported image
    },
    {
        name: 'Jahanzaib Ali',
        title: 'Entertainer and Front end developer',
        description: ' GPT God',
        email: 'JahanzaibAli@example.com',
        imgSrc: jahanzaib // Use the imported image
    },
    {
        name: 'Rayyan Sajid',
        title: 'Backend Developer',
        description: 'bobby sajid',
        email: 'SajidMajid@example.com',
        imgSrc: rayyan // Use the imported image
    },
    {
        name: 'Saad Shoaib',
        title: 'Full stack developer',
        description: ' Captaan',
        email: 'Saadshoaib@example.com',
        imgSrc: saad
    }
];

const AboutUs = () => {
    return (
        <div className="about-us">
            <section className="intro">
                <h1>About Us</h1>
                <p>We are a team of dedicated professionals committed to providing exceptional service. Our mission is to deliver high-quality solutions that meet your needs.</p>
            </section>
            <section className="team">
                <h2>Our Team</h2>
                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-member">
                            <img src={member.imgSrc} alt={member.name} />
                            <div className="member-info">
                                <h3>{member.name}</h3>
                                <p className="title">{member.title}</p>
                                <p>{member.description}</p>
                                <p>{member.email}</p>
                                <button>Contact</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
