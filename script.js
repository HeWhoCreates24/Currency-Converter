{/*https://flagsapi.com/BE/flat/64.png
*/}

const selects = document.querySelectorAll("select");
const btn = document.querySelector("form button");
const inp = document.querySelector("input");
const screen = document.querySelector(".answer")


for (let select of selects){
    for (code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerHTML = code;
        newOption.value = code;
        if (select.id === "from" && code === "USD"){
            newOption.selected = "selected";
        }
        else if (select.id === "to" && code === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
        select.addEventListener("change", (evt) => {
            updateflag(evt.target);
        })
    }
}
updateflag = (target) => {
    let code = target.value;
    let country = countryList[code];
    let newflg = `https://flagsapi.com/${country}/flat/64.png`;
    target.previousElementSibling.src = newflg;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    convert();
})

getAmmount = () => {
    let ammount = inp.value;
    return ammount
}

convert = () => {
    let ammount = getAmmount();
    if (ammount <= 0){
        ammount = 1;
        inp.value = "1";
    }
    let c1 = selects[0].value;
    let c2 = selects[1].value;
    if (c1 === c2){
        display(ammount, c2);
    }
    else{
        getRate(ammount, c1, c2);
    }
}

async function getRate(ammount, from, to){
    let url = `https://api.frankfurter.dev/v1/latest?base=${from.toLowerCase()}&symbols=${to.toLowerCase()}`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data["rates"][to];
    console.log(rate);
    display(ammount*rate, to);
}

display = (ans, code) => {
    screen.innerHTML = `${ans} ${code}`;
}