import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import authService from '../services/authService';

const LoginForm = () => {

	const navigate = useNavigate();

	const isAuthenticated = authService.isAuthenticated();
	console.log("isAuth", isAuthenticated);
	if (isAuthenticated) {
		navigate('/');
	}

	const schema = z.object({
		email: z.string().email("Invalid email address"),
		password: z.string()
			.min(6, "Password must be at least 6 characters")
			.max(20, "Password must not exceed 20 characters"),
	});

	const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: 'kishor@example.com', password: ''}
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const response = await authService.login({ email: data.email, password: data.password });
      if (response) {
				navigate('/');
			} else {
				alert("Login failed. Please check your credentials.");
			}
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <form className="mt-20" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
					{...register("email")}
        />
        <label>Email address</label>
				{errors.email && <p className='text-danger'>{errors.email.message}</p>}
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
					{...register("password")}
        />
        <label>Password</label>
				{errors.password && <p className='text-danger'>{errors.password.message}</p>}
      </div>
      <br />
      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
