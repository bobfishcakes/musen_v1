import { theme } from 'antd';
import { Instrument_Sans } from 'next/font/google';

const instrumentSansFont = Instrument_Sans({ weight: ['400', '700'], subsets: ['latin'] });

export const Theme = {
  algorithm: theme.darkAlgorithm,
  token: {
    // Colors
    colorPrimary: '#3A5241', // dark green ribbon text color
    colorPrimaryBg: '#e9eae0', // unknown
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorTextBase: '#FFFFFF', // white main text color
    colorLink: '#FFFFFF', // white hyperlink text color
    colorBgBase: '#e9eae0', // dim gray background
    colorBgContainer: '#0c100d', // green table color is 81A18B

    // Typography
    fontFamily: `${instrumentSansFont.style.fontFamily}, -apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif`,
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
      bodyBg: '#000000', // black
      siderBg: '#000000', // black
    },
    Menu: {
      itemBg: 'transparent',
      itemColor: '#FFFFFF',
      horizontalItemHoverBg: '#26362b',
      horizontalItemSelectedColor: 'silver',
      activeBarBorderWidth: 0,
    },
  },
}
