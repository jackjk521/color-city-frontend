import * as React from "react";
import SingleColumnGrid from "../utility/grids/GridLayout3_1";

export default function Dashboard({children}) {
  return (
    <>
      <SingleColumnGrid>
        {children}
      </SingleColumnGrid>
    </>
  );
}
