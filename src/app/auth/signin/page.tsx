"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "../../modules/auth/presentation/providers/AuthProvider";
import SignInScreenSimple from "../../modules/auth/presentation/screens/SignInScreenSimple";

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignInPage() {
  const { login, tempLogin, isLoading, message } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

  const handleDemoLogin = async () => {
    try {
      await login({
        email: "demo@strading.com",
        password: "demo123",
      });
    } catch (error) {
      console.error("Erreur lors de la connexion demo:", error);
    }
  };

  const handleTempLogin = async () => {
    try {
      await tempLogin();
    } catch (error) {
      console.error("Erreur lors de la connexion temporaire:", error);
    }
  };

  return (
    <SignInScreenSimple
      isLoading={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      message={message}
      onDemoLogin={handleDemoLogin}
      onTempLogin={handleTempLogin}
    />
  );
}
