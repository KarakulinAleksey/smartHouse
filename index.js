let buttonOn = document.querySelector(".buttonOn");
let buttonWrite = document.querySelector(".buttonWrite");
let buttonRead = document.querySelector(".buttonRead");
let buttonOff = document.querySelector(".buttonOff");
buttonOn.textContent = "Connect";
buttonWrite.textContent = "Write";
buttonRead.textContent = "Read";
buttonOff.textContent = "Disconect";

buttonOn.addEventListener("click", async () => {

  const port = await navigator.serial.requestPort();
  await port.open({ baudRate: 9600 });
 

});

buttonWrite.addEventListener("click", async () => {
});

buttonRead.addEventListener("click", async () => {

});

buttonOff.addEventListener("click", async () => {

});
