const FromAge60To98 = (group, mrdelay, ses, mmse, age) => {
  if (group == "demented") {
    if (mmse > 22) {
      return "b(103.42/16.42)";
    } else {
      if (age > 85) {
        return "b(4.0/1.0)";
      } else {
        if (ses > 4) {
          return "b(2.14/0.03)";
        } else {
          if (age > 65) {
            return "c(33.44/7.89)";
          } else {
            return "b(3.0)";
          }
        }
      }
    }
  } else if (group === 'converted') {
    if (mrdelay > 680) {
      return "b(20.0/2.0)";
    } else {
      return "a(17.0/1.0)";
    }
  } else {
    return "a(190.0/2.0)";
  }
}

export default FromAge60To98;