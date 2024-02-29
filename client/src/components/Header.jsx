/* eslint-disable no-unused-vars */
import { Button, Navbar } from "flowbite-react";
import { FaMoon } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className="self-center border-b-2 text-sm sm:text-xl font-semibold dark:text-white">
      <Link to="/">
        <span className="px-2 py-1 rounded bg-gradient-to-r  from-yellow-200 via-orange-300 to-red-500 text-gray">
          DocVault
        </span>
      </Link>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>

        <Link to="/sign-in">
          <Button gradientDuoTone="purpleToBlue" outline>Sign In</Button>
        </Link>
        <Navbar.Toggle />
      </div>
        <Navbar.Collapse>
          <Navbar.Link active={path==='/'} as={'div'}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path==='/about'}as={'div'}>
            <Link to="/about">About</Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
