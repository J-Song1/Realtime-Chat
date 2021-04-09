import Navbar from 'react-bootstrap/Navbar';
import { FaRocketchat } from 'react-icons/fa'
import './NavigationBar.css'

function NavigationBar() {
  return (
    <Navbar className="navbar-wrapper" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <FaRocketchat />
        {" "}
        Realtime Chat Application
        </Navbar.Brand>
    </Navbar>
  )
}

export default NavigationBar;