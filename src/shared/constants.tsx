import { css } from 'styled-components';

export const theme = {
  mediaQueries: {
    md: '@media (min-width: 600px)',
    lg: '@media (min-width: 1000px)',
  },
  colors: {
    accent50: '#EEF2FF',
    accent100: '#EEF2FF',
    accent200: '#C7D2FE',
    accent300: '#A5B4FC',
    accent400: '#818CF8',
    secondary50: '#F0FDFA',
    secondary100: '#CCFBF1',
    secondary200: '#99F6E4',
    secondary300: '#5EEAD4',
    secondary400: '#2DD4BF',
    font200: '#555555',
    font300: '#333333',
    background: '#FDFDFD',
  },
};

export const baseFontProperties = css`
  font-size: 16px;
  color: ${(p) => p.theme.colors.font200};
  letter-spacing: 0.02rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
