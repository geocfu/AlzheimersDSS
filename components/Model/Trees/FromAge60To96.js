const FromAge60To96 = (group, nwbv, etiv, mrdelay, sex, mmse, age) => {
  if (group == "nondemented") {
    return "a(37.0/2.0)";
  } else if (group == "demented") {
    if (mmse <= 19) {
      return "c(12.34)";
    } else {
      if (sex == "M") {
        if (age <= 81) {
          if (nwbv <= 0.691) {
            return "c(5.0)";
          } else {
            return "b(19.0/8.0)";
          }
        } else {
          return "b(13.0)";
        }
      } else {
        if (nwbv <= 0.748) {
          if (etiv <= 1274) {
            return "b(5.66/1.66)";
          } else {
            return "c(13.0)";
          }
        } else {
          return "b(5.0)";
        }
      }
    }
  } else if (group == "converted") {
    if (mrdelay <= 617) {
      return "a(5.0)";
    } else {
      return "b(5.0)";
    }
  }
}

export default FromAge60To96;