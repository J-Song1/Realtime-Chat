import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FaRocketchat, FaCamera } from 'react-icons/fa'
import chatImage from './chatImage.png'
import { useState } from 'react'

import MainPage from './components/pages/MainPage'

function App() {
  return (
    <MainPage />
  );
}

export default App;
