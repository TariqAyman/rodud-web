import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../services/apiService';
import logo from '../assets/images/logo.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Arial, sans-serif';
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 30px;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const Spinner = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LinkText = styled.div`
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  color: #007bff;
`;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await postData('register', {
        name: name,
        email,
        password,
        password_confirmation,
      });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Logo src={logo} alt="Logo" />
      <FormWrapper>
        <Title>Register</Title>
        <form onSubmit={handleRegister}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <ErrorText>{errors.name[0]}</ErrorText>}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <ErrorText>{errors.email[0]}</ErrorText>}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <ErrorText>{errors.password[0]}</ErrorText>}
          <Input
            type="password_confirmation"
            placeholder="password_confirmation"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          {errors.password_confirmation && <ErrorText>{errors.password_confirmation[0]}</ErrorText>}
          <Button type="submit">
            {loading ? <Spinner /> : 'Register'}
          </Button>
          
        </form>
        <LinkText>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
            Login
          </Link>
        </LinkText>
      </FormWrapper>
    </Container>
  );
};

export default Register;
