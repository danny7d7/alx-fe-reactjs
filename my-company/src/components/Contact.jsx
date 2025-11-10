function Contact() {
  const containerStyle = {
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e2e8f0",
  };
  const titleStyle = { marginTop: 0, color: "#0f172a" };
  const textStyle = { color: "#334155" };
  return (
    <main style={containerStyle}>
      <h1 style={titleStyle}>Contact</h1>
      <p style={textStyle}>Get in touch with us through this page.</p>
    </main>
  );
}

export default Contact;


