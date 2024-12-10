import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaBox, FaWeight, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { getToken } from '../utils/authUtils';
import { postData } from '../services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const LinkText = styled.div`
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
    color: #007bff;
`;

const CustomForm = styled(Form)`
    background: #ffffff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
`;

const CustomControl = styled(Form.Control)`
    border-radius: 8px;
    border: 1px solid #ced4da;
    box-shadow: none;
    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25);
    }
`;

const CustomButton = styled(Button)`
    background-color: #007bff;
    border-color: #007bff;
    border-radius: 8px;
    &:hover {
        background-color: #0056b3;
        border-color: #004085;
    }
`;

const Title = styled.h2`
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
`;

const FieldGroup = styled(Form.Group)`
    margin-bottom: 20px;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const Icon = styled.div`
    color: #007bff;
    font-size: 1.5rem;
    margin-right: 10px;
`;

const OrderRequestForm = ({ addRequest }) => {
    const [formData, setFormData] = useState({
        pickup_location: '',
        delivery_location: '',
        item: '',
        size: '',
        weight: '',
        pickup_at: '',
        delivery_at: '',
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (value, name) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date, name) => {
        setFormData({ ...formData, [name]: date });
    };

    const formatDate = (date) => {
        const [year, month, day] = date.split('-');
        return `${year}-${month}-${day}`;
    };

    const validateForm = () => {
        const newErrors = {};
        // Add validation logic here
        if (!formData.pickup_location) newErrors.pickup_location = ['Pickup location is required'];
        if (!formData.delivery_location) newErrors.delivery_location = ['Delivery location is required'];
        // ... other validations ...
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setErrors({});

        const token = getToken();

        const formattedData = {
            pickup_location: formData.pickup_location,
            delivery_location: formData.delivery_location,
            item: formData.item,
            size: formData.size,
            weight: formData.weight,
            pickup_at: formData.pickup_at.toISOString().split('T')[0],
            delivery_at: formData.delivery_at.toISOString().split('T')[0],
        };

        try {
            const response = await postData('orders', formattedData);

            setFormData({
                pickup_location: '',
                delivery_location: '',
                item: '',
                size: '',
                weight: '',
                pickup_at: new Date(),
                delivery_at: new Date(),
            });

            toast.success('Order request submitted successfully!');
            setTimeout(() => navigate('/dashboard'), 2000);

        } catch (err) {
            if (err.response && err.response.data.errors) {
                const validationErrors = err.response.data.errors;
                setErrors(validationErrors);
            } else {
                setErrors({ general: 'An error occurred' });
                toast.error('An error occurred');
            }
        } finally {
            setLoading(false);
        }
    };
    const renderFieldGroup = (controlId, label, icon, type = 'text', name) => (
        <FieldGroup controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <IconContainer>
                <Icon>{icon}</Icon>
                {type === 'date' ? (
                    <DatePicker
                        selected={formData[name]}
                        onChange={(date) => handleDateChange(date, name)}
                        className="form-control"
                        dateFormat="yyyy-MM-dd"
                        isInvalid={!!errors[name]}
                        required
                    />
                ) : (
                    <CustomControl
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={(e) => handleChange(e.target.value, name)}
                        isInvalid={!!errors[name]}
                        required
                    />
                )}
            </IconContainer>
            {errors[name] && (
                <Form.Control.Feedback type="invalid">
                    {errors[name][0]}
                </Form.Control.Feedback>
            )}
        </FieldGroup>
    );

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Title className="text-center">Truck Request Form</Title>
                    <CustomForm onSubmit={handleSubmit}>
                        {renderFieldGroup('pickup_location', 'Pickup Location', <FaBox />, 'text', 'pickup_location')}
                        {renderFieldGroup('delivery_location', 'Delivery Location', <FaBox />, 'text', 'delivery_location')}
                        {renderFieldGroup('item', 'Item', <FaBox />, 'text', 'item')}
                        {renderFieldGroup('size', 'Size', <FaBox />, 'text', 'size')}
                        {renderFieldGroup('weight', 'Weight', <FaWeight />, 'text', 'weight')}
                        {renderFieldGroup('pickup_at', 'Pickup Date', <FaCalendarAlt />, 'date', 'pickup_at')}
                        {renderFieldGroup('delivery_at', 'Delivery Date', <FaCalendarAlt />, 'date', 'delivery_at')}

                        <CustomButton variant="primary" type="submit" className="w-100 my-3" disabled={loading}>
                            {loading ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                <>
                                    <FaArrowRight style={{ marginRight: '10px' }} /> Submit Request
                                </>
                            )}
                        </CustomButton>
                        {errors.general && <div className="text-danger text-center my-2">{errors.general}</div>}
                        <LinkText>
                            <Link to="/dashboard" style={{ color: '#007bff', textDecoration: 'none' }}>
                                Go To Dashboard
                            </Link>
                        </LinkText>
                    </CustomForm>
                    <ToastContainer />
                </Col>
            </Row>
        </Container>
    );
};

export default OrderRequestForm;
