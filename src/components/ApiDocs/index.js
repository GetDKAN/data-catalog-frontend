import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const ApiDocs = ({ uuid }) => {
  const endpoint = process.env.GATSBY_API_URL;
  // const url = uuid ? endpoint + "/" + uuid : endpoint;

  // return (
  //   <SwaggerUI url={url} docExpansion="list"/>
  // );

  return <p>{endpoint}</p>;
};

export default ApiDocs;
