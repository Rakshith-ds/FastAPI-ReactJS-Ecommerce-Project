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
import Pricing from "./components/Pricing";
import Blog from "./components/Blog";
import Cart from "./components/Cart";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
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
            <Route index element={<Products />} />
            <Route path="products" element={<Products />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="blog" element={<Blog />} />
            <Route path="cart" element={<Cart />} />
          </Route>
          {/* Redirect any unknown paths to sign in */}
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
