'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  // Estados para el contador
  const [counter, setCounter] = useState(10);

  // Estados para el formulario de registro
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');

  // Estados para el formulario de login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Estado para alternar entre "Registrarse" e "Iniciar sesion"
  const [showLogin, setShowLogin] = useState(false);

  // Validacion del correo electronico
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validacion de la contrasena
  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= 8 && hasUpperCase && hasSpecialChar;
  };

  // Efecto para validar la contrasena en el registro
  useEffect(() => {
    if (registerPassword && !validatePassword(registerPassword)) {
      setRegisterError(
        'La contrasena debe tener al menos 8 caracteres, una mayuscula y un caracter especial.'
      );
    } else if (
      registerConfirmPassword &&
      registerPassword !== registerConfirmPassword
    ) {
      setRegisterError('Las contrasenas no coinciden.');
    } else {
      setRegisterError('');
    }
  }, [registerPassword, registerConfirmPassword]);

  // Efecto para validar el correo en el login
  useEffect(() => {
    if (loginEmail && !validateEmail(loginEmail)) {
      setLoginError('Correo electronico no valido');
    } else {
      setLoginError('');
    }
  }, [loginEmail]);

  // Manejar el envio del formulario de registro
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
      setRegisterError('Todos los campos son requeridos.');
      return;
    }
    if (!validateEmail(registerEmail)) {
      setRegisterError('Correo electronico no valido.');
      return;
    }
    if (!validatePassword(registerPassword)) {
      setRegisterError(
        'La contrasena debe tener al menos 8 caracteres, una mayuscula y un caracter especial.'
      );
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      setRegisterError('Las contrasenas no coinciden.');
      return;
    }
    alert(`Registro exitoso: ${registerName}`);
  };

  // Manejar el envio del formulario de login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(loginEmail)) {
      setLoginError('Correo electronico no valido');
      return;
    }
    if (!loginPassword) {
      setLoginError('La contrasena es requerida');
      return;
    }
    alert(`Login exitoso: ${loginEmail}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Actividad 2 - Diego Sabillon A01798446</h1>
      </header>

      <div className="container mx-auto px-4 mt-8">
        <div className="text-center mb-8">
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {showLogin ? '¿No tienes cuenta? Registrate' : '¿Ya tienes cuenta? Inicia sesion'}
          </button>
        </div>

        {!showLogin ? (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Registro</h2>
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre:</label>
                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Correo electronico:</label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contrasena:</label>
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirmar contrasena:</label>
                <input
                  type="password"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              {registerError && <p className="text-red-500 text-sm">{registerError}</p>}
              <button
                type="submit"
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Registrarse
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Iniciar sesion</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Correo electronico:</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contrasena:</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Iniciar sesion
              </button>
            </form>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Counter</h2>
          <p className="text-4xl font-bold text-center mb-4">{counter}</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setCounter(counter + 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Increment
            </button>
            <button
              onClick={() => setCounter(counter - 1)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Decrement
            </button>
            <button
              onClick={() => setCounter(0)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}