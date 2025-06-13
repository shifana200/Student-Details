import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    class: '',
    admissionNumber: '',
    email: '',
    password: '',
  });

  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      data.append('profilePic', profilePic);

      const response = await axios.post('http://localhost:5000/api/student/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        localStorage.setItem('studentToken', response.data.token);

        navigate('/profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
      padding: '16px',
    }}>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{
          backgroundColor: 'white',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Student Registration</h2>
  
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          style={inputStyle}
        />
  
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          required
          style={inputStyle}
        />
  
        <input
          type="text"
          name="class"
          placeholder="Class"
          onChange={handleChange}
          required
          style={inputStyle}
        />
  
        <input
          type="text"
          name="admissionNumber"
          placeholder="Admission Number"
          onChange={handleChange}
          required
          style={inputStyle}
        />
  
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={inputStyle}
        />
  
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={inputStyle}
        />
  
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          style={{
            padding: '8px',
            fontSize: '14px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
  
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px',
            backgroundColor: loading ? '#93c5fd' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
        
          {loading ? 'Registering...' : 'Register'}
        </button>
  
        <p style={{ textAlign: 'center', marginTop: '8px', fontSize: '14px' }}>
  Already have an account?{' '}
  <span
    style={{ color: '#3b82f6', cursor: 'pointer', textDecoration: 'underline' }}
    onClick={() => navigate('/login')}
  >
    Login
  </span>
</p>
        {error && (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '8px' }}>{error}</p>
        )}
        
        
      </form>
    </div>
  );
  
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};


export default Register;
