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
  
}

export default App;