import { Navbar, Container, Nav } from 'react-bootstrap';

const AppNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ fontSize: '0.9rem' }}>
      <Container>
        <Navbar.Brand href="#home">Inicio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#catalogo">Catálogo de Productos</Nav.Link>
            <Nav.Link href="#acerca">Acerca de Nosotros</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
