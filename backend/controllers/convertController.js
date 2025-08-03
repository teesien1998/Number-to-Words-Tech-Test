// === Core conversion logic ===
const belowTwenty = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const tens = [
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

const multipliers = ["", "Thousand", "Million", "Billion"];

function convert(num) {
  if (num === 0) return "";
  if (num < 20) return belowTwenty[num];
  if (num < 100) {
    return (
      tens[Math.floor(num / 10)] +
      (num % 10 !== 0 ? "-" + belowTwenty[num % 10] : "")
    );
  }
  if (num < 1000) {
    return (
      belowTwenty[Math.floor(num / 100)] +
      " Hundred" +
      (num % 100 !== 0 ? " AND " + convert(num % 100) : "")
    );
  }

  let result = "";
  let i = 0;

  while (num > 0) {
    if (i >= multipliers.length) {
      throw new Error("Number too large to convert — exceeds supported range.");
    }

    const chunk = num % 1000;
    if (chunk !== 0) {
      const chunkWords = convert(chunk);
      const scale = multipliers[i];
      result =
        chunkWords + (scale ? " " + scale : "") + (result ? " " + result : "");
    }
    num = Math.floor(num / 1000);
    i++;
  }

  return result.trim();
}

export const convertNumberToWords = (req, res) => {
  const { amount } = req.body;

  const parsedAmount = parseFloat(amount);

  if (isNaN(parsedAmount) || parsedAmount < 0) {
    return res
      .status(400)
      .json({ error: "Invalid amount. Must be a positive number." });
  }

  const dollars = Math.floor(parsedAmount);
  const cents = Math.round((parsedAmount - dollars) * 100);

  if (dollars === 0 && cents === 0)
    return res.status(200).json({ words: "ZERO DOLLARS" });

  try {
    let words = "";

    if (dollars === 0 && cents > 0) {
      // Only cents case (e.g., 0.99)
      words = convert(cents) + (cents === 1 ? " Cent" : " Cents");
    } else {
      const dollarWords =
        dollars === 0
          ? ""
          : convert(dollars) + (dollars === 1 ? " Dollar" : " Dollars");

      const centWords =
        cents === 0 ? "" : convert(cents) + (cents === 1 ? " Cent" : " Cents");

      words = centWords ? dollarWords + " AND " + centWords : dollarWords;
    }

    res.status(200).json({ words: words.toUpperCase() });
  } catch (err) {
    res.status(400).json({ error: err.message || "Unexpected error occurred" });
  }
};
