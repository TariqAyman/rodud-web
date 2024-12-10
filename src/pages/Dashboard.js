import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fetchData } from '../services/apiService';
import { FaMapMarkerAlt, FaBox, FaWeightHanging, FaCalendarDay, FaClock, FaCheckCircle } from 'react-icons/fa';
import { Spinner, Alert, Button } from 'react-bootstrap';
import { FaSync } from 'react-icons/fa';

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const StyledCard = styled(Card)`
  flex: 1 0 21%; /* Adjust the percentage to control the number of cards per row */
  min-width: 250px;
  max-width: 300px;
  margin-bottom: 20px;
`;

const StyledContainer = styled(Container)`
  padding: 50px 15px;
  min-height: 100vh;
`;

const StyledCardTitle = styled(Card.Title)`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
`;

const StyledCardText = styled(Card.Text)`
  font-size: 0.95rem;
  color: #555;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Heading = styled.h2`
  text-align: center;
    margin-bottom: 40px;
    margin-top: -60px;
    font-weight: 700;
    color: #007bff;
`;

const LinkText = styled.div`
  text-align: center;
  margin-top: 30px;
  font-size: 1rem;
`;

const AddRequestLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const RefreshButton = styled(Button)`
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: ${props =>
    props.status === 'delivered' ? '#28a74520' :
      props.status === 'in-progress' ? '#007bff20' : '#dc354520'};
  color: ${props =>
    props.status === 'delivered' ? '#28a745' :
      props.status === 'in-progress' ? '#007bff' : '#dc3545'};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  background: #f8f9fa;
  border-radius: 12px;
  margin: 20px 0;
`;

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    links: [],
  });

  const fetchOderRequests = async (url = 'orders') => {
    try {
      setLoading(true);
      const data = await fetchData(url);
      setOrders(data);
      setPagination(data.meta);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOderRequests();
  }, []);

  const handlePageChange = (url) => {
    if (url) {
      fetchOderRequests(url);
    }
  };

  if (loading) {
    return (
      <StyledContainer className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </StyledContainer>
    );
  }
  return (
    <StyledContainer>
      <Heading>Order Request Dashboard</Heading>
      <RefreshButton variant="outline-primary" onClick={fetchOderRequests}>
        <FaSync /> Refresh
      </RefreshButton>
      {!orders.data?.length ? (
        <EmptyState>
          <h3>No Orders Found</h3>
          <p>Start by creating your first order request</p>
          <AddRequestLink to="/order-request" className="btn">
            Create Order Request
          </AddRequestLink>
        </EmptyState>
      ) : (
        <Row>

          <FlexContainer>
            {orders.data.map((order) => (
              <StyledCard key={order.id}>
                <Card.Body>
                  <Card.Title>Order Request #{order.id}</Card.Title>
                  <Card.Text>
                    <FaMapMarkerAlt color="#007bff" /> <strong>Pickup Location:</strong> {order.pickup_location}<br />
                    <FaMapMarkerAlt color="#007bff" /> <strong>Delivery Location:</strong> {order.delivery_location}<br />
                    <FaMapMarkerAlt color="#ffc107" /> <strong>Item:</strong> {order.item}<br />
                    <FaMapMarkerAlt color="#ffc107" /> <strong>Size:</strong> {order.size}<br />
                    <FaMapMarkerAlt color="#007bff" /> <strong>Pickup Time:</strong> {order.pickup_at}<br />
                    <FaClock color="#17a2b8" /> <strong>Delivery Time:</strong> {order.delivery_at}<br />
                    <FaCheckCircle color={order.status === 'delivered' ? '#28a745' : '#dc3545'} />
                    <strong> Status:</strong>
                    <StatusBadge status={order.status}>{order.status}</StatusBadge>
                  </Card.Text>
                </Card.Body>
              </StyledCard>
            ))}
          </FlexContainer>
        </Row>
      )}

      <Pagination>
        {pagination.links.map((link, index) => (
          <Pagination.Item
            key={index}
            active={link.active}
            onClick={() => handlePageChange(link.url)}
            disabled={!link.url}
          >
            {link.label.replace(/&laquo;|&raquo;/g, '')}
          </Pagination.Item>
        ))}
      </Pagination>

      <LinkText>
        <AddRequestLink to="/order-request">
          Create Order Request
        </AddRequestLink>
      </LinkText>
    </StyledContainer>
  );
};

export default Dashboard;
