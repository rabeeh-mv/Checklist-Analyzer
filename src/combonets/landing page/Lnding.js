import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f8ff;
  font-family: 'Arial', sans-serif;
  color: #333;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0;
  padding: 20px;
  text-align: center;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #555;
`;

const Button = styled(motion.button)`
  padding: 15px 30px;
  background-color: #0288d1;
  color: white;
  border: none;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 30px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #01579b;
  }
    Link{
  color: white;
    text-direction:none;
    }
`;

const LandingPage = () => {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Title>Welcome to Our  Checklist Analyzer</Title>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <Subtitle>For Value Investers</Subtitle>
      </motion.div>
      <Link to="/Checklist">
      <Button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Get Started
      </Button>
      </Link>
    </Container>
  );
};

export default LandingPage;
