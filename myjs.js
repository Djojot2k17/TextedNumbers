let content = $("#partOfSpeechContent");
let description = $("#numberDescription");
let inputButton = $("#buttonInput");
let textInput = $("#textInput");
let maxChars = 16;

// Add event listeners on number elements
inputButton.on("click", function () {
  console.log("Input clicked!");
  description.empty();
  let element = textInput.val();
  displayNumber(element);
  textInput[0].value = "";
  textInput[0].placeholder = "Write another number";
});

// Add event listener on textInput

$("#textInput").keydown(function (e) {
  if ($(this).val().length >= maxChars) {
    $(this).val($(this).val().substr(0, maxChars));
  }
});

$("#textInput").keyup(function (e) {
  if ($(this).val().length >= maxChars) {
    $(this).val($(this).val().substr(0, maxChars));
  }
});

// Display number on example output
function displayNumber(element) {
  let written = toWritten(element);
  let numberWithComma = numberWithCommas(Number(element));
  description.append(
    `<div class="column text-center"><div class="numberDisplay">${numberWithComma}</div><i class="fas fa-caret-down"></i><div class="writtenForm">${written}</div></div>`
  );
}

function numberWithCommas(x) {
  // Taken from stack overflow
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toWritten(num) {
  // Check for zero
  let zero = "Zero";
  if (num == 0) {
    // Don't use strict equality cause input is a string
    return zero;
  }
  // Declare variables to replace numbers
  let ones = [
    "",
    "One ",
    "Two ",
    "Three ",
    "Four ",
    "Five ",
    "Six ",
    "Seven ",
    "Eight ",
    "Nine ",
    "Ten ",
    "Eleven ",
    "Twelve ",
    "Thirteen ",
    "Fourteen ",
    "Fifteen ",
    "Sixteen ",
    "Seventeen ",
    "Eighteen ",
    "Nineteen ",
  ];
  let tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  let commas = [
    "Thousand ",
    "Million ",
    "Billion ",
    "Trillion ",
    "Quadrillion ",
  ];

  // Convert number to string and check if it's over 16 digits / If over, return overflow
  if ((num = num.toString()).length > 16) return "overflow";

  // Break the stringified number into groups of one or two. (1) Thousand (2) Hundred (34). This makes it easier to insert the commas array|'Hundred'
  n = ("0000000000000000" + num)
    .substr(-16)
    .match(
      /^(\d{1})(\d{1})(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})$/
    );

  // If no input just return
  if (!n) return;

  // Declare an empty string to build
  let str = "";

  // Add to the string if the group isn't 0.
  if (n[1] != 0) {
    // First group will always be number + quadrillion
    str += ones[Number(n[1])] + commas[4];
  }
  if (n[2] != 0) {
    // Second group will always be number + hundred
    str += ones[Number(n[2])] + "Hundred and ";
  }
  if (n[3] != 0) {
    // Third group will always be either tens + trillion or tens + ones + trillion
    if (n[3] > 19) {
      str += tens[Number(n[3][0])] + " " + ones[Number(n[3][1])] + commas[3];
    } else {
      str += ones[Number(n[3])] + commas[3];
    }
  }
  if (n[4] != 0) {
    // Fourth group will always be number + hundred
    str += ones[Number(n[4])] + "Hundred and ";
  }
  if (n[5] != 0) {
    // Fifth group will always be either tens + billion or tens + ones + billion
    if (n[5] > 19) {
      str += tens[Number(n[5][0])] + " " + ones[Number(n[5][1])] + commas[2];
    } else {
      str += ones[Number(n[5])] + commas[2];
    }
  }
  if (n[6] != 0) {
    // Sixth group will always be number + hundred
    str += ones[Number(n[6])] + "Hundred and ";
  }
  if (n[7] != 0) {
    // Seventh group will always be either tens + million or tens + ones + million
    if (n[7] > 19) {
      str += tens[Number(n[7][0])] + " " + ones[Number(n[7][1])] + commas[1];
    } else {
      str += ones[Number(n[7])] + commas[1];
    }
  }
  if (n[8] != 0) {
    // Eigth group will always be number + hundred
    str += ones[Number(n[8])] + "Hundred and ";
  }
  if (n[9] != 0) {
    // Ninth group will always be either tens + thousand or tens + ones + thousand
    if (n[9] > 19) {
      str += tens[Number(n[9][0])] + " " + ones[Number(n[9][1])] + commas[0];
    } else {
      str += ones[Number(n[9])] + commas[0];
    }
  }
  if (n[10] != 0) {
    // Tenth group will always be number + hundred
    str += ones[Number(n[10])] + "Hundred and ";
  }
  if (n[11] != 0) {
    // Eleventh group will always be either tens or tens + ones
    if (n[11] > 19) {
      str += tens[Number(n[11][0])] + " " + ones[Number(n[11][1])];
    } else {
      str += ones[Number(n[11])];
    }
  }

  // I CONVERTED FROM CODE BELOW FOUND ON STACK OVERFLOW
  // str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'million ' : '';
  // console.log(str);
  // str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'hundred ' : '';
  // console.log(str);
  // str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
  // console.log(str);
  // str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
  // console.log(str);
  // str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '' : '';

  return str;
}

// TODO: Add Decimals, Money, Math, Dates, Time
