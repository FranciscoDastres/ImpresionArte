import Header from '../components/Header';
import AppNavbar from '../components/AppNavbar';
import ContactContainer from '../components/ContactContainer';
import DailyOffer from '../components/DailyOfferCarousel';
import ServiceOptions from '../components/private/ServiceOption';
import '../styles/homePage.css'
import Catalogo from '../components/public/Catalogo';
const HomePage = () => {

  return (
    <div className='Container-HomePage'>

      <Header />
      <AppNavbar />
      <DailyOffer />
      <ServiceOptions />
      <ContactContainer />
      <Catalogo />
    </div>
  )
}

export default HomePage