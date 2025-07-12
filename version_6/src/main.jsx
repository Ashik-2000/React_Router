import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
    createContactAction,
    deleteContactAction,
    editContactAction,
} from "./actions/contactsActions";
import Contact from "./Contact";
import EditContact from "./EditContact";
import ErrorPage from "./Error";
import Index from "./Index";
import "./index.css";
import { getContactLoader, getContactsLoader } from "./loaders/contactsLoaders";
import Root from "./Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: getContactsLoader,
        action: createContactAction,
        children: [
            {
                index: true,
                element: <Index />,
            },
            {
                path: "/contacts/:contactId",
                element: <Contact />,
                loader: getContactLoader,
            },
            {
                path: "/contacts/:contactId/edit",
                element: <EditContact />,
                loader: getContactLoader,
                action: editContactAction,
            },
            {
                path: "/contacts/:contactId/destroy",
                element: <EditContact />,
                action: deleteContactAction,
                errorElement: <div>Oops, There was an error</div>,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
