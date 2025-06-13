// pages/admin/AdminEditStudent.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import StudentForm from "./StudentForm";

const AdminEditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(res.data);
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      const updated = new FormData();
      for (let key in formData) {
        updated.append(key, formData[key]);
      }

      await axios.put(`http://localhost:5000/api/admin/students/${id}`, updated, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#f9fafb", // light gray background
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          textAlign: "center",
          color: "#1f2937", // neutral-800
        }}
      >
        Edit Student
      </h2>
  
      <StudentForm
        initialData={{ ...student, profilePic: student.profilePic || "" }}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin")}
      />
    </div>
  );
  
};

export default AdminEditStudent;
