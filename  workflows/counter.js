import { flatten } from 'lodash-es';

export function setupCounter(element) {
  console.log(IsEmp(undefined))
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}


function IsEmp(value){
if (value && !Number.isInteger(value)) return false;
else return true;
}
function range(start, end, step, rigth = false) {


  if (end === undefined) {
    end = start;
    start = 0;
  }
  step = step === undefined ? (start < end ? 1 : -1) : step;
  let index = -1;
  let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  const result = new Array(length);

  if (rigth) {
    const a = start;
    start = end;
    end = a;
    step = - step
  }
  while (length--) {
    result[++index] = !rigth ? start : start + step;
    start += step;
  }

  return result;
}

function rangeRight(start, end, step) {
  return range(start, end, step, true);
}

