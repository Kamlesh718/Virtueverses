import { Link } from "react-router-dom";
import { FacebookCircle, InstagramAlt } from "styled-icons/boxicons-logos";
import { Copyright } from "styled-icons/fa-regular";
import { Twitter } from "styled-icons/icomoon";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="grid bg-violet-500 p-4 font-medium justify-center align-middle gap-4 bg-gradient-to-t from-violet-300 to-violet-500  ">
      <div className="flex gap-5 justify-center">
        <Link
          to="https://www.facebook.com/profile.php?id=100035134786496"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookCircle
            size="25"
            className="hover:scale-150 duration-150 hover:text-sky-700"
          />
        </Link>
        <Link
          to="https://www.instagram.com/718_kamlesh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramAlt
            size="25"
            className="hover:scale-150 duration-150 hover:text-purple-950"
          />
        </Link>
        <Link
          to="https://twitter.com/Kamlesh1202"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter
            size="25"
            className="hover:scale-150 duration-150 hover:text-violet-200"
          />
        </Link>
      </div>

      <div className="flex justify-center">
        <Copyright size="25" />
        <span className="px-2">
          {year} India, All rights reserved by Kamlesh Vishwakarma
        </span>
      </div>
    </div>
  );
}

export default Footer;
