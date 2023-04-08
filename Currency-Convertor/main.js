
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#currency-converter")
    .addEventListener("submit", (event) => {
      event.preventDefault(); //to prevent page refresh

      const {
        target: { from, to, amount },
      } = event;

      let headers = new Headers();
      headers.append("apikey", "D4T6Um0jJRU3B1TCm0tiWFhANErTQtrB");

      const requestOptions = {
        method: "GET",
        headers,
      };

      fetch(
        `https://api.apilayer.com/exchangerates_data/convert?to=${to.value}&from=${from.value}&amount=${amount.valueAsNumber}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {

            let {info,date,query: {to,from,amount},result} = data;
            document.querySelector(".result-html").textContent = `Converted Amount into ${to} is ${result}${to} @ Rate : ${info.rate} ${to}` 

        });
    });
});
