import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/payrol.png";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;
  const routeName = pathname.split("/")[1];
  return (
    <nav className="navbar navbar-expand-md bg-white nav-container">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          UpTurn
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
