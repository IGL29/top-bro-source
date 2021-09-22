import data from './data'

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function fetch() {
  await wait(3000);
  return data;
}

export default fetch;
