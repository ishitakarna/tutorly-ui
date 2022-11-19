document.getElementById("buttonRedId").addEventListener("click", function () {
  changeBgColor("bg-color-red");
}, false);

document.getElementById("buttonBlueId").addEventListener("click", function () {
  changeBgColor("bg-color-blue");
}, false);

document.getElementById("buttonGreyId").addEventListener("click", function () {
  changeBgColor("bg-color-grey");
}, false);

function changeBgColor(color) {
  document
    .getElementById("mainContainer")
    .setAttribute("class", "container-center box " + color);
}

document.getElementById("nameId").addEventListener("click", function () {
  console.log(document.getElementById("emailId").classList);
  toggleElementDisplay();
}, false);

document.getElementById("imgId").addEventListener("click", function () {
  toggleElementDisplay();
}, false);

function toggleElementDisplay() {
  document.getElementById("emailId").classList.toggle("hide");
  document.getElementById("gitId").classList.toggle("hide");
  document.getElementById("paraId").classList.toggle("hide");
}