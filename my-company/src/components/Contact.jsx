import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const containerStyle = {
    background: "white",
    borderRadius: "12px",
    padding: "40px",
    alignItems: "center",
    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e2e8f0",
  };
  const titleStyle = { marginTop: 0, color: "#0f172a" };
  const labelStyle = { display: "block", fontWeight: 600, color: "#0f172a", marginBottom: "6px" };
  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "0.95rem",
    color: "#0f172a",
  };
  const fieldWrapStyle = { marginBottom: "14px" };
  const buttonStyle = {
    background: "#0f172a",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
  };
  const successStyle = { color: "#065f46", marginTop: "10px" };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault(); // preventDefault
    // Simulate submit
    setStatus("Thanks! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  }

  return (
    <main style={containerStyle}>
      <h1 style={titleStyle}>Contact</h1>
      <form onSubmit={handleSubmit}>
        <div style={fieldWrapStyle}>
          <label htmlFor="name" style={labelStyle}>Name</label>
          <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} style={inputStyle} required />
        </div>
        <div style={fieldWrapStyle}>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} style={inputStyle} required />
        </div>
        <div style={fieldWrapStyle}>
          <label htmlFor="message" style={labelStyle}>Message</label>
          <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} style={{ ...inputStyle, resize: "vertical" }} required />
        </div>
        <button type="submit" style={buttonStyle}>Send Message</button>
      </form>
      {status && <p style={successStyle}>{status}</p>}
    </main>
  );
}

export default Contact;


