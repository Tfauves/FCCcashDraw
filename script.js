let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueDisplay = document.getElementById("change-due");

const denominations = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100,
};

const checkChange = (price, cash, cid) => {
  let change = cash - price;
  let totalAvailable = cid.reduce(
    (sum, denomination) =>
      sum + denomination[1] * denominations[denomination[0]],
    0
  );

  let changeDue = [];

  if (change > totalAvailable) {
    return { status: "INSUFFICIENT_FUNDS" };
  }

  for (let i = cid.length - 1; i >= 0; i--) {
    const denomination = cid[i][0];
    const availableAmount = cid[i][1];
    const denominationValue = denominations[denomination];

    let quantity = Math.floor(availableAmount / denominationValue);
    let returnedQuantity = Math.min(
      quantity,
      Math.floor(change / denominationValue)
    );
    let returnedAmount = returnedQuantity * denominationValue;

    if (returnedQuantity > 0) {
      changeDue.push([denomination, returnedAmount]);
      change -= returnedAmount;
      change = parseFloat(change.toFixed(2));
    }
  }

  if (change > 0) {
    return { status: "INSUFFICIENT_FUNDS" };
  } else if (Math.abs(totalAvailable - (cash - price)) < 0.0001) {
    return { status: "CLOSED", change: cid.slice() };
  } else {
    return { status: "OPEN", change: changeDue };
  }
};

const isDrawerEmpty = (cid) => {
  return cid.every((denomination) => denomination[1] <= 0);
};

purchaseBtn.addEventListener("click", () => {
  const cash = parseFloat(cashInput.value);

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cash === price) {
    changeDueDisplay.innerText =
      "No change due - customer paid with exact cash";
  } else {
    const changeResult = checkChange(price, cash, cid);

    if (changeResult.status === "INSUFFICIENT_FUNDS") {
      changeDueDisplay.innerText = "Status: INSUFFICIENT_FUNDS";
    } else if (changeResult.status === "CLOSED") {
      changeDueDisplay.innerText = "Status: CLOSED";
    } else {
      const changeDetails = changeResult.change.map(
        ([denomination, amount]) => `${denomination}: $${amount.toFixed(2)}`
      );
      changeDueDisplay.innerText = `Status: OPEN ${changeDetails.join(" ")}`;
    }
  }
});
