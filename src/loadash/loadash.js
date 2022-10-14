const _ = require("lodash");  //import the lodash
function lodash() {
  let month1 = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "july",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  console.log(_.chunk(month1, 4));

  const oddNum = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  console.log(_.tail(oddNum, 9));

  const Num = [2, 5, 4, 2, 7];
  console.log(_.union(Num));

  const keyValue = [
    ["horror", "The Shining"],
    ["drama", "Titanic"],
    ["thriller", "Shutter Island"],
    ["fantasy", "Pans Labyrinth"],
  ];

  console.log(_.fromPairs(keyValue)); //for creating key value pair
}

module.exports.lodash = lodash; 

