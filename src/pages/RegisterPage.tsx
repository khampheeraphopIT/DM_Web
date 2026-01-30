import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../contexts/AuthContext";
import { TextFieldHook } from "../components/form";
import { registerSchema } from "../utils/validation/schemas";
import AuthFormLayout from "../components/layout/AuthFormLayout";
import Button from "../components/common/Button";
import ErrorAlert from "../components/common/ErrorAlert";
import { UserIcon } from "../components/common/icons";

interface RegisterFormData {
  phone: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema) as Resolver<RegisterFormData>,
    defaultValues: {
      phone: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    setError("");
    setIsLoading(true);

    try {
      const result = await register(data.phone, data.name, data.password);
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
    <AuthFormLayout
      title="สมัครสมาชิก"
      subtitle="สร้างบัญชีเพื่อบันทึกประวัติการสแกน"
    >
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
          name="name"
          control={control}
          label="ชื่อ"
          type="text"
          placeholder="กรอกชื่อของคุณ"
        />

        <TextFieldHook
          name="password"
          control={control}
          label="รหัสผ่าน"
          type="password"
          placeholder="กรอกรหัสผ่าน"
        />

        <TextFieldHook
          name="confirmPassword"
          control={control}
          label="ยืนยันรหัสผ่าน"
          type="password"
          placeholder="กรอกรหัสผ่านอีกครั้ง"
        />

        <ErrorAlert message={error} />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          icon={<UserIcon size={18} color="white" />}
          style={{ marginTop: "8px" }}
        >
          สมัครสมาชิก
        </Button>
      </form>

      {/* Login Link */}
      <div style={{ marginTop: "24px", textAlign: "center" }}>
        <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
          มีบัญชีอยู่แล้ว?{" "}
          <Link
            to="/login"
            style={{
              color: "#16A34A",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </AuthFormLayout>
  );
};

export default RegisterPage;
