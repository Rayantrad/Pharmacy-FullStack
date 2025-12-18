import { NavLink } from "react-router";

function Button({ filled, text, url, className }) {
  return (
    <NavLink
      to={url}
      className={`font-bold rounded flex justify-center items-center px-4 text-xs py-1
        ${className}
        ${
          filled
            ? "bg-blue-600 text-white "
            : "bg-white border-2 border-gray-300 rounded text-xs font-normal"
        }`}
    >
      {text}
    </NavLink>
  );
}

export default Button;
