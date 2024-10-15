import { theme } from 'antd'
import { Amaranth } from 'next/font/google'

const amaranthFont = Amaranth({ subsets: ['latin'], weight: ['400', '700'] })

export const Theme = {
  algorithm: theme.darkAlgorithm,
  token: {
    // Colors
    colorPrimary: '#628A6E', // dark green ribbon text color
    colorPrimaryBg: 'black', // unknown
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorTextBase: '#000000', // black main text color
    colorLink: '#000000', // black hyperlink text color
    colorBgBase: '#0e0e10', //
    colorBgContainer: '#81A18B', // green table color is 81A18B

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
      headerBg: '#72967d', // light green
      footerBg: '#81A18B', // light green
      bodyBg: '#628A6E', // dark green
      siderBg: '#18181b', // Updated to match the dark sidebar background
    },
    Menu: {
      activeBarBorderWidth: 0,
      itemHeight: 30,
      itemBg: 'transparent',
      itemColor: '#000000', // Updated to match the light grey text
      itemHoverBg: '#1f1f23', // Updated to match the hover background color
      itemSelectedBg: '#1f1f23', // Updated to match the selected background color
      itemSelectedColor: 'white',
      itemActiveBg: 'transparent',
    },
  },
}
