import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../contexts/AuthContext";
import { TextFieldHook } from "../components/form";
import { loginSchema } from "../utils/validation/schemas";
import AuthFormLayout from "../components/layout/AuthFormLayout";
import Button from "../components/common/Button";
import ErrorAlert from "../components/common/ErrorAlert";
import { LockIcon } from "../components/common/icons";

interface LoginFormData {
  phone: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema) as Resolver<LoginFormData>,
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    setError("");
    setIsLoading(true);

    try {
      const result = await login(data.phone, data.password);
      if (result.success) {
        navigate("/", { replace: true });
      } else {
        setError(result.message);
      }
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormLayout title="CaneScan" subtitle="ระบบตรวจโรคใบอ้อยด้วย AI">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextFieldHook
          name="phone"
          control={control}
          label="เบอร์โทรศัพท์"
          type="tel"
          placeholder="08XXXXXXXX"
          maxLength={10}
        />

        <TextFieldHook
          name="password"
          control={control}
          label="รหัสผ่าน"
          type="password"
          placeholder="กรอกรหัสผ่าน"
        />

        <ErrorAlert message={error} />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          icon={<LockIcon size={18} color="white" />}
          style={{ marginTop: "8px" }}
        >
          เข้าสู่ระบบ
        </Button>
      </form>

      {/* Register Link */}
      <div style={{ marginTop: "24px", textAlign: "center" }}>
        <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
          ยังไม่มีบัญชี?{" "}
          <Link
            to="/register"
            style={{
              color: "#16A34A",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            สมัครสมาชิก
          </Link>
        </p>
      </div>
    </AuthFormLayout>
  );
};

export default LoginPage;
