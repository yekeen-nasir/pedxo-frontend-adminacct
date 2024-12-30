import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../assets/svg/google-logo.svg";
import FormInput from "../components/FormInput";
import eyesolid from "../assets/svg/eyesolid.svg";
import eyeslashsolid from "../assets/svg/eyeslashsolid.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authFetch from "../components/auth";
import { useGlobalContext } from "../Context";

const login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { setUserBio } = useGlobalContext();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("email is required.");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("invalid email format.");
      return false;
    } else if (!formData.password.trim()) {
      toast.error("password should not be empty.");
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
          "/auth/login",
          JSON.stringify(formData)
        );
        toast.success("Welcome!");
        const token = response.data.result;
        const accessTokenExpiration = Date.now() + 1200000;
        const refreshTokenExpiration = Date.now() + 604800000;

        const tokenData = {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          accessTokenExpiration,
          refreshTokenExpiration,
        };
        localStorage.setItem("user", JSON.stringify(tokenData));
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
        console.log(response);

        const userBio = response.data.result;
        setUserBio(userBio);
        console.log(userBio);
      } catch (error) {
        console.log(error);
        if (error.status === 400) {
          toast.error("invalid email or password");
        } else if (error.response.data.message === "user is not found") {
          toast.error(error.response.data.message);
        } else {
          toast.error(error);
        }
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
        <h1 className="mb-[59px] text-2xl font-semibold leading-normal 2xl:text-[30px] ">
          Login
        </h1>
        <button className="w-full flex items-center justify-center p-4 gap-[10px] border border-black rounded-lg mb-[15px]">
          <img src={googleLogo} alt="google logo" />
          <span className="font-medium">Continue with Google</span>
        </button>
        <form onSubmit={handleFormSubmit}>
          <div className="text-lg font-medium line-with-text">Or</div>

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

          <div className="pr-text-clr font-medium">
            <Link to="/reset-password-otp">Forgot password?</Link>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="py-4 font-medium pr-bg-clr text-white w-full mt-[6px] rounded-lg"
            >
              {isLoading ? <div className="loading"></div> : "Continue"}
            </button>
          </div>
        </form>
        <div className="flex gap-2 text-[15px] mt-[13px] font-medium">
          <span>Don't have an account?</span>
          <div className="pr-text-clr">
            <Link to="/signup">Create account</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default login;
