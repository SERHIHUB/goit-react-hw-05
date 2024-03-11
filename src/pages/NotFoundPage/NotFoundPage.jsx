import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <b>Ssory, this page does not exist!</b>
      <Link to="/">Go to Home page.</Link>
    </div>
  );
};

export default NotFoundPage;
