const maxLevel = 10;
const attempts = 10;

let level = 0;
const times = []

function showResults() {
  document.body.innerHTML = `<div>
  ${times.map((levelTimes, idx) => `<div>
    <h3>Level ${idx + 1}</h3>
    <div>${levelTimes.map(t => t.toFixed(4) )}</div>
    <div>AVG: ${(levelTimes.reduce((sum, t) => sum + t, 0) / levelTimes.length).toFixed(4)}</div>
  </div>`)}
  </div>`;
}

function clickHandler(i, selected, time) {
  return () => {
    if (i === selected){
      times[level].push(performance.now() - time.start);
      if (times[level].length === attempts - 1 ) {
        level += 1;
        if (level === maxLevel - 1) {
          return showResults();
        }
      }
    }
    draw();
  }
}

function draw() {
  document.body.innerHTML = '';
  times[level] = times[level] || [];

  const divs = Math.pow(level + 2, 2);
  const size = Math.floor(100/(level + 2));

  const selected = Math.floor(Math.random() * divs);
  
  const time = {};
  
  for (let i = 0; i < divs ; i += 1){
    const div = document.createElement('div');
    div.className = i === selected ? 'hit selected' : 'hit';
    div.style.height = `calc(${size}vh - 2px)`;
    div.style.width = `calc(${size}vw - 2px)`;
    div.addEventListener('click', clickHandler(i, selected, time))
    document.body.appendChild(div);
  }
  time.start = performance.now()
}

draw();