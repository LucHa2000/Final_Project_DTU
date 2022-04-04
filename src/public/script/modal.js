document.getElementById("showOKModalBtn").addEventListener("click", () => {
  document.getElementById("okmodal").classList.remove("modal--hidden");
});

document.getElementById("closeOkModalBtn").addEventListener("click", () => {
  document.getElementById("okmodal").classList.add("modal--hidden");
});

document.getElementById("showYesNoModalBtn").addEventListener("click", () => {
  document.getElementById("yesnomodal").classList.remove("modal--hidden");
});

document.getElementById("yesYesNoModalBtn").addEventListener("click", () => {
  document.getElementById("yesnomodal").classList.add("modal--hidden");
});

document.getElementById("noYesNoModalBtn").addEventListener("click", () => {
  document.getElementById("yesnomodal").classList.add("modal--hidden");
});
