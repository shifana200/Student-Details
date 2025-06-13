import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/profile'); // or /admin based on role
    }
  };

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <h2>Login</h2>
  //     <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
  //     <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
  //     <button type="submit" disabled={loading}>
  //       {loading ? 'Logging in...' : 'Login'}
  //     </button>
  //     {error && <p style={{ color: 'red' }}>{error}</p>}
  //   </form>
  // );

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
      padding: '16px',
    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px',
            backgroundColor: loading ? '#86efac' : '#22c55e', // lighter green when loading
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '8px' }}>
            {error}
          </p>
        )}

<p style={{ textAlign: 'center', marginTop: '8px', fontSize: '14px' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>
          Register
        </Link>
      </p>
      </form>
    </div>
  );
};

export default Login;
