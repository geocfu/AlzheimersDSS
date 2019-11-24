const FromAge18To98 = (ses, mmse, etiv, nwbv, asf, age) => {
  if (mmse < 24.5) {
    if (mmse < 22.5) {
      if (age < 64.5) {
        return "b(3/0)[0/0]";
      } else {
        if (mmse < 15.5) {
          return "c(2/1)[2/1]";
        } else {
          if (etiv < 1484.5) {
            return "b(8/3)[5/2]";
          } else {
            return "c(9/1)[3/0]";
          }
        }
      }
    } else {
      if (nwbv < 0.72) {
        if (age < 78.5) {
          return "c(3/1)[1/0]";
        } else {
          return "b(2/0)[0/0]";
        }
      } else {
        return "b(6/0)[3/1]";
      }
    }
  } else {
    if (nwbv < 0.79) {
      if (age < 84.5) {
        if (nwbv < 0.73) {
          return "b(21/9)[16/7]";
        } else {
          if (mmse < 26.5) {
            if (nwbv < 0.76) {
              return "b(4/0)[1/0]";
            } else {
              return "a(4/2)[1/0]";
            }
          } else {
            if (etiv < 1485) {
              if (ses < 2.5) {
                if (etiv < 1343.5) {
                  return "a(6/0)[3/0]";
                } else {
                  if (asf < 1.28) {
                    return "a(6.6/0.6)[1/0]";
                  } else {
                    return "b(3.6/1)[0.6/0]";
                  }
                }
              } else {
                return "b(10.8/4)[0.6/0]";
              }
            } else {
              return "a(12/0)[11/2]";
            }
          }
        }
      } else {
        return "a(17/2)[9/3]";
      }
    } else {
      return "a(38/0)[14/0]";
    }
  }
}

export default FromAge18To98;