import { ArrowLeft, SearchX } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="not-found">
      <SearchX size={34} aria-hidden="true" />
      <p className="eyebrow">404 / route unavailable</p>
      <h1>That page is not in this portfolio.</h1>
      <p>The requested path, <code>{location.pathname}</code>, does not match an available project or page.</p>
      <Link className="button button--primary" to="/">
        <ArrowLeft size={17} aria-hidden="true" />
        Return to overview
      </Link>
    </div>
  );
};

export default NotFound;
