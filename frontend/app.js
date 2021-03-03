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
  })
}

// class App {
//   constructor({ $target }) {
//     this.$target = $target;
    
//     // SPA areas
//     this.status = null;
//   }
  
//   init() {
//     this.status = MODE_RECEIVER;
//   }
  
//   toggleStatus() {
//     if (this.status === MODE_RECEIVER) {
//       this.status = MODE_SENDER;
//       return this.status;
//     }
//     this.status = MODE_RECEIVER;
//     return this.status;
//   }
// }

export default App;