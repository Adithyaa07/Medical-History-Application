/* eslint-disable no-unused-vars */
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { SignOutSuccess } from "../redux/hospital/hospitalSlice";
function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentHospital } = useSelector((state) => state.hospital);
  const { theme } = useSelector((state) => state.theme);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(SignOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar className="self-center border-b-2 text-sm sm:text-xl font-semibold dark:text-white">
      <Link to="/">
        <span className="px-2 py-1 rounded bg-gradient-to-r  from-yellow-200 via-orange-300 to-red-500 text-gray">
          DocVault
        </span>
      </Link>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </Button>

        {currentHospital ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">
                @{currentHospital.HospitalName}
              </span>
              <span className="block text-sm font-medium truncate">
                {currentHospital.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        {currentHospital && (
          <div className="text-sm content-center mt-2">
            {currentHospital.HospitalName}
          </div>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        {currentHospital && (
          <Navbar.Link active={path === "/dashboard"} as={"div"}>
            <Link to="/dashboard">Dashboard</Link>
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
