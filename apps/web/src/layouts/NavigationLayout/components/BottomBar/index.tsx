import { GlobalOutlined, InstagramOutlined, LinkedinOutlined, XOutlined } from '@ant-design/icons'
import { Flex, Layout } from 'antd'
import React from 'react'

const { Footer } = Layout

interface SocialLink {
  icon: React.ReactNode
  url: string
}

const socialLinks: SocialLink[] = [
    {
        icon: <InstagramOutlined style={{ fontSize: '24px', color: 'white' }} />,
        url: 'https://www.instagram.com/musen.sports/'
    },
    {
        icon: <LinkedinOutlined style={{ fontSize: '24px', color: 'white' }} />,
        url: 'https://www.linkedin.com/company/musen-sports'
    },
    {
        icon: <XOutlined style={{ fontSize: '24px', color: 'white' }} />,
        url: 'https://x.com/musen_sports'
    },
    {
        icon: <GlobalOutlined style={{ fontSize: '24px', color: 'white' }} />,
        url: 'https://musen.framer.website'
    },
]

interface BottomBarProps {
  style?: React.CSSProperties;
}

export const BottomBar: React.FC<BottomBarProps> = ({ style }) => {
  return (
    <Footer 
      style={{ 
        padding: '0 50px',
        height: '64px',
        lineHeight: '64px',
        ...style 
      }}
    >
      <Flex align="center" justify="center" gap="large" style={{ height: '100%' }}>
        {socialLinks.map((link, index) => (
          <a 
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white' }}
          >
            {link.icon}
          </a>
        ))}
      </Flex>
    </Footer>
  )
}