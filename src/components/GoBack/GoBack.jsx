import css from "./GoBack.module.css";
import { useLocation, NavLink } from "react-router-dom";
import { useRef } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const GoBack = () => {
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  return (
    <>
      <NavLink className={css.back} to={backLinkRef.current}>
        <FaArrowLeftLong />
        Go back
      </NavLink>
    </>
  );
};

export default GoBack;
