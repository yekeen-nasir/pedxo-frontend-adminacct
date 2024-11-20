import searchingdoc from "../assets/png/searchingdoc.png";
import notice from "../assets/svg/notice.svg";
import AddDeveloperBtn from "./AddDeveloperBtn";
import docpin from "../assets/svg/docpin.svg";

const SearchingDoc = ({
  noticeText,
  searchingdocTitle,
  searchingdocText,
  onBoarding,
  children,
}) => {
  return (
    <section>
      <div>
        <div className=" px-[15px] py-4 overview-expense-bg mt-[30px] rounded-lg xl:px-[35px] xl:py-[31px]">
          <div className="flex items-center gap-3 mb-5">
            <img src={notice} alt="notice" />
            <p className="text-sm font-medium leading-normal lg:text-[20px]">
              {noticeText}
            </p>
          </div>

          <div className="flex flex-col gap-3 xl:flex-row">
            {onBoarding.map((item, index) => (
              <div
                key={index}
                className="flex items-start flex-1 gap-[15px]  bg-white py-[17px] px-[18px] rounded-lg xl:max-w-[342px]"
              >
                <img src={docpin} alt="docpin icon" />
                <div>
                  <div className="text-sm font-semibold leading-normal mb-[5px] lg:text-[16px]">
                    {item.title}
                  </div>
                  <p
                    className="text-[10px] font-normal leading-normal lg:text-[12px]"
                    style={{ color: "rgba(0, 0, 0, 0.70)" }}
                  >
                    {item.desp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center mt-[54px]">
          <div className="mb-[18px]">
            <img src={searchingdoc} alt="searching icon" />
          </div>
          <div className="text-[20px] font-medium lg:text-[29px] text-center">
            {searchingdocTitle}
            <p className="max-w-[550px] grey-text text-[12px] text-center font-normal leading-normal mx-[35px] xl:mx-auto xl:w-[60 %] lg:text-[20px]">
              {searchingdocText}
            </p>

            <div className="flex justify-center">
              {children || <AddDeveloperBtn />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SearchingDoc;
