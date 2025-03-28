import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage';
import BenderChulo from '../assets/img/Bender-Chulo.jpg';
import Unknow_5 from '../assets/img/Unknow_5.jpg'
import A3ColourGlass from '../assets/img/A3ColourGlass.jpg'
import '../styles/dailyOfferCarousel.css';

function DailyOfferCarousel() {
  return (
    <Carousel>
      <Carousel.Item interval={600}>
        <div className="d-flex containerCarousel">
          <ExampleCarouselImage src={Unknow_5} alt="First slide" />
          <ExampleCarouselImage src={BenderChulo} alt="First slide" />
          <ExampleCarouselImage src={A3ColourGlass} alt="First slide" />
        </div>
        <Carousel.Caption>
          <h3>Impresiones personalizadas</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={600}>
        <div className="d-flex">
          <ExampleCarouselImage src={Unknow_5} alt="Second slide" />
          <ExampleCarouselImage src={A3ColourGlass} alt="Second slide" />
          <ExampleCarouselImage src={BenderChulo} alt="Second slide" />
        </div>
        <Carousel.Caption>
          <h3>Aprobecha las mejores ofertas</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="d-flex">
          <ExampleCarouselImage src={BenderChulo} alt="Third slide" />
          <ExampleCarouselImage src={Unknow_5} alt="Third slide" />
          <ExampleCarouselImage src={A3ColourGlass} alt="Third slide" />
        </div>
        <Carousel.Caption>
          <h3>Solo por tiempo limitado</h3>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default DailyOfferCarousel;
