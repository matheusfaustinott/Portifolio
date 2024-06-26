import React from 'react';
import { useSignal } from "@preact/signals-react";
import { useSignalEffect, useSignals } from '@preact/signals-react/runtime';


const Login = () => {
  useSignals();
  const email = useSignal('');
  const isLoggedIn = useSignal(false);

  useSignalEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    
    if (savedEmail) {
      isLoggedIn.value = true;
      console.log('savedEmail', savedEmail)
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.value) {
      localStorage.setItem('userEmail', email.value);

      setTimeout(() => {
        localStorage.removeItem('userEmail');
        alert('Sessão expirada. Faça login novamente.');
        isLoggedIn.value = false;
      }, 10 * 60 * 1000);

      alert('Login realizado com sucesso!');
      isLoggedIn.value = true;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    isLoggedIn.value = false;
    email.value = '';
  };

  return (
    <div>
      <h2>{isLoggedIn.value ? 'Bem-vindo!' : 'Login'}</h2>
      {isLoggedIn.value ? (
        <div>
          <p>Você está logado como {localStorage.getItem('userEmail')}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email.value}
              onChange={(e) => email.value = e.target.value}
              required
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
      )}
    </div>
  );
};

export default Login;
