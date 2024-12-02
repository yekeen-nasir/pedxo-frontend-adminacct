const MobileTransactionHistory = () => {
  // const { id } = useParams();

  return (
    <section>
      {/* <h1>Agreement ID: {id}</h1> */}

      <div className="flex flex-col gap-[19px] mt-[50px] mb-[61px] md:mx-[143px] xl:hidden">
        <div className="text-xl font-semibold mt-[30px] mb-[20px] mx-[21px]">
          Transaction History
        </div>

        <div className="flex flex-col gap-9 px-[18px] py-[30px]  mx-[21px] rounded-lg user-bg-clr">
          <div className="font-medium">
            <div className="mb-[10px]">Fixed Payment</div>
            <div className="flex justify-between">
              <div>
                <span>07:10</span> <span>06/23</span>
              </div>
              <div className="font-semibold">$5000</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MobileTransactionHistory;
