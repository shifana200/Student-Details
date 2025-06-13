import { useState ,useEffect} from 'react';

const StudentForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    class: '',
    admissionNumber: '',
    email: '',
    profilePic: '',
     password: '',
    ...initialData,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialData.profilePic ) {
      setPreview(`http://localhost:5000/uploads/${initialData.profilePic}`);
    }
  }, [initialData.profilePic]);


  // Handle form input changes
  const handleChange = (e) => {
    const { name, value ,files } = e.target;
    if(name==='profilePic'){
    setFormData(prev => ({ ...prev, profilePic: files[0] }));
    setPreview(URL.createObjectURL(files[0]));
  }else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};

  // // Handle profile picture upload (optional)
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   // For simplicity, store file object or convert to base64 here as needed
  //   setFormData(prev => ({ ...prev, profilePic: file }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = new FormData();
  // data.append('name', formData.name);
  // data.append('age', formData.age);
  // data.append('class', formData.class);
  // data.append('admissionNumber', formData.admissionNumber);
  // data.append('email', formData.email);
  // data.append('password', formData.password);

  // if (formData.profilePic && typeof formData.profilePic !== 'string') {
  //   // Only append if profilePic is a File object, not a URL string
  //   data.append('profilePic', formData.profilePic);
  // }

  //   onSubmit(data);
  //   console.log("Submitting form (FormData):", data);


  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "768px",
        margin: "2rem auto",
        backgroundColor: "#ffffff",
        padding: "1.5rem",
        borderRadius: "0.75rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        boxSizing: "border-box",
      }}
    >
      {/* Grid container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1rem",
        }}
      >
        {/* Switch to 2-column on wider screens */}
        <style>
          {`
            @media (min-width: 768px) {
              form > div:first-child {
                grid-template-columns: 1fr 1fr;
              }
            }
          `}
        </style>
  
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="class"
          value={formData.class}
          onChange={handleChange}
          placeholder="Class"
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="admissionNumber"
          value={formData.admissionNumber}
          onChange={handleChange}
          placeholder="Admission Number"
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="New Password (optional)"
          style={inputStyle}
        />
      </div>
  
      {/* Profile picture upload */}
      <div style={{ marginTop: "1.5rem" }}>
        <label style={labelStyle}>Profile Picture</label>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleChange}
            style={{
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "0.5rem",
            }}
          />
        </div>
      </div>
  
      {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          style={{
            ...buttonStyle,
            backgroundColor: "#6b7280", // gray-500
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#4b5563")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#6b7280")}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            ...buttonStyle,
            backgroundColor: "#2563eb", // blue-600
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1e40af")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
  
 
  
};
 // 🔵 Reusable inline styles
 const inputStyle = {
  padding: "0.5rem",
  border: "1px solid #ccc",
  borderRadius: "0.5rem",
  fontSize: "1rem",
  width: "100%",
  boxSizing: "border-box",
};

const labelStyle = {
  fontWeight: "600",
  color: "#374151", // gray-700
  marginBottom: "0.5rem",
  display: "block",
};

const buttonStyle = {
  color: "#fff",
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "0.5rem",
  fontSize: "1rem",
  cursor: "pointer",
};

export default StudentForm;
