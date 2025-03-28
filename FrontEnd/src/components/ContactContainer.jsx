import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Importa desde el paquete correcto
import { Button } from 'react-bootstrap'
function FlushExample() {
    const handleClick = () => {
        // Aquí puedes definir la lógica que deseas ejecutar al hacer clic en el botón
        alert('Conectando a API');
    };
    const handleClick2 = () => {
        // Aquí puedes definir la lógica que deseas ejecutar al hacer clic en el botón
        alert('Redireccionando a Facebook');
    };
    const handleClick3 = () => {
        // Aquí puedes definir la lógica que deseas ejecutar al hacer clic en el botón
        alert('Redireccionando a Instagram');
    };
    return (
        <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Empresa Imaginaria a tu gusto</Accordion.Header>
                <Accordion.Body className='text-center'>
                <Button variant="success" onClick={handleClick} className='p-2 m-2'>
                        <FontAwesomeIcon icon={faWhatsapp} /> Contactar por WhatsApp
                    </Button>
                    <Button variant="primary" onClick={handleClick2} className='p-2 m-2'>
                        <FontAwesomeIcon icon={faWhatsapp} /> Contactar por Facebook
                    </Button>
                    <Button variant="warning" onClick={handleClick3}className='p-2 m-2'>
                        <FontAwesomeIcon icon={faWhatsapp} /> Contactar por Instagram
                    </Button>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        
    );
    
}

export default FlushExample;
