import axios from "axios";

const api = axios.create({
  baseURL: "https://v6.exchangerate-api.com/v6/48e611612e574753713dd20e",
})

//geting data
export const converter = () => {
  return api.get("/latest/USD")
}

export const conversionResult = (fromCurrency, toCurrency, amount) => {
  return api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`)
              
}
