const checkZeros = (num: any) => {
  const parts = Array.from(String(num), Number).join("").split("NaN");

  const whole = Number(parts[0]);
  const fraction = parts[1]?.split("");

  let count = 0;
  let numbersLeft: string | null = null;

  const isZero = fraction?.reduce((prev, curr) => {
    if (whole == 0 && Number(curr) == 0 && Number(prev) == 0) {
      count++;
      numbersLeft = fraction.join("").split("0").join("");
    }

    return Number(curr) + Number(prev);
  }, 0);

  return {
    count,
    whole,
    numbersLeft,
  };
};

const formatNum = (
  figure: any,
  commas: boolean = true,
  deci: number = 8,
  dots: boolean = true
) => {
  const num = String(figure).replace(/\,/g, "");

  const { count, whole, numbersLeft } = checkZeros(num);

  // check if number contains too many zeros
  const hasManyZeros = count > 5;

  if (hasManyZeros && dots) {
    return `${whole}.0...00${numbersLeft}`;
  } else if (hasManyZeros && !dots) {
    return figure;
  } else {
    // add decimals to number if it doesn't contain too many zeros
    const number = Number(num).toFixed(deci);

    if (commas) {
      let parts = (+number).toString().split(".");

      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return parts.join(".");
    } else {
      return +number;
    }
  }
};

export default formatNum;
