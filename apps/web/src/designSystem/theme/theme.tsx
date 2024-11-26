import { theme } from 'antd'
import { Amaranth } from 'next/font/google'

const amaranthFont = Amaranth({ subsets: ['latin'], weight: ['400', '700'] })

export const Theme = {
  algorithm: theme.darkAlgorithm,
  token: {
    // Colors
    colorPrimary: '#3A5241', // dark green ribbon text color
    colorPrimaryBg: 'black', // unknown
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorTextBase: '#FFFFFF', // white main text color
    colorLink: '#FFFFFF', // white hyperlink text color
    colorBgBase: '#3a4652', // dim gray background
    colorBgContainer: '#3A5241', // green table color is 81A18B

    // Typography
    fontFamily: `${amaranthFont.style.fontFamily}, -apple-system, 'Inconsolate'`,
    fontSize: 20,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    linkDecoration: 'underline',

    // Layout
    padding: 16,
    boxShadow:
      '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    borderRadius: 6,
    controlHeight: 32,
    lineType: 'solid',
    lineWidth: 1,
    motion: false,
  },
  components: {
    Form: {
      itemMarginBottom: '22px',
    },
    Layout: {
      headerBg: '#3A5241', // header background color
      footerBg: '#3A5241', // footer background color
      bodyBg: '#3a4652', // dim gray background
      siderBg: '#18181b', // sidebar background
    },
    Menu: {
      activeBarBorderWidth: 0,
      itemHeight: 30,
      itemBg: 'transparent',
      itemColor: '#FFFFFF', // Updated to white text
      itemHoverBg: '#1f1f23', // hover background color
      itemSelectedBg: '#1f1f23', // selected background color
      itemSelectedColor: 'white',
      itemActiveBg: 'transparent',
    },
  },
}
