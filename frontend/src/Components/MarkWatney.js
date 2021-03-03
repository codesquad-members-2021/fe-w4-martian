function* MarkWatney() {
  const originName = "MATT DAMON";
  
  const he = {
    notepad: "",
    said: () => {
      console.log("I\'m pretty much fucked.");
      console.log(`Actually, My name is ${originName}.`);
    }
  }

  yield he;
}

const MarkWatneyAtMars = MarkWatney().next();
export default MarkWatneyAtMars;