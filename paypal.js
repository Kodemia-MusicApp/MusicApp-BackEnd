console.log("entra");

const payment = () => {
  console.log("entra");
  const createAccount = fetch("http://localhost:8080/payment/create-payments", {
    method: "POST",
    body: JSON.stringify({
      price: 500,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(createAccount);
  createAccount
    .then((res) => res.json())
    .then((body) => {
      console.log(body.data.links[1].href);
      //  window.location.assign(`${body.data.links[1].href}`);
    });
};
