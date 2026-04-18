import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
					<h2>CC Approver Login</h2>
					<br />
          <LoginForm />
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default Login;
