"use client";
import { useState } from "react";
import Link from "next/link";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { useRouter } from "next/navigation";
import { createUser } from "@/api/user.service";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser({
      email: email,
      username: Username,
      password: password,
    }).then((data) => {
      router.push("/login");
    });
    setSubmitted(true);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePassword = () => setShowPassword(!showPassword);



  return (
    <div className="form-demo">
      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Create an account</h5>
          <p className="text-center mt-2">
            Enter your account details below, or sign in
          </p>
          <form onSubmit={handleSubmit} className="p-fluid">
            <div className="field">
              <label htmlFor="username">Username</label>
              <InputText
                id="username"
                value={Username}
                onChange={onUsernameChange}
                required
                autoFocus
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
                <Password
                  id="password"
                  value={password}
                  onChange={onPasswordChange}
                  toggleMask
                  feedback={false}
                  required
                />
              </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                value={email}
                onChange={onEmailChange}
                feedback={false}
                required
              />
            </div>
            <div className="flex">
              <Link href="/login">Login</Link>
            </div>
            <div className="flex justify-content-center mt-3">
              <Button
                type="submit"
                label="Create"
                className="p-button-raised"
              />
            </div>
            {submitted && (
              <p className="mt-2 text-center">
                {email && password ? (
                  <span>Creation successful, please login!</span>
                ) : (
                  <span>Please enter valid informations.</span>
                )}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
