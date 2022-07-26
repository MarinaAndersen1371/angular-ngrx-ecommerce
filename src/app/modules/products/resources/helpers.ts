// Only Integer Numbers
export function keyPressNumbers(event: any) {
  var charCode = event.which ? event.which : event.keyCode;
  // Only Numbers 0-9
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
    return false;
  } else {
    return true;
  }
}

// Only Numbers with Decimals
export function keyPressNumbersWithDecimal(event: any) {
  var charCode = event.which ? event.which : event.keyCode;
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
    return false;
  }
  return true;
}
