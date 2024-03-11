const price = 19.5;
const cid = [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
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
  let change = (cash - price) * 100; // Convert to cents for integer arithmetic
  let totalAvailable = cid.reduce(
    (sum, denomination) =>
      sum + denomination[1] * denominations[denomination[0]] * 100,
    0
  );

  let changeDue = [];

  if (change > totalAvailable) {
    return { status: "INSUFFICIENT_FUNDS" };
  }

  for (let i = cid.length - 1; i >= 0; i--) {
    const denomination = cid[i][0];
    const availableAmount = cid[i][1] * 100; // Convert to cents
    const denominationValue = denominations[denomination] * 100; // Convert to cents

    let quantity = Math.floor(availableAmount / denominationValue);
    let returnedQuantity = Math.min(
      quantity,
      Math.floor(change / denominationValue)
    );
    let returnedAmount = returnedQuantity * denominationValue;

    if (returnedQuantity > 0) {
      changeDue.push([denomination, returnedAmount / 100]); // Convert back to dollars
      change -= returnedAmount;
    }
  }

  if (change === 0) {
    if (isDrawerEmpty(cid)) {
      return { status: "CLOSED", change: cid.slice() };
    } else {
      return { status: "OPEN", change: changeDue };
    }
  } else {
    return { status: "INSUFFICIENT_FUNDS" };
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
