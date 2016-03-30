function dropHandler(ev) {
  ev.preventDefault();

  // if move is valid; this needs to make a call to the API in the conditional
  const data = ev.dataTransfer.getData('text');
  ev.target.appendChild(document.getElementById(data));
}

function dragStart(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
}
