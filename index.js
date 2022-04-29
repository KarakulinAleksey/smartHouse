let buttonOn = document.querySelector(".buttonOn");
let buttonWrite = document.querySelector(".buttonWrite");
let buttonRead = document.querySelector(".buttonRead");
let buttonOff = document.querySelector(".buttonOff");
buttonOn.textContent = "Connect";
buttonWrite.textContent = "Write";
buttonRead.textContent = "Read";
buttonOff.textContent = "Disconect";

var port,
  textEncoder,
  writableStreamClosed,
  writer,
  historyIndex = -1;

buttonOn.addEventListener("click", async () => {
  connectSerial()
});

buttonWrite.addEventListener("click", async () => {
  sendSerialLine()
});

buttonRead.addEventListener("click", async () => {
  // listenToPort()
});

buttonOff.addEventListener("click", async () => {});

setInterval(sendSerialLine, 100);

let count;

async function sendSerialLine() {
 
  if (count<7){
    count=count + 1; 
  } else {
    count=0;
  }
  console.log(count);
  console.log(`#01${count}\r\n`);
  await writer.write(`#01${count}\r\n`);
  
}

async function listenToPort() {
  const textDecoder = new TextDecoderStream();
  const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
  const reader = textDecoder.readable.getReader();

  // Listen to data coming from the serial device.
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      // Allow the serial port to be closed later.
      //reader.releaseLock();
      break;
    }
    // value is a string.
    console.log(value);
  }
}

async function connectSerial() {
  try {
    // Prompt user to select any serial port.
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    listenToPort();

    textEncoder = new TextEncoderStream();
    writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

    writer = textEncoder.writable.getWriter();
  } catch {
    alert("Serial Connection Failed");
  }
}