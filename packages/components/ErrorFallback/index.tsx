import { useNavigate } from 'react-router-dom';

const ErrorFallback = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2>Something went wrong 😢</h2>
      <p>Please try refreshing the page or contact support.</p>
      <button
        type="button"
        style={{
          marginTop: 16,
          padding: '8px 16px',
          border: '1px solid #ccc',
          borderRadius: 4,
          cursor: 'pointer',
        }}
        onClick={() => navigate('/')}
      >
        ⬅ Back to Home
      </button>
    </div>
  );
};

export default ErrorFallback;
