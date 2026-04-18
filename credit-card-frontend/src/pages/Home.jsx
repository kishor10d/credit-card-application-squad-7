import ApplicantForm from "./ApplicantForm";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Home = () => {
  const navigate = useNavigate();
	const role=0;
  const isAuthenticated = authService.isAuthenticated();
  console.log("isAuth", isAuthenticated);
  if (isAuthenticated) {
    navigate("/dashboard");
  }

  return (
    <div className="container">
      <ApplicantForm role={role} />
    </div>
  );
};

export default Home;
