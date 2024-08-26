import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Signin from "./components/Signin";
import SignUp from "./components/Signup";
import Landingpage from "./components/Landingpage";
import Products from "./components/Products";
import Cart from "./components/Cart";
import PrivateRoute from "./components/PrivateRoute";
import SingleProduct from "./components/SingleProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/landingpage/*"
          element={
            <PrivateRoute>
              <Landingpage />
            </PrivateRoute>
          }
        >
          {/* Nested routes */}
          <Route index element={<Products />} />
          <Route path=":category" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path=":category/:productId" element={<SingleProduct />} />
        </Route>
        {/* Redirect any unknown paths to sign in */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
