import { Link } from "react-router-dom";

function Navbar() {
    const navStyle = {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "12px 16px",
        background: "#0f172a",
        borderRadius: "8px",
        margin: "12px 0",
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    };

    const linkStyle = {
        color: "#e2e8f0",
        textDecoration: "none",
        fontWeight: 600,
        fontSize: "0.95rem",
        padding: "8px 12px",
        borderRadius: "6px",
        transition: "background 120ms ease, color 120ms ease",
    };

    const linkHoverStyle = {
        background: "rgba(255,255,255,0.08)",
        color: "#ffffff",
    };

    const dividerStyle = { color: "#475569" };

    return (
        <nav style={navStyle}>
            <p style={{backgroundColor: 'red', justifyContent: "center"}}></p>
            <Link to="/" style={linkStyle} onMouseOver={e => Object.assign(e.currentTarget.style, linkHoverStyle)} onMouseOut={e => Object.assign(e.currentTarget.style, linkStyle)}>Home</Link>
            <span style={dividerStyle}>|</span>
            <Link to="/about" style={linkStyle} onMouseOver={e => Object.assign(e.currentTarget.style, linkHoverStyle)} onMouseOut={e => Object.assign(e.currentTarget.style, linkStyle)}>About</Link>
            <span style={dividerStyle}>|</span>
            <Link to="/services" style={linkStyle} onMouseOver={e => Object.assign(e.currentTarget.style, linkHoverStyle)} onMouseOut={e => Object.assign(e.currentTarget.style, linkStyle)}>Services</Link>
            <span style={dividerStyle}>|</span>
            <Link to="/contact" style={linkStyle} onMouseOver={e => Object.assign(e.currentTarget.style, linkHoverStyle)} onMouseOut={e => Object.assign(e.currentTarget.style, linkStyle)}>Contact</Link>
        </nav>
    );
};

export default Navbar;
