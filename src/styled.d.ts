import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mediaQueries: {
      md: string;
      lg: string;
    };
    colors: {
      accentBackground: string;
      accentLight: string;
      accentDefault: string;
      accentDark: string;
      secondaryBackground: string;
      secondaryLight: string;
      secondaryDefault: string;
      secondaryDark: string;
      fontColorLight: string;
      fontColorDefault: string;
      background: string;
    };
  }
}
