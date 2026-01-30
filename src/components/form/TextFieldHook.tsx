import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface TextFieldHookProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "tel" | "email" | "number";
  disabled?: boolean;
  maxLength?: number;
}

export function TextFieldHook<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  disabled = false,
  maxLength,
}: TextFieldHookProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {label && (
            <label
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              {label}
            </label>
          )}
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            style={{
              boxSizing: "border-box",
              width: "100%",
              padding: "14px 16px",
              fontSize: "16px",
              border: error ? "2px solid #EF4444" : "2px solid #E5E7EB",
              borderRadius: "12px",
              outline: "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
              backgroundColor: disabled ? "#F9FAFB" : "white",
            }}
          />
          {error && (
            <span
              style={{
                fontSize: "12px",
                color: "#EF4444",
              }}
            >
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}
