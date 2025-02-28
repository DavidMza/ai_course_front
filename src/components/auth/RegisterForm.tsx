import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '../common/Button';
import { FormInput } from '../common/FormInput';
import { FormSelect } from '../common/FormSelect';
import { useAuthStore } from '../../store/authStore';

const LANGUAGES = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'pt', label: 'Português' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
];

const ASSISTANTS = [
  { value: 'default', label: 'Default' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'chatgpt', label: 'ChatGPT' },
];

const MODELS = [
  { value: 'default', label: 'Default' },
];

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    lastname: '',
    language: 'es',
    assistant: 'default',
    model: 'default',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F6F7] px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-[#3498DB] bg-opacity-10">
            <User className="h-6 w-6 text-[#3498DB]" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#2C3E50]">
            Crear una cuenta
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Apellido"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <FormInput
            label="Correo Electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <FormSelect
            label="Idioma"
            name="language"
            value={formData.language}
            onChange={handleChange}
            options={LANGUAGES}
            required
          />

          <FormSelect
            label="Asistente"
            name="assistant"
            value={formData.assistant}
            onChange={handleChange}
            options={ASSISTANTS}
            required
          />

          <FormSelect
            label="Modelo"
            name="model"
            value={formData.model}
            onChange={handleChange}
            options={MODELS}
            required
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </Button>
        </form>
      </div>
    </div>
  );
};