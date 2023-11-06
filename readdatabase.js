javascript: (function getDataBase() {
  const shadowRoot = document.querySelector("ekt-main").shadowRoot;
  const listClassValues = [
    "force_b11066debcbd8cb65c3b7dcf1364864e",
    "force_a243e581ce639849505bec9711e040d3",
    "force_6e717b210ad288b05c87db211559b24c",
    "force_5e953d989ee8a11a72186e0ecc132ff5",
    "force_26523395a98f45822559dbec2cdf465a",
    "force_798e080bb31ca24bb0d8fc46bb2f4f40"
  ];
  let arrays = [];
  for (let listClassValue of listClassValues) {
    arrays.push(shadowRoot.querySelectorAll("li." + listClassValue));
  }
  let cardData = [];
  for (let array of arrays) {
    for (let element of array) {
      let card = {
        name: element.getElementsByClassName("name etfont")[0].innerText,
        color: element
          .getElementsByClassName("color")[0]
          .getElementsByTagName("img")[0].alt,
        number: element.getElementsByClassName("number")[0].innerText,
        era: element.getElementsByClassName("period")[0].innerText,
        cost: element.getElementsByClassName("cost")[0].innerText,
        type: element.getElementsByClassName("unit_type")[0].alt,
        str: element
          .getElementsByClassName("strong intelligence")[0]
          .innerText.substring(
            0,
            element
              .getElementsByClassName("strong intelligence")[0]
              .innerText.indexOf("/")
          ),
        int: element
          .getElementsByClassName("strong intelligence")[0]
          .innerText.substring(
            element
              .getElementsByClassName("strong intelligence")[0]
              .innerText.indexOf("/") + 1
          ),
        traits: element.getElementsByClassName("skill etfont")[0]
          ? [element.getElementsByClassName("skill etfont")[0].innerText]
          : [`特技なし`],
        skillName: element.getElementsByClassName("strat_name")[0].innerText,
        skillCost: element
          .getElementsByClassName("strat_mp")[0]
          .innerText.replaceAll(/【|】/g, ""),
        img: element.getElementsByClassName("card_small")[0].src,
      };
      if (card.number.includes("ST")) {
        card.name = card.name + "(ST)";
      }
      if (element.getElementsByClassName("skill etfont")[1]) {
        card.traits.push(
          element.getElementsByClassName("skill etfont")[1].innerText
        );
      }
      if (element.getElementsByClassName("skill etfont")[2]) {
        card.traits.push(
          element.getElementsByClassName("skill etfont")[2].innerText
        );
      }
      cardData.push(card);
    }
  }
  let json = JSON.stringify(cardData);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "carddata.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
})();

javascript: (function () {
  title = document.title;
  href = document.location.href;
  canonical = get_canonical();
  console.log(
    "ページタイトル=%s \n href=%s \n カノニカルURL=%s",
    title,
    href,
    canonical
  );
  alert(
    "ページタイトル：" +
      title +
      "\n現在のURL：" +
      href +
      "\nカノニカルURL：" +
      canonical
  );

  function get_canonical() {
    links = document.getElementsByTagName("link");
    for (i in links) {
      if (links[i].rel) {
        if (links[i].rel.toLowerCase() == "canonical") {
          return links[i].href;
        }
      }
    }
    return "";
  }
})();
