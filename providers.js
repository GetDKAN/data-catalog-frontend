import React from "react";
import { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@civicactions/data-catalog-components/dist/index.css";
import "./src/theme/styles/index.scss";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas);

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
      <div className="dc-catalog">
        {element}
      </div>
    </BreakpointProvider>
  )
}
