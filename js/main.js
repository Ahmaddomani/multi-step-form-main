// notice that style are in the css file
let next = document.querySelector(".next");
let inputs = document.querySelectorAll(".inputs input");
//  start define the main colors
let purpleColor = document.styleSheets[0].rules[3].style.getPropertyValue(
  "--Purplish"
);

let Marine = document.styleSheets[0].rules[3].style.getPropertyValue(
  "--Marine"
);
let StrawberryRed = document.styleSheets[0].rules[3].style.getPropertyValue(
  "--Strawberry-red"
);
//  end define the main colors

//------------------------------------start global defines --------------------------------

//define the container

let container = document.querySelector(".container");

//define the result div
let result = document.querySelector(".result");

//start  define the boxes  from pick div
let boxes = document.querySelectorAll(".box");
//end  define the boxes from pick div

//creat the set that containes the active boxes
let activeBoxes = new Set([]);

// start define the h4 from summary div
let h4 = document.querySelector(".summary .text h4");
// end define the h4 from summary div

//start  define final-price
let finalPprice = document.querySelector(".final-price");
//end  define final-price

// define the plans
let plans = document.querySelectorAll(".plans > div");

//define the change plan button from (yealry to monthly )
let changePlanButon = document.querySelector("span.button");
////////////////////////////////////////////////////////////
//define some spans for change their values
let monthlySpan = document.querySelector("span.monthly");
let yearlySpan = document.querySelector("span.Yearly");
let priceSpans = document.querySelectorAll("span.price");
let durationSpan = document.querySelectorAll("span.duration");
///////////////////////////////////////////////////////////////

// define the priceper
let boxesPrice = document.querySelectorAll(".box span.pricePer");
// end define the priceper

// satrt define the duration span from summary
let summaryDuSpan = h4.nextElementSibling;
summaryDuSpan.textContent = "(Yearly)";
// end define the duration span from summary

//start defien final-price span
let finalPrice = document.querySelector(".final-price");
//end defien final-price span

//define the confirm button
let confirmbutton = document.querySelector(".confirm");

//---------------------------------------end global defines ---------------------------

// start creating the total  div in summary div

let total = document.createElement("div");
total.classList.add("total");

//creat the children
let totalp = document.createElement("p");
totalp.textContent = "Total (per Year)";
let totalspan = document.createElement("span");

//append the children
total.append(totalp);
total.append(totalspan);

// end creating the total div for change the bodrer color and foucs and blur

//  start cheaking  valdation
let key = "";
//creat the email pattern

let emailPattern = /[a-z0-9]+@\w+\.[a-z]/gi;

//creat the phone pattern
let phoneNumberPattern = /\+\d{1,3}\s\d{1,10}/gi;

next.addEventListener("click", () => {
  inputs.forEach((input) => {
    // cheak if the inputs are emty
    if (input.value === "") {
      input.style.borderColor = StrawberryRed;
    }
    input.onfocus = function () {
      input.style.borderColor = purpleColor;
    };
    input.onblur = function () {
      input.style.borderColor = "#ccc";
    };
  });
  //cheak the email vlaue
  if (!inputs[1].value.match(emailPattern)) {
    changecolorandfoucs(inputs[1]);
  }
  //cheak the phone value
  if (!inputs[2].value.match(phoneNumberPattern)) {
    changecolorandfoucs(inputs[2]);
  }
  // store the active boxes in a set when click on next
  boxes.forEach((box) => {
    if (box.classList.contains("active")) {
      activeBoxes.add(box);
    }
  });
  // delete the item that doesent contain an active class
  boxes.forEach((box) => {
    if (!box.classList.contains("active")) {
      activeBoxes.delete(box);
    }
  });
  // get an array form the activeBoxes set
  let arrayFromboxes = [...activeBoxes];

  //loop on the boxes for adding the features to the result div
  arrayFromboxes.forEach((box) => {
    let name = box.querySelector(".text h4").textContent;
    let featurePrice = box.querySelector(".pricePer");
    let feature = document.createElement("div");
    feature.classList.add("feature");

    //start create the childern
    let p = document.createElement("p");
    p.textContent = name;
    let span = document.createElement("span");
    span.textContent = featurePrice.textContent;
    //end create the childern

    //appen the children to the feature
    feature.append(p);
    feature.append(span);

    //append the feature to the result
    result.append(feature);
  });

  // match the digits form the price
  let one = +document
    .querySelector(".final-price")
    .textContent.match(/\d+/g)
    .join("");

  //define second var
  let tow = 0;

  // looping on the featurs to get the digits form them
  let features = document.querySelectorAll(".feature");
  features.forEach((feature) => {
    tow += +feature.querySelector("span").textContent.match(/\d+/g);
  });
  totalspan.textContent = `$${one + tow}/${key}`;
  //append to the summary
  //define the summary div
  let summary = document.querySelector(".summary");
  summary.append(total);
});
//  end cheaking  valdation

// start with foucs on plans

//define a  choisedItem var
let choisedItem = plans[0];

// add the default value to the finalPrice
finalPprice.textContent = choisedItem.querySelector(".price").textContent;

// add the default value to the h4
h4.textContent = choisedItem.querySelector(".text h4").textContent;

plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    plans.forEach((e) => {
      e.classList.remove("choised");
      plan.classList.add("choised");
    });

    // store the coised in a var
    choisedItem = plan;
    h4.textContent = choisedItem.querySelector(".text h4").textContent;
    finalPprice.textContent = choisedItem.querySelector(".price").textContent;
  });
});

// end with foucs on plans

// start behavior when click on the change plan button

changePlanButon.addEventListener("click", () => {
  changePlanButon.firstElementChild.classList.toggle("left");
  monthlySpan.classList.toggle("colored");
  yearlySpan.classList.toggle("colored");
  if (monthlySpan.classList.contains("colored")) {
    priceSpans[0].textContent = "$9/mo";
    priceSpans[1].textContent = "$12/mo";
    priceSpans[2].textContent = "$15/mo";
    boxesPrice[0].textContent = "+$1/mo";
    boxesPrice[1].textContent = "+$2/mo";
    boxesPrice[2].textContent = "+$2/mo";
    summaryDuSpan.textContent = "(Monthly)";
    totalp.textContent = "Total (per month)";
    key = "mo";
    durationSpan.forEach((span) => {
      span.classList.add("hide");
    });
  } else {
    priceSpans[0].textContent = "$90/Yr";
    priceSpans[1].textContent = "$120/Yr";
    priceSpans[2].textContent = "$150/Yr";
    boxesPrice[0].textContent = "+$10/Yr";
    boxesPrice[1].textContent = "+$20/Yr";
    boxesPrice[2].textContent = "+$20/Yr";
    summaryDuSpan.textContent = "(Yearly)";
    totalp.textContent = "Total (per year)";
    key = "yr";
  }
  if (yearlySpan.classList.contains("colored")) {
    durationSpan.forEach((span) => {
      span.classList.remove("hide");
    });
  }

  // update the value of finalPprice when change the mode to monthly
  finalPprice.textContent = choisedItem.querySelector(".price").textContent;
});
// end behavior when click on the change plan button

// start pick div
// start adding the active class to the box and remove it
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.classList.toggle("active");
  });
});
// end adding the active class to the box and remove it

// end pick div

// start moving to the next section
// define the main sections
let sections = [...document.querySelectorAll(".container > div")];

// define the steps points
let steps = [...document.querySelectorAll(".steps li span.count")];

// define the goBack button
let goBack = document.querySelector(".go-back");

let i = 0;
next.addEventListener("click", () => {
  if (
    inputs[0].value !== "" &&
    inputs[1].value.match(emailPattern) &&
    inputs[2].value.match(phoneNumberPattern)
  ) {
    steps.forEach((step) => {
      if (step.classList.contains("active")) {
        step.classList.remove("active");
        i = +step.textContent;
      }
    });
    if (i > 0) {
      goBack.style.display = "block";
    } else {
      goBack.style.display = "none";
    }
    steps[i].classList.add("active");
    sections.forEach((section) => {
      section.style.display = "none";
    });
    sections[i].style.display = "block";
    if (i === 3) {
      confirmbutton.style.display = "block";
      next.style.display = "none";
    }
  }
});
// end moving to the next section

// start moving to previos  section
goBack.addEventListener("click", () => {
  [...document.querySelector(".result").children].forEach((e) => {
    if (e.classList.contains("feature")) {
      e.remove();
    }
    // remove the active class from the cheakboxes when click on the go-back
    [...document.querySelectorAll(".cheakboxes .box")].forEach((box) => {
      box.classList.remove("active");
    });
  });
  let s = 0;
  steps.forEach((step) => {
    if (step.classList.contains("active")) {
      s = +step.textContent;
      step.classList.remove("active");
    }
  });
  steps[s - 2].classList.add("active");
  sections.forEach((section) => {
    section.style.display = "none";
  });
  if (s > 2) {
    next.style.display = "block";
    confirmbutton.style.display = "none";
  }
  if (s == 2) {
    goBack.style.display = "none";
  }
  sections[s - 2].style.display = "block";
});
// end moving to previos  section

// chaenge the mode (yearly || monthly )if the user cilcked on the change button
let change = document.querySelector(".change");
change.addEventListener("click", () => {
  goBack.click();
  goBack.click();
});

// the last point is to click on the confirm button and show the confirmeddiv
confirmbutton.addEventListener("click", () => {
  //first hide the last section which is the 4 section
  document.querySelector(".summary").style.display = "none";
  // second creat the confirm div
  let confirmDiv = document.createElement("div");
  confirmDiv.classList.add("confirm-div");

  // notice that style are in the css file

  //cerat the children

  // cerat the img
  let img = document.createElement("img");
  img.src = "./assets/images/icon-thank-you.svg";

  //creat the h1
  let h1 = document.createElement("h1");
  h1.textContent = "Thank you";
  h1.style.color = Marine;

  // creat the p
  let p = document.createElement("p");
  p.textContent = `Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.`;

  //append the children to the confirmDiv
  confirmDiv.append(img);
  confirmDiv.append(h1);
  confirmDiv.append(p);

  //hide the goback and the confirm buttons
  confirmbutton.style.display = "none";
  goBack.style.display = "none";

  //append the confim div to the container
  container.append(confirmDiv);
  confirmDiv.style.animationName = "changeopacity";
});
// start functions
function changecolorandfoucs(elemnt) {
  elemnt.style.borderColor = StrawberryRed;
  elemnt.parentElement.firstElementChild.style.display = "block";
  elemnt.addEventListener("focus", () => {
    elemnt.parentElement.firstElementChild.style.display = "none";
  });
}
// end functions
