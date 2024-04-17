"use client"
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';



function BgColorExample() {
  return (
    <>
      {[
        'Secondary',
        'Success',
        'Danger',
      ].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={'white'}
          style={{ width: '18rem' }}
          className="mb-2"
        >
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title>{variant} Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default BgColorExample;