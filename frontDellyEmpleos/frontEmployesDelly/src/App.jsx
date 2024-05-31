import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Signin from "./Pages/Signin";
import SignupForm from "./Pages/Signup";
import { Provider} from "react-redux";
import store from "./Store/store";

import "react-toastify/dist/ReactToastify.css";
import RegisterUser from "./Pages/RegistarUser/RegisterUser";


const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <SignupForm />,
      },
      {
        path: "/registerUser/:id",
        element: <RegisterUser/>,
      },
    ],
  },
]);

function App() {



  return (
    <Provider store={store}>
      <RouterProvider router={router}>
        <ToastContainer />
      </RouterProvider>
    </Provider>
  );
}

export default App;
