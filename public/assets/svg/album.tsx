import { JSX } from "react";
import { ITypeSvg } from "../../../src/type/svg";

export default function AlbumSvg({
  color = "#8A97A3",
  size = 24,
}: ITypeSvg): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M360-400h400L622-580l-92 120-62-80-108 140Zm-40 160q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z" />
    </svg>
  );
}
