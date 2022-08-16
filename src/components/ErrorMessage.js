import "./ErrorMessage.css";

const ErrorMessage = ({ message }) => {
  return (
    <div>
      <h2 className="error-header">Error Warning</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
