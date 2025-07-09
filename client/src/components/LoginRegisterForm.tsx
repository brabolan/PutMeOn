import React, { useState } from 'react';

type AuthMode = 'login' | 'register';

const LoginRegisterForm: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const toggleMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = `http://localhost:5050/${authMode}`;
    const payload = { email, password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      if (authMode === 'login') {
        console.log('JWT Token:', data.token); // ← store this later
        setMessage('Logged in!');
      } else {
        setMessage('Registered successfully! You can now log in.');
      }
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'left' }}>
      <h2>{authMode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ width: '100%' }}>
          {authMode === 'login' ? 'Log In' : 'Register'}
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        {authMode === 'login' ? 'No account?' : 'Already have an account?'}{' '}
        <button onClick={toggleMode} style={{ color: 'blue', background: 'none', border: 'none' }}>
          {authMode === 'login' ? 'Register here' : 'Log in'}
        </button>
      </p>
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
};

export default LoginRegisterForm;