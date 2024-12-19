import { Col, Image, Row, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

const MusenTitle: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
        <Row justify="center" align="middle" gutter={[80, 0]}>
          <Col xs={24} md={12} style={{ 
            paddingRight: '40px',
            zIndex: 1,
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
              zIndex: 1,
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
                marginLeft: '15px',
                zIndex: 1,
              }}
            />
          </Col>
        </Row>
    </div>
  );
};

export default MusenTitle;