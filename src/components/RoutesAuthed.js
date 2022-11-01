import React from "react";
import { Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { AddEditPage, AddEditPageWrapper } from "../pages/AddEditPage.js";
import PageNotFound from "../pages/PageNotFound.js";
import ArchiveHomePage from "../pages/ArchiveHomePage.js";

function RoutesAuthed({ keyword }) {
  const routes = [
    {
      path: "/",
      element: 
        <ArchiveHomePage
          show="note"
          keyword={keyword}
          toggleCaption="ARSIP"
          noteClass="note-item"
          link="/archive"
        />
    },
    {
      path: "/archive",
      element: 
        <ArchiveHomePage
          show="archive"
          keyword={keyword}
          toggleCaption="NOTEs"
          noteClass="note-item note-item-archive"
          link="/"
        />
    },
    {
      path: "/new",
      element: 
        <AddEditPage
          overlayClass="overlay overlay-note-add"
        />
    },
    {
      path: "/note/:id",
      element: <AddEditPageWrapper />,
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ];

  return (
    <Routes>
      {routes.map(({path, element}, key) => (
        <Route key={key} path={path} element={element} />
      ))}
    </Routes>
  );
}

RoutesAuthed.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default RoutesAuthed;
