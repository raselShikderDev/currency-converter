import { useEffect, useState } from "react";
import { conversionResult, converter } from "./api/PostApi";

const Converter = () => {
  const [data, setData] = useState({});
  const [amount, setAmount] = useState(0);
  const [toCurrency, setToCurrency] = useState("BDT");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [myError, setMyError] = useState(null);

  // Getting Data from Api and push it in a state
  const loadData = async () => {
    try {
      setLoading(true);
      const myData = await converter();
      if (myData) {
        setData(myData.data.conversion_rates);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (amount) {
    setToCurrency(0)
  }

  // it will load once if data fetched successfully from Api
  useEffect(() => {
    loadData();
  }, []);

  // it will load once for selct and Options feild
  useEffect(() => {
    if (data) {
      setOptions(Object.keys(data));
    }
  }, [data]);

  // Handling Convert Button and Result
  const handleConvertBtn = async () => {
    setLoading(true);
    setMyError(null);
    const resultData = await conversionResult(fromCurrency, toCurrency, amount);
    const { conversion_result } = resultData.data;
    try {
      if (conversion_result) {
        setConvertedAmount(conversion_result);
        setLoading(false);
      }
    } catch (error) {
      setMyError("conversion Faild");
      setLoading(false);
      console.error(error);
      console.log(myError);
    }
  };

  const converDisable = amount <= 0 || loading || fromCurrency === toCurrency;

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-800 overflow-hidden">
      <div className="bg-slate-100  w-2/5 shadow-xl rounded-md py-3 px-5 ">
        <h1 className="text-center font-bold text-2xl text-[#927ff5] pb-3">
          Currency Converter
        </h1>
        <hr className="bg-gray-300 h-[1.5px]" />
        <div className="pt-8 w-10/12 m-auto">
          <label htmlFor="amount" className="font-semibold">
            Amount:{" "}
          </label>{" "}
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="rounded border border-gray-950 py-0.5 px-1.5 "
          />
        </div>
        <div className="pt-6 w-10/12 m-auto flex justify-between">
          <div>
            <label htmlFor="fromCurrency" className="font-semibold">
              From Currency:{" "}
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {options.map((currOption, ind) => {
                // console.log(currOption)
                return (
                  <option key={ind} value={currOption}>
                    {currOption}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="toCurrency" className="font-semibold">
              To Currency:{" "}
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {options.map((currOption, ind) => {
                // console.log(currOption)
                return (
                  <option key={ind} value={currOption}>
                    {currOption}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="mt-8 mb-10 text-center">
          <button
            disabled={converDisable}
            onClick={handleConvertBtn}
            className="bg-blue-500 text-white rounded-[25px] px-10 py-1 hover:scale-x-110 active:bg-blue-700"
          >
            Convert
          </button>
        </div>
        <hr className="bg-gray-300 h-[1.5px]" />
        <div className=" text-center mt-4">
          <p className="uppercase text-2xl font-bold">{`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Converter;
