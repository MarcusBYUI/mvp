export const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getImageUrl = (name) => {
  return new URL(`../assets/${name}`, import.meta.url).href
}

export function numberToTwoDecimals(num) {
  try {
    if (typeof num !== "number") {
      return num;
    }
    if (num >= 0) {
      var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      return with2Decimals.includes(".") ? Number(with2Decimals) : with2Decimals + ".00";
    } else {
      return num;
    }
  } catch (error) {
    return num;
  }

}

export function numberToDecimals(num, dec) {
  try {
    if (typeof num !== "number") return num;

    // Use `toFixed(dec)` to ensure the number has `dec` decimal places
    let formatted = num.toFixed(dec);

    // Remove unnecessary trailing zeros
    formatted = parseFloat(formatted).toString();

    return formatted;
  } catch (error) {
    return num;
  }
}


export const getAPR = (duration, supply, amountStaked) => {
  const perDay = supply / duration;
  const percentage = 1000 / (1000 + amountStaked)
  const apr = (percentage * perDay) * 365
  return numberToTwoDecimals(apr)
}

export function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}

export const addZero = (a)=>{
  if (a.toString().length > 1) {
    return a
  }else{
    return 0 + a.toString()
  }
}