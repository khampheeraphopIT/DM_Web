/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "react-select";
import { useProvincesQuery } from "../../queries/api";

interface ProvinceSelectProps {
  value: string | null;
  onChange: (value: string | null) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const ProvinceSelect = ({
  value,
  onChange,
  isLoading = false,
  placeholder = "เลือกจังหวัด",
}: ProvinceSelectProps) => {
  const { data: provinces = [] } = useProvincesQuery();

  const options = provinces.map((prov) => ({
    value: prov,
    label: prov,
  }));

  const selectedOption = options.find((opt) => opt.value === value) || null;

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      minHeight: "44px",
      borderRadius: "12px",
      border: "1px solid #d9d9d9",
      boxShadow: state.isFocused ? "0 0 0 1px #4CAF50" : "none",
      "&:hover": {
        borderColor: "#4CAF50",
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#999",
      fontSize: "16px",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: "16px",
      color: "#333",
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: "12px",
      marginTop: "4px",
      boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#4CAF50"
        : state.isFocused
        ? "#f5f5f5"
        : "white",
      color: state.isSelected ? "white" : "#333",
      fontSize: "16px",
      padding: "10px 12px",
    }),
  };

  return (
    <div>
      <div style={{ marginBottom: "6px", fontSize: "14px", color: "#555" }}>
        เลือกจังหวัด หรือ ใช้ตำแหน่ง GPS
      </div>
      <Select
        value={selectedOption}
        onChange={(option) => onChange(option?.value || null)}
        options={options}
        isLoading={isLoading}
        isSearchable
        placeholder={placeholder}
        noOptionsMessage={() => "ไม่พบจังหวัด"}
        loadingMessage={() => "กำลังโหลดจังหวัด..."}
        styles={customStyles}
        menuPortalTarget={document.body}
        menuPosition="fixed"
      />
    </div>
  );
};
