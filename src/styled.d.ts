import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mediaQueries: {
      md: string;
      lg: string;
    };
    colors: {
      accent50: string;
      accent100: string;
      accent200: string;
      accent300: string;
      accent400: string;
      secondary50: string;
      secondary100: string;
      secondary200: string;
      secondary300: string;
      secondary400: string;
      font200: string;
      font300: string;
      background: string;
    };
  }
}
