import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import NotesApp from './components/NotesApp';

const root = createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <NotesApp />
    </BrowserRouter>
);