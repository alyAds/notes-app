import React from "react";
import NotFound from "../components/NotFound";
import img404 from "../assets/404.png";

function PageNotFound() {
  return (
    <>
      <NotFound src={img404} alt={"404 page"} caption={"The page you are looking for was not found!"} />
    </>
  );
}

export default PageNotFound;
