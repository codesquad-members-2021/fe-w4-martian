import "./app.scss";
import { MODE_RECEIVER, MODE_SENDER } from "./src/util/enums.js";
import MarkWatney from "./src/Components/MarkWatney.js";
import MyPromise from "./src/util/MyPromise.js";

const App = ({ $target }) => {
  if (!$target) {
    console.log("$target is undefined");
    return;
  }
  
  const mark = MarkWatney.value; // 제너레이터
  mark.said();

  const testPromise = new MyPromise((res, rej) => {
    res("안녕하신가.");
  });
  console.log(testPromise)
  testPromise.then((value) => {
    console.log(value);
    return value+"?";
  }).then((v) => {
    console.log(v);
  })
}

export default App;