const KEY = 'API_FRAME_SRC';
const TAG = 'dd'.toLocaleUpperCase();
const CLS = 'active';

const wrap = document.createElement('div');
const directory = document.createElement('dl');
const frame = document.createElement('iframe');

wrap.classList.add('api-wrap');
directory.classList.add('api-directory')
frame.classList.add('api-frame');

const appendChild = (tag, { value, label }, parent) => {
  const ele = document.createElement(tag);
  ele.textContent = value || label;
  value && label && (ele.title = label);
  parent.appendChild(ele);
  return ele;
};

const getSrc = (namespaces, value) => {
  value = value.slice(0, 1).toLocaleLowerCase() + value.slice(1);
  return `src/${namespaces}/${value}.html`;
};

const getNamespaces = (target) => {
  let previous = target.previousElementSibling;
  while(previous) {
    if(previous.tagName == 'DT') break;
    previous = previous.previousElementSibling;
  }
  return previous.textContent;
};

fetch('./static/apis.json')
  .then((res) => res.json())
  .then((list) => {
    const local = localStorage.getItem(KEY);
    const REGEX = new RegExp(`^${local}$`);
    const fragment = document.createDocumentFragment();
    list.forEach(item => {
      const { label: namespaces } = item;
      appendChild('dt', item, fragment);
      item.list.forEach(data => {
        if(typeof data == 'string') {
          data = { value: data };
        }
        const ele = appendChild(TAG, data, fragment);
        if(local && REGEX.test(getSrc(namespaces, data.value))){
          active = ele;
          ele.classList.add(CLS);
          frame.src = local;
        }
      });
    });
    directory.appendChild(fragment);
  });

let active;

directory.addEventListener('click', ({ target }) => {
  if(target.tagName != TAG) return;
  const namespaces = getNamespaces(target);
  const value = target.textContent;
  const src = frame.src = getSrc(namespaces, value);
  localStorage.setItem(KEY, src);
  active && active.classList.remove(CLS);
  target.classList.add(CLS);
  active = target;
});

wrap.appendChild(directory);
wrap.appendChild(frame);
document.body.appendChild(wrap);