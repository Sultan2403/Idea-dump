import { TextField, Button, InputAdornment } from "@mui/material";
import { User, Mail, Lock } from "lucide-react";
import { NavLink } from "react-router-dom";
import AuthLayout from "./layout";

export default function Register() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Get started in seconds"
      footer={
        <>
          Already have an account?{" "}
          <NavLink to="/login" style={{ color: "#6366f1", fontWeight: 500 }}>
            Login
          </NavLink>
        </>
      }
    >
      <form>
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <User size={18} />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          slotProps={{
            input: {
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
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock size={18} />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          margin="normal"
          slotProps={{
            input: {
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
          Register
        </Button>
      </form>
    </AuthLayout>
  );
}
