import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { profileGet } from '../services/apiService';
import '../assets/css/profile.css';
import { getToken } from '../utils/authUtils';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });

  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const token = getToken();
      const data = await profileGet('/me');

      setProfile(data.data);
    } catch (error) {
      setError('Failed to fetch profile data. Please try again later.');
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfile();

  }, []);

  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Card className="profile-card">
            <Card.Body>
              <Card.Title className="text-center">
                <FaUser /> {profile.name}
              </Card.Title>
              <Card.Text>
                {error ? (
                  <div className="text-center text-danger">{error}</div>
                ) : (
                  <>
                    <div className="profile-detail">
                      <FaEnvelope /> {profile.email}
                    </div>
                  </>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
