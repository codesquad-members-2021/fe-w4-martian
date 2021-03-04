import _ from "./util.js";
const $arrow = _.$(".arrow");
const $inputReceive = _.$(".input-receive");
const $btnInterpret = _.$(".btn-interpret");
const hexLocations = {
  Total: 360,
  0: 10, // -350 -(total - 0)
  1: 30,
  2: 60,
  3: 80,
  4: 100,
  5: 120,
  6: 150,
  7: 170,
  8: 190,
  9: 210,
  a: 240,
  b: 260,
  c: 280,
  d: 300,
  e: 330,
  f: 350,
};

//const go = (...args) => reduce((acc, fun) => fun(acc), args);
const resetReceive = () => {
  clearInterval(sender);
  $arrow.style.transform = "";
};
const convertCharToHex = word => {
  const currentWord = [...word];
  return currentWord
    .map(x => x.charCodeAt(0).toString(16)) //10진수 -> 16진수
    .map(x => [...x]);
};

const sendSignal = hexList => {
  //words를 5초마다 receive에 보낸다.
  const hexadecimals = hexList;
  let idx = 0;

  const sender = setInterval(() => {
    if (idx === hexadecimals.length) {
      clearInterval(sender);
      $btnInterpret.disabled = false;
      console.log("전송 완료");
    } else {
      console.log(hexadecimals[idx]);
      receiveHexSignal(hexadecimals[idx]); //["6","4"]형태로 전달
      idx++;
    }
  }, 3000);
};

const showInterpretedHexStr = str => {
  const $inputInterpret = _.$("#input-interpret");
  $inputInterpret.value = str;
};

const interpretHexStr = str => {
  const hexStr = str
    .split(" ")
    .filter(x => x)
    .map(x => parseInt(x, 16));
  const char = String.fromCharCode(...hexStr);
  return char;
};

const receiveHexSignal = data => {
  const hexadecimals = data; //["6","4"]형태로 전달받음
  console.log(hexadecimals, "받음");

  const transmitter = new Promise((resolve, reject) => {
    setTimeout(() => resolve(hexadecimals), 1000);
  });

  transmitter
    .then(hex => {
      console.log(hex[0], "0번 rotate에 보냄");
      activateReceiver(hex[0]);
      return hex;
    })
    .then(hex => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(hex), 1000);
      });
    })
    .then(hex => {
      console.log(hex[1], "1번 rotate에 보냄");
      activateReceiver(hex[1]);
    })
    .finally(hex => {
      activateReceiver(hex, true);
    });
};

const activateReceiver = (hex, finished = false) => {
  rotateArrow(hex, finished); //화살표를 회전시키는 함수 hex값에 해당하는 deg만큼 화살표를 회전시킴
  showReceivedHexStr(hex, finished); //input에 현재 hex값을 보여줌
  colorReceivedHexStr(hex, finished);
};

const rotateArrow = (hex, finished) => {
  if (!finished) $arrow.style.transform = `rotate(${hexLocations[hex]}deg)`;
};

const calculateDistance = hex => {
  //가까운 쪽으로 움직이는거 ..
  const currentArrowRotation = $arrow.style.transform
    .replace("rotate(", "")
    .replace("deg)", "");
  //알아서 가까운 쪽으로 움직이는거 같은데..?
};

const showReceivedHexStr = (str, finished) => {
  finished ? ($inputReceive.value += " ") : ($inputReceive.value += str);
};

const colorReceivedHexStr = (key, finished) => {
  if (finished) return;

  const $currentHex = _.$(`#text-${key}`);

  if (!_.$(".blink")) {
    $currentHex.classList.add("blink");
  } else {
    const $blinkingHex = _.$(".blink");
    $blinkingHex.classList.remove("blink");
    $currentHex.classList.add("blink");
  }
};

const onEvent = () => {
  $btnInterpret.addEventListener(
    "click",
    () => showInterpretedHexStr(interpretHexStr($inputReceive.value)) //정답 보여주기
  );
};
onEvent();
export { sendSignal, convertCharToHex };
