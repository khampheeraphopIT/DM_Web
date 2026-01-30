import * as yup from "yup";

export const loginSchema = yup.object().shape({
  phone: yup
    .string()
    .required("กรุณากรอกเบอร์โทรศัพท์")
    .matches(/^[0-9]+$/, "กรุณากรอกเฉพาะตัวเลข")
    .min(10, "เบอร์โทรศัพท์ต้องมี 10 หลัก")
    .max(10, "เบอร์โทรศัพท์ต้องมี 10 หลัก"),
  password: yup
    .string()
    .required("กรุณากรอกรหัสผ่าน")
    .min(4, "รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร"),
});

export const registerSchema = yup.object().shape({
  phone: yup
    .string()
    .required("กรุณากรอกเบอร์โทรศัพท์")
    .matches(/^[0-9]+$/, "กรุณากรอกเฉพาะตัวเลข")
    .min(10, "เบอร์โทรศัพท์ต้องมี 10 หลัก")
    .max(10, "เบอร์โทรศัพท์ต้องมี 10 หลัก"),
  name: yup
    .string()
    .required("กรุณากรอกชื่อ")
    .min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"),
  password: yup
    .string()
    .required("กรุณากรอกรหัสผ่าน")
    .min(4, "รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร"),
  confirmPassword: yup
    .string()
    .required("กรุณายืนยันรหัสผ่าน")
    .oneOf([yup.ref("password")], "รหัสผ่านไม่ตรงกัน"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
