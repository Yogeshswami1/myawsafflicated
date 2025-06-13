import React from 'react';
import styles from './About.module.css';

// Sample data for timeline, team, and partners
const timelineData = [
  {
    year: '2020',
    event: 'Founded DealFinder',
    description: 'Started our journey to find the best deals for consumers.',
  },
  {
    year: '2021',
    event: 'First 1,000 Users',
    description: 'Reached our first milestone with 1,000 happy users.',
  },
  {
    year: '2023',
    event: 'Partnered with Amazon',
    description: 'Expanded our affiliate network with Amazon and Flipkart.',
  },
  {
    year: '2025',
    event: 'Launched Blog',
    description: 'Introduced our blog to share reviews, guides, and tutorials.',
  },
];

const teamData = [
  {
    name: 'John Doe',
    role: 'Founder & CEO',
    bio: 'John is passionate about finding the best deals and helping consumers save money.',
    image: 'https://picsum.photos/200/200?random=1',
  },
  {
    name: 'Jane Smith',
    role: 'Head of Marketing',
    bio: 'Jane leads our marketing efforts with a focus on user engagement.',
    image: 'https://picsum.photos/200/200?random=2',
  },
  {
    name: 'Alex Brown',
    role: 'Lead Developer',
    bio: 'Alex builds the tech that powers DealFinder’s seamless experience.',
    image: 'https://picsum.photos/200/200?random=3',
  },
];

const partnerLogos = [
  { name: 'Amazon', logo: 'https://picsum.photos/150/50?random=1' },
  { name: 'Flipkart', logo: 'https://picsum.photos/150/50?random=2' },
  { name: 'TechCrunch', logo: 'https://picsum.photos/150/50?random=3' },
  { name: 'Forbes', logo: 'https://picsum.photos/150/50?random=4' },
];

const About = () => {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>About DealFinder</h1>
        <p className={styles.heroSubtitle}>
          We’re on a mission to help you find the best deals, every day.
        </p>
      </section>

      {/* Story Timeline */}
      <section className={styles.timelineSection}>
        <h2 className={styles.sectionTitle}>Our Story</h2>
        <div className={styles.timeline}>
          {timelineData.map((item, index) => (
            <div
              key={index}
              className={`${styles.timelineItem} ${
                index % 2 === 0 ? styles.left : styles.right
              }`}
            >
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineYear}>{item.year}</h3>
                <h4 className={styles.timelineEvent}>{item.event}</h4>
                <p className={styles.timelineDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team */}
      <section className={styles.teamSection}>
        <h2 className={styles.sectionTitle}>Meet the Team</h2>
        <div className={styles.teamGrid}>
          {teamData.map((member, index) => (
            <div key={index} className={styles.teamCard}>
              <img
                src={member.image}
                alt={member.name}
                className={styles.teamImage}
              />
              <div className={styles.teamInfo}>
                <h3 className={styles.teamName}>{member.name}</h3>
                <p className={styles.teamRole}>{member.role}</p>
                <div className={styles.teamBio}>{member.bio}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Video */}
      <section className={styles.missionSection}>
        <h2 className={styles.sectionTitle}>Our Mission</h2>
        <div className={styles.videoWrapper}>
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Our Mission"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p className={styles.videoNote}>
            *Placeholder video. Replace with your mission video URL.
          </p>
        </div>
      </section>

      {/* How We Curate Deals */}
      <section className={styles.curateSection}>
        <h2 className={styles.sectionTitle}>How We Curate Deals</h2>
        <div className={styles.curateContent}>
          <div className={styles.curateStep}>
            <h3>1. Research</h3>
            <p>We scour the web for the best deals from trusted partners.</p>
          </div>
          <div className={styles.curateStep}>
            <h3>2. Verify</h3>
            <p>We verify each deal to ensure authenticity and value.</p>
          </div>
          <div className={styles.curateStep}>
            <h3>3. Share</h3>
            <p>We share the best deals with you, updated daily.</p>
          </div>
        </div>
      </section>

      {/* Press Badges & Partner Logos */}
      <section className={styles.partnersSection}>
        <h2 className={styles.sectionTitle}>Featured In</h2>
        <div className={styles.partnerLogos}>
          {partnerLogos.map((partner, index) => (
            <img
              key={index}
              src={partner.logo}
              alt={partner.name}
              className={styles.partnerLogo}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;