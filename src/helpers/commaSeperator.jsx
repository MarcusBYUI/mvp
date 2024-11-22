function numberWithCommas(x) {
  try {

    // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var parts = x.toString().split(".");
    if (parts) {
      var num = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
      return num
    } else {
      return x
    }
  } catch (error) {
    return x
  }



}

export default numberWithCommas;
