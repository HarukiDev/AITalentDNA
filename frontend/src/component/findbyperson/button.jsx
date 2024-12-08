import React from "react";

const Button = ({ onClick, label }) => {
  return (
    <button onClick={onClick} style={styles.button}>
      {label}
    </button>
  );
};

const styles = {
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Button;
