import { css } from 'styled-components';

export const theme = {
  mediaQueries: {
    md: '@media (min-width: 600px)',
    lg: '@media (min-width: 1000px)',
  },
  colors: {
    accentBackground: '#EEF2FF',
    accentLight: '#C7D2FE',
    accentDefault: '#A5B4FC',
    accentDark: '#818CF8',
    secondaryBackground: '#F0FDFA',
    secondaryLight: '#99F6E4',
    secondaryDefault: '#5EEAD4',
    secondaryDark: '#2DD4BF',
    fontColorLight: '#555555',
    fontColorDefault: '#333333',
    background: '#FDFDFD',
  },
};

export const baseFontProperties = css`
  font-size: 16px;
  color: ${(p) => p.theme.colors.fontColorDefault};
  letter-spacing: 0.02rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
