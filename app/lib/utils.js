const cp = require('child_process');
const { resolve } = require('path');


function startProcess(options) {
  const script = resolve(__dirname, '../crawlers/', options.path);
  const child = cp.fork(script, []);

  child.send(options.data)

  let invoked = false;

  child.on('message', (msg) => {
    options.message(msg);
  })

  child.on('exit', (code) => {
    if (invoked) return;

    invoked = true;
    options.exit(code);
  })

  child.on('error', (err) => {
    if (invoked) return;

    invoked = true;
    options.error(err);
  })
}


module.exports = {
  startProcess
}
