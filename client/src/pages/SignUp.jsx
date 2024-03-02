/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.registerId ||
      !formData.email ||
      !formData.password ||
      !formData.address ||
      !formData.hospitalName
    ) {
      return setErrorMessage("Please fill in all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.errorMessage);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex p-3 max-w-3xl mx-auto flex-col sm:flex-row md:items-center gap-6">
        <div className="flex-1 ">
          <Link to="/">
            <span className="px-3 py-1 font-bold rounded bg-gradient-to-r from-purple-600 to-pink-400 text-gray text-3xl">
              DocVault
            </span>
          </Link>
          <p className="font-semibold mt-5">
            Experience peace of mind as your sensitive medical documents find a
            home in this advanced and user-friendly digital vault.
          </p>
        </div>

        <div className="flex-1">
          <form
            className="flex flex-col gap-2 max-w-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div>
              <Label className="text-gray-600">Registration ID</Label>
              <TextInput
                className="border p-2 rounded-md w-full"
                type="text"
                placeholder="Username"
                id="registerID"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-gray-600">Hospital Name</Label>
              <TextInput
                className="border p-2 rounded-md w-full"
                type="text"
                placeholder="Hospital Name"
                id="HospitalName"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-gray-600">Email</Label>
              <TextInput
                className="border p-2 rounded-md w-full"
                type="text"
                placeholder="Email.."
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-gray-600">Address</Label>
              <TextInput
                className="border p-2 rounded-md w-full"
                type="text"
                placeholder="Address"
                id="address"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-gray-600">Password</Label>
              <TextInput
                className="border p-2 rounded-md w-full"
                type="password"
                placeholder="*******"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-md"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex items-center justify-center mt-5">
            <span className="text-gray-600">Have an account?</span>
            <Link to="/sign-in" className="text-blue-400">
              Sign-in
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
