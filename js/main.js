const banner = document.querySelector('.banner');
const vids = document.querySelectorAll('.bg video')
const list = banner.querySelector('ul');
const len = list.children.length;
const showNum = 3;
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');
const speed = 500;
let current_num = 0;
let enableClick = true;

list.style.left = -100 / showNum + '%';
list.prepend(list.lastElementChild);

btnNext.addEventListener('click', next);
btnPrev.addEventListener('click', prev);

function next() {
  if (!enableClick) return;
  enableClick = false;
  let next_num = null;
  current_num !== len - 1 ? next_num = current_num + 1 : next_num = 0;
  activation(next_num);
  current_num = next_num;

  new Anime(list, {
    prop: 'left',
    value: -100 / showNum * 2 + '%',
    duration: speed,
    callback: () => {
      list.append(list.firstElementChild);
      list.style.left = -100 / showNum + '%';
      enableClick = true;
    }
  })
}

function prev() {
  if (!enableClick) return;
  enableClick = false;
  let prev_num = null;
  current_num !== 0 ? prev_num = current_num - 1 : prev_num = len - 1;
  activation(prev_num);
  current_num = prev_num;

  new Anime(list, {
    prop: 'left',
    value: -100 / showNum * 0 + '%',
    duration: speed,
    callback: () => {
      list.append(list.firstElementChild);
      list.style.left = -100 / showNum + '%';
      enableClick = true;
    }
  })
}

function activation(index) {
  for (const el of vids) el.classList.remove('on');
  for (const el of list.children) el.classList.remove('on');
  vids[index].classList.add('on');
  list.children[index].classList.add('on');
}
