const banner = document.querySelector('.banner');
const bgFrame = document.querySelector('.bg');
const tits = document.querySelectorAll('.tits h2');
const mask = document.querySelector('.mask');
const count = document.querySelector('.paging strong');
const list = banner.querySelector('ul');
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');
const btnPlay = document.querySelector('.play');
const btnPause = document.querySelector('.pause');
const vidData = ['vid1.mp4', 'vid2.mp4', 'vid3.mp4', 'vid4.mp4', 'vid5.mp4'];
const speed = 500;
const interval = 3000;
const len = list.children.length;
let vids = null;
let vidCount = 0;
const showNum = 3;
let current_num = 0;
let enableClick = true;
let timer = null;

init();
createVid();
startRolling();

btnNext.addEventListener('click', () => {
	next();
	stopRolling();
});
btnPrev.addEventListener('click', () => {
	prev();
	stopRolling();
});
btnPlay.addEventListener('click', startRolling);
btnPause.addEventListener('click', stopRolling);

function init() {
	list.style.left = -100 / showNum + '%';
	list.prepend(list.lastElementChild);
	list.prepend(list.lastElementChild);
	list.children[0].classList.add('on');
}

function next() {
	if (!enableClick) return;
	enableClick = false;
	let next_num = null;
	current_num !== len - 1 ? (next_num = current_num + 1) : (next_num = 0);
	activation(next_num);
	current_num = next_num;

	new Anime(list, {
		prop: 'left',
		value: (-100 / showNum) * 2 + '%',
		duration: speed,
		callback: () => {
			list.append(list.firstElementChild);
			list.style.left = -100 / showNum + '%';
			enableClick = true;
		},
	});

	counter(current_num);
}

function prev() {
	if (!enableClick) return;
	enableClick = false;
	let prev_num = null;
	current_num !== 0 ? (prev_num = current_num - 1) : (prev_num = len - 1);
	activation(prev_num);
	current_num = prev_num;

	new Anime(list, {
		prop: 'left',
		value: (-100 / showNum) * 0 + '%',
		duration: speed,
		callback: () => {
			list.prepend(list.lastElementChild);
			list.style.left = -100 / showNum + '%';
			enableClick = true;
		},
	});

	counter(current_num);
}

function activation(index) {
	const currentList = banner.querySelector('ul');
	for (const el of vids) el.classList.remove('on');
	for (const el of currentList.children) el.classList.remove('on');
	for (const el of tits) el.classList.remove('on');
	vids[index].classList.add('on');
	currentList.children[index].classList.add('on');
	tits[index].classList.add('on');
}

function createVid() {
	let tags = '';
	vidData.forEach((vid) => (tags += `<video src='vids/${vid}' loop muted autoplay></video>`));
	bgFrame.innerHTML = tags;

	vids = bgFrame.querySelectorAll('video');
	vids.forEach((vid, idx) => {
		vid.onloadeddata = () => {
			vidCount++;
			console.log(vidCount);
			if (vidCount === vidData.length) {
				new Anime(mask, {
					prop: 'opacity',
					value: 0,
					duration: 1000,
					callback: () => {
						mask.remove();
					},
				});
			}
		};
	});

	vids[0].classList.add('on');
}

function counter(num) {
	count.innerText = '0' + (num + 1);
}

function startRolling() {
	next();
	timer = setInterval(next, interval);
	btnPlay.classList.add('on');
	btnPause.classList.remove('on');
}

function stopRolling() {
	clearInterval(timer);
	btnPause.classList.add('on');
	btnPlay.classList.remove('on');
}
