import ContractInputForm from "../ContractFormInput";
import "../stepperForms/forms.css";
import dropdownarrow from "../../assets/svg/dropdownarrow.svg";
import { useEffect, useState } from "react";
import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import customFetch from "../utils";

const countriesUrl = "https://api.countrystatecity.in/v1/countries";
const statesUrl = "https://api.countrystatecity.in/v1/countries";

const FormOne = ({ onChange, value }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(countriesUrl, {
          headers: {
            "X-CSCAPI-KEY":
              "OEVBRUJVQUhTaEpYMDdOcmtySGhWUW1rQ1A1V2VxMFlTQ1JoQzhTTQ==",
          },
        });
        const data = response.data;
        setCountries(data);
        console.log(countries);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;

    const fetchStates = async () => {
      try {
        const response = await axios.get(
          `${statesUrl}/${selectedCountry}/states`,
          {
            headers: {
              "X-CSCAPI-KEY":
                "OEVBRUJVQUhTaEpYMDdOcmtySGhWUW1rQ1A1V2VxMFlTQ1JoQzhTTQ==",
            },
          }
        );
        const data = response.data;
        setStates(data);
        console.log(states);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchStates();
  }, [selectedCountry]);
  // const { data } = useQuery({
  //   queryKey: ["country"],
  //   queryFn: () => customFetch.get("/"),
  // });

  // console.log(data);

  return (
    <div>
      <div className="flex flex-col gap-[18px]">
        <div className="text-lg font-semibold leading-normal xl:text-2xl xl:mb-[18px]">
          Personal Information
        </div>
        <ContractInputForm
          htmlFor="clientName"
          label="Client Name *"
          type="text"
          name="clientName"
          id="clientName"
          placeholder="John Doe"
          value={value}
          onChange={onChange}
          required={true}
        />

        <ContractInputForm
          htmlFor="email"
          label="Email *"
          type="email"
          name="email"
          id="email"
          placeholder="John@gmail.com"
          value={value}
          onChange={onChange}
          required={true}
        />

        <div className="flex flex-col gap-1 xl:gap-4">
          <label
            htmlFor="country"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Country *
          </label>
          <div className="relative ">
            <select
              name="country"
              id="country"
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setStates([]);
              }}
              value={selectedCountry}
              className="appearance-none w-full bg-transparent border outline-gray-400 rounded-lg h-10 p-3 text-[12px] xl:h-[60px] xl:text-[16px]"
              style={{ borderColor: "rgba(0, 0, 0, 0.20)" }}
            >
              <option value=""></option>
              {countries.map((country) => {
                return (
                  <option key={country.id} value={country.iso2}>
                    {country.name}
                  </option>
                );
              })}
            </select>
            <div className="absolute top-[50%] right-4 transform -translate-y-1/2 pointer-events-none text-blue-600 text-2xl ">
              <img src={dropdownarrow} alt="" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 xl:gap-4">
          <label
            htmlFor="state"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Region/Province/State *
          </label>
          <div className="relative ">
            <select
              name="state"
              id="state"
              className="appearance-none w-full bg-transparent border outline-gray-400 rounded-lg h-10 p-3 text-[12px] xl:h-[60px] xl:text-[16px]"
              style={{ borderColor: "rgba(0, 0, 0, 0.20)" }}
            >
              <option value=""></option>
              {states.map((state) => {
                return (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                );
              })}
            </select>
            <div className="absolute top-[50%] right-4 transform -translate-y-1/2 pointer-events-none text-blue-600 text-2xl ">
              <img src={dropdownarrow} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormOne;
