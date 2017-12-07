const addOrCallFunctions = (array, passedFunction, dataToSend) => {
  if (passedFunction) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === passedFunction) return false; // already in
    }
    array.push(passedFunction);
  } else {
    array.map((arrayFunction => arrayFunction(dataToSend)));
  }
};

export default {
  messageReceived: (reference, dataToSend) => addOrCallFunctions(messageReceivedFunctions, reference, dataToSend),
};

let messageReceivedFunctions = [];