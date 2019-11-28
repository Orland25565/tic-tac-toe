export function setTempCls(element, className = '', duration = 1000) {
  let timers = setTempCls.timers;
  try {

    //Таймер не может быть запущен для одного и того же элемента и класса
    if (timers.hasOwnProperty(className)) {
      if (timers[className].hasOwnProperty(element)) return;
    } else timers[className] = {};

    element.classList.add(className);
    timers[className][element] = true;

    setTimeout(() => {
      element.classList.remove(className);
      delete timers[className][element];
    }, duration);

  } catch (error) {
    console.log(error);
  }
}

setTempCls.timers = {};