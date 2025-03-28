import Image from 'react-bootstrap/Image';

// eslint-disable-next-line react/prop-types
const ExampleCarouselImage = ({ src, alt }) => {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Image
        src={src}
        alt={alt}
        fluid
        style={{ height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
};

export default ExampleCarouselImage;
