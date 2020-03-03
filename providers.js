import React from "react";
import { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import "bootstrap/dist/css/bootstrap.min.css";
import "@civicactions/data-catalog-components/dist/index.css";
import "./src/theme/styles/index.scss";

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