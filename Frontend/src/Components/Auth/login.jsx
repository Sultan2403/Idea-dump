import { TextField, Button, InputAdornment } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import AuthLayout from "./layout";

export default function Login() {
  const handleSubmit = () => {};

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
      <form>
        <TextField
          fullWidth
          label="Email"
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
          type="password"
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
          variant="contained"
          sx={{ mt: 3, py: 1.2 }}
        >
          Login
        </Button>
      </form>
    </AuthLayout>
  );
}
