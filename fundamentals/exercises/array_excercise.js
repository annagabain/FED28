const myJewellery = [
  "earrings",
  "brooches",
  "watches",
  "necklaces",
  "bracelets",
];

for (let i = 0; i < myJewellery.length; i++) {

//   console.log(i+1);
//   console.log(myJewellery[i]);

}
// print each item as a numbered list
  myJewellery.forEach((item, i) => {
    console.log(`${i+1}. ${item}`);
  });
