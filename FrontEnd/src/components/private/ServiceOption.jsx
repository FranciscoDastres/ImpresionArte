import { Container, Row, Col, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import DeliveryExpress from './DeliveryExpress';
import FreeDelivery from './FreeDelivery';
import Pickup from './PickUp';
import TechnicalConsultancy from './TechnicalConsultancy';

const ServiceOptions = () => {
  const renderTooltip = (props, title) => (
    <Tooltip id="button-tooltip" {...props}>
      Click to know more about {title}
    </Tooltip>
  );

  return (
    <Container>
      <h2 className="my-4 text-center"></h2>
      <Row>
        <Col md={6} lg={3} className="mb-4 d-flex align-items-stretch">
          <Card className="w-100">
            <Card.Body className="d-flex flex-column">
              <OverlayTrigger
                placement="top"
                overlay={(props) => renderTooltip(props, 'Delivery Express')}
              >
                <Card.Title>
                  <a href="#deliveryExpress" className="stretched-link">Delivery Express</a>
                </Card.Title>
              </OverlayTrigger>
              <DeliveryExpress />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-4 d-flex align-items-stretch">
          <Card className="w-100">
            <Card.Body className="d-flex flex-column">
              <OverlayTrigger
                placement="top"
                overlay={(props) => renderTooltip(props, 'Free Delivery')}
              >
                <Card.Title>
                  <a href="#freeDelivery" className="stretched-link">Free Delivery</a>
                </Card.Title>
              </OverlayTrigger>
              <FreeDelivery />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-4 d-flex align-items-stretch">
          <Card className="w-100">
            <Card.Body className="d-flex flex-column">
              <OverlayTrigger
                placement="top"
                overlay={(props) => renderTooltip(props, 'Pickup')}
              >
                <Card.Title>
                  <a href="#pickup" className="stretched-link">Pickup</a>
                </Card.Title>
              </OverlayTrigger>
              <Pickup />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-4 d-flex align-items-stretch">
          <Card className="w-100">
            <Card.Body className="d-flex flex-column">
              <OverlayTrigger
                placement="top"
                overlay={(props) => renderTooltip(props, 'Technical Consultancy')}
              >
                <Card.Title>
                  <a href="#technicalConsultancy" className="stretched-link">Technical Consultancy</a>
                </Card.Title>
              </OverlayTrigger>
              <TechnicalConsultancy />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceOptions;
