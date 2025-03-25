import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";

import { useLoginStore } from "@/stores/login";
import { postLoginAdmin } from "./Login.service";

export default function LoginComponent() {
  const router = useRouter();

  const setCurrentUserInLoginStore = useLoginStore(
    (state) => state.setCurrentUser
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const login = () => {
    postLoginAdmin({ username, password }).then(
      (data) => {
        setError("");
        setCurrentUserInLoginStore({
          id: data?.id,
          username: data?.username,
        });
        router.push("/admin");
      },
      (error) => {
        setError("Incorrect username/password!");
      }
    );
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    login();
  };

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="form-demo">
      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Welcome back!</h5>
          <p className="text-center mt-2">Login below or create an account</p>
          <form onSubmit={onFormSubmit} className="p-fluid">
            <div className="field">
              <label htmlFor="username">Username</label>
              <InputText
                id="username"
                value={username}
                onChange={onUsernameChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <Password
                id="password"
                type="password"
                value={password}
                onChange={onPasswordChange}
                toggleMask
                required
              />
            </div>

            <div className="flex justify-content-end">
              <Link href="/register">Register account</Link>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex justify-content-center mt-3">
              <Button
                type="submit"
                label="Sign In"
                className="p-button-raised"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
