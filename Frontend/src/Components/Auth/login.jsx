import { useState } from "react";
import { TextField, Button, InputAdornment, Alert } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import AuthLayout from "./layout";
import useAuth from "../../Hooks/useAuth";

export default function Login() {
  const [userData, setUserData] = useState({});

  const { data, error, loading, login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    login(userData);
  };

  useEffect(() => {
    if (data) {
    }
  }, [data]);

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account"
      footer={
        <>
          Don’t have an account?
          <NavLink to="/register" style={{ color: "#6366f1", fontWeight: 500 }}>
            Register
          </NavLink>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          margin="normal"
          slotProps={{
            htmlInput: {
              startAdornment: (
                <InputAdornment position="start">
                  <Mail size={18} />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          margin="normal"
          slotProps={{
            htmlInput: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock size={18} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{ mt: 3, py: 1.2 }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </AuthLayout>
  );
}
