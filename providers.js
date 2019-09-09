import React from "react";
import { BreakpointProvider, setDefaultBreakpoints } from 'react-socks';

import "@cmsgov/design-system-core/dist/index.css";

import Theme from './src/theme/default'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './src/theme/globalStyles';

export default ({ element }) => {
  setDefaultBreakpoints([
    { xs: 0 },
    { s: 376 },
    { m: 768 },
    { l: 1199 },
    { xl: 1200 }
  ]);

  return (
    <BreakpointProvider>
      <GlobalStyles />
      <ThemeProvider theme={Theme}>
        {element}
      </ThemeProvider>
    </BreakpointProvider>
  )
}