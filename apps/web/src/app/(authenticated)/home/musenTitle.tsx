import { Card, Col, Image, Row, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

const MusenTitle: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '10px',
      marginBottom: '20px',
    }}>
      <Card style={{
        backgroundColor: '#000000',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '0px solid #3A5241',
        padding: '40px',
        width: '90%',
        maxWidth: '1200px',
      }}>
        <Row justify="center" align="middle" gutter={[80, 0]}>
          <Col xs={24} md={12} style={{ 
            paddingRight: '40px',
          }}>
            <Title level={1} style={{
              fontSize: 'clamp(50px, 8vw, 100px)',
              fontWeight: 'bold',
              margin: '10px 0',
              color: 'white',
              whiteSpace: 'nowrap',
            }}>
              musen
            </Title>
            <Title level={2} 
              style={{
                fontSize: 'clamp(16px, 2vw, 30px)',
                fontWeight: 'normal',
                margin: '0 0 20px 0',
                color: '#BAE0C0',
                whiteSpace: 'nowrap',
              }}
            >
              sports commentary how you want it
            </Title>
          </Col>
          <Col 
            xs={24}  
            md={12} 
            style={{
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'right',
            }}
          >
            <Image
              src="/musen_logo.png"
              alt="Musen Logo"
              preview={false}
              style={{
                height: 'clamp(150px, 25vw, 250px)',
                width: 'auto',
                objectFit: 'contain',
                marginLeft: '10px'
                // border: '2px solid #3A5241',
              }}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default MusenTitle;