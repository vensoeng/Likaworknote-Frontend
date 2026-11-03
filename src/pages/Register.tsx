import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import authService from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState<File | undefined>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setProfileImage(file);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await authService.register({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        pr_img: profileImage,
      });

      console.log("REGISTER RESPONSE:", response);

      setSuccess("Account created successfully.");

      // Temporary:
      // Later we will change this to OTP verification.
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error: any) {
      console.error("REGISTER ERROR:", error);

      const message =
        error?.response?.data?.message ||
        "Registration failed.";

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Account</h1>

      {error && (
        <p>
          {error}
        </p>
      )}

      {success && (
        <p>
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <div>
          <label>First Name</label>

          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First name"
          />
        </div>

        <div>
          <label>Last Name</label>

          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        <div>
          <label>Confirm Password</label>

          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            required
          />
        </div>

        <div>
          <label>Profile Image</label>

          <input
            type="file"
            name="pr_img"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

      </form>
    </div>
  );
}

export default Register;