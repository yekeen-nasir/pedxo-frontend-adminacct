import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../assets/svg/google-logo.svg";
import FormInput from "../components/FormInput";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import eyesolid from "../assets/svg/eyesolid.svg";
import eyeslashsolid from "../assets/svg/eyeslashsolid.svg";
import authFetch from "../components/auth";
import { useGlobalContext } from "../Context";

const SignUp = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const { setUserBio } = useGlobalContext();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()_+!])[A-Za-z\d@#$%^&*()_+!]{8,24}$/;
    if (!formData.firstName.trim()) {
      toast.error("first name is required.");
      return false;
    } else if (!formData.lastName.trim()) {
      toast.error("last name is required.");
      return false;
    } else if (!formData.email.trim()) {
      toast.error("email is required.");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("invalid email format.");
      return false;
    } else if (!formData.password.trim()) {
      toast.error("password should not be empty.");
      return false;
    } else if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return false;
    } else if (!confirmPassword.trim()) {
      toast.error("confirm password is required.");
      return false;
    } else if (formData.password !== confirmPassword) {
      toast.error("passwords do not match.");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (validateForm()) {
      try {
        const response = await authFetch.post(
          "/auth",
          JSON.stringify(formData)
        );
        if (response.data === "success" || response.status === 201) {
          const userBio = response.data.result;
          setUserBio(userBio);
          toast.success("Check mail for otp");
          setTimeout(() => {
            navigate("/account-verification", {
              state: { email: formData.email },
            });
          }, 2000);
        }

        const tokenResp = response.data.result;
        const accessTokenExpiration = Date.now() + 1200000;
        const refreshTokenExpiration = Date.now() + 604800000;

        const tokenData = {
          accessToken: tokenResp.accessToken,
          refreshToken: tokenResp.refreshToken,
          accessTokenExpiration,
          refreshTokenExpiration,
        };
        localStorage.setItem("user", JSON.stringify(tokenData));
        console.log(response);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === "email already exist"
        ) {
          toast.error("email already exists.");
          return false;
        }
        toast.error(error.response.data.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-w-[390px] max-w-[1440px] min-h-[844px] max-h-[1024px] mx-auto px-[25px]">
      <ToastContainer />
      <div className="pt-[143px] pb-[59px] max-w-[569px] mx-auto xl:pt-10">
        <h1 className="mb-[59px] text-2xl font-semibold leading-normal xl:text-[30px] 2xl:text-[40px] 2xl:mb-5">
          Create account
        </h1>
        <button className="w-full flex items-center justify-center p-4 gap-[10px] border border-black rounded-lg mb-[15px]">
          <img src={googleLogo} alt="google logo" />
          <span className="font-medium">Continue with Google</span>
        </button>
        <form onSubmit={handleFormSubmit}>
          <div className="text-lg font-medium line-with-text">Or</div>
          <FormInput
            htmlFor="firstName"
            label="FirstName"
            type="text"
            name="firstName"
            id="firstName"
            placeholder="first name"
            value={formData.firstName}
            onChange={handleChange}
          />

          <FormInput
            htmlFor="lastName"
            label="LastName"
            type="text"
            name="lastName"
            id="lastName"
            placeholder="last name"
            value={formData.lastName}
            onChange={handleChange}
          />

          <FormInput
            htmlFor="email"
            label="Email"
            type="email"
            name="email"
            id="email"
            placeholder="email address"
            value={formData.email}
            onChange={handleChange}
          />

          <div className="relative">
            <FormInput
              htmlFor="password"
              label="Password"
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              id="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="w-4 absolute top-[60%] right-0 mr-3">
              {isPasswordVisible ? (
                <img
                  src={eyesolid}
                  alt="password visible icon"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              ) : (
                <img
                  src={eyeslashsolid}
                  alt="password invisible icon"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              )}
            </div>
          </div>

          <div className="relative">
            <FormInput
              htmlFor="confirmPassword"
              label="Confirm Password"
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="w-4 absolute top-[60%] right-0 mr-3">
              {isConfirmPasswordVisible ? (
                <img
                  src={eyesolid}
                  alt="password visible icon"
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                />
              ) : (
                <img
                  src={eyeslashsolid}
                  alt="password invisible icon"
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                />
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="outline-none py-4 font-medium pr-bg-clr text-white w-full mt-[6px] rounded-lg"
            >
              {isLoading ? <div className="loading"></div> : "Continue"}
            </button>
          </div>
        </form>
        <div className="flex gap-2 text-[15px] mt-[13px] font-medium">
          <span>Already have an account?</span>
          <div className="pr-text-clr">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignUp;
