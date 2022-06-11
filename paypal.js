console.log("entra");

const payment = () => {
  console.log("entra");
  const createAccount = fetch("http://localhost:8080/payment/create-payments", {
    method: "POST",
    body: JSON.stringify({
      price: 500,
      custom_id: "62a213eca4e7f99ec47d6f7d",
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
      const paypalWindow = window.open(`${body.data.links[1].href}`);
      //window.location.assign(`${body.data.links[1].href}`);
    });
};
