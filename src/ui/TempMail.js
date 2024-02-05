import { Link } from "react-router-dom";

function TempMail() {
  return (
    <div className="bg-red-500 text-red-100 p-2 rounded-lg">
      <h1>
        You can use Temporary mail to register here by using the site below ⬇️
      </h1>
      <strong className="bg-violet-950 p-1 rounded-md">
        <Link
          to="https://temp-mail.org/en/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Temp Mail
        </Link>
      </strong>
    </div>
  );
}

export default TempMail;
