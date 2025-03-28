import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMapMarkerAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';
import '../styles/header.css';

const scrolling = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-255%);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
`;

const PromotionText = styled.div`
  display: flex;
  animation: ${scrolling} 10s linear infinite;
  white-space: nowrap;
`;

const Text = styled.span`
  color: #00003c;
  font-size: 13px;

  @media(min-width: 768px) {
    font-size: 14px;
  }

  &:nth-child(2) {
    font-size: 12px;

    @media(min-width: 768px) {
      font-size: 13px;
    }
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
`;

const Logo = styled.img`
  height: 50px;
`;

const CompanyName = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 10px;
`;

const SearchBar = styled.input`
  flex: 1;
  margin: 0 20px;
  padding: 10px;
  font-size: 1rem;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  cursor: pointer;
`;

const Header = () => {
  return (
    <div>
      <Container>
        <PromotionText>
          <Text>¡15% de descuento en tu primera compra web! Ingresa el Código: <strong>PRIMERA15</strong> al ingresar tu pedido.</Text>
          <Text>- Inicia sesión antes de usarlo</Text>
        </PromotionText>
      </Container>
      <HeaderContainer>
        <Logo src="https://e7.pngegg.com/pngimages/577/649/png-clipart-question-mark-question-mark.png" alt="Logo" />
        <CompanyName>ImpresionArte</CompanyName>
        <SearchBar type="text" placeholder="Buscar productos" />
        <IconsContainer>
          <Icon icon={faUser} /> {/* Ícono de usuario */}
          <Icon icon={faMapMarkerAlt} /> {/* Ícono de mapa */}
          <Icon icon={faShoppingCart} /> {/* Ícono de carrito de compra */}
        </IconsContainer>
      </HeaderContainer>
    </div>
  );
};

export default Header;
