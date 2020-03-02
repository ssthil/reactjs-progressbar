import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Navbar } from 'react-bootstrap';
import './style.css'

export default function Header({ title }) {
  return (
    <Navbar bg="light" fixed="top" className="max-width">
      <Navbar.Brand>{title}</Navbar.Brand>
    </Navbar>
  );
}
