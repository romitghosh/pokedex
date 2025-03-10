import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Background from "./components/Background";
import "./scss/index.scss";
import { Suspense, lazy, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./utils/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { clearToasts, setUserStatus } from "./app/slices/AppSlice";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";

const Search = lazy(() => import("./pages/Search"));
const MyList = lazy(() => import("./pages/MyList"));
const Compare = lazy(() => import("./pages/Compare"));
const Pokemon = lazy(() => import("./pages/Pokemon"));

export default function App() {
  const { toasts } = useSelector(({ app }) => app);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        dispatch(setUserStatus({ email: currentUser.email }));
      }
    });
  }, [dispatch]);
  useEffect(() => {
    if (toasts.length) {
      const toastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      toasts.forEach((message) => {
        toast(message, toastOptions);
      });
      dispatch(clearToasts());
    }
  }, [toasts, dispatch]);

  return (
    <div className="main-container">
      <Background />
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <div className="app">
            <Navbar />
            <Routes>
              <Route element={<Search />} path="/search" />
              <Route element={<MyList />} path="/list" />
              <Route element={<Compare />} path="/compare" />
              <Route element={<Pokemon />} path="/pokemon/:id" />
              <Route element={<Navigate to="/pokemon/1" />} path="*" />
            </Routes>
            <Footer />
            <ToastContainer />
          </div>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
