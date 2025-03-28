
import { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/productos');
        setProductos(response.data);
      } catch (err) {
        console.error('Error al obtener productos:', err);
      }
    };

    fetchProductos();
  }, []);

  return (
    <Container>
      <h2 className="my-4 text-center">Catálogo</h2>
      <Row>
        {productos.map((item) => (
          <Col md={6} lg={4} className="mb-4" key={item.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={item.imagen} alt={item.titulo} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{item.titulo}</Card.Title>
                <Card.Text>{item.descripcion}</Card.Text>
                <Card.Text className="font-weight-bold">{`$${item.precio}`}</Card.Text>
                <div className="mt-auto">
                  <Button variant="primary" className="mr-2">Más detalles</Button>
                  <Button variant="success" className="mr-2">Añadir a carrito</Button>
                  <Button variant="danger" className="mr-2">Sacar de carrito</Button>
                  <Button variant="warning">Comprar</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Catalogo;
