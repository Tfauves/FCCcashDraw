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

const checkUserInput = () => {
  if (cashInput.value < price) {
    alert("Customer does not have enough money to purchase the item");
  }

  if ((cashInput.value = price)) {
    changeDueDisplay.innerText =
      "No change due - customer paid with exact cash";
  }
};

purchaseBtn.addEventListener("click", checkUserInput);
