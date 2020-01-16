const RATE = (() => {
  const pt = 10;
  const $ele = document.createElement('rate-div');
  $ele.style.cssText = `width: ${pt}pt; position: absolute; top: -10px; left: ${pt}pt`;
  document.body.appendChild($ele);
  const px = $ele.offsetWidth;
  $ele.remove();
  return pt / px;
})();

document.querySelector('button').addEventListener('click', async () => {
  const option = {
    unit: 'pt',
  };
  const name = Math.random().toString().replace('.', '');
  const pdf1 = new jsPDF(option);
  await new Promise((resolve, reject) => {
    const img = new Image();
    img.src = '/src/images/foreignObject.png';
    img.onload = function(){
      pdf1.addImage(img, 'png', 0, 0, img.width, img.height, null);
      resolve();
    };
  });
  pdf1.save(`${name}1.pdf`);

  const pdf2 = new jsPDF(option);
  await new Promise((resolve, reject) => {
    const img = new Image();
    img.src = '/src/images/foreignObject.png';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const cvs = canvas.getContext('2d');
      cvs.fillStyle = '#fff';
      cvs.fillRect(0, 0, img.width, img.height);
      cvs.drawImage(img, 0, 0);
      pdf2.addImage(canvas, 'jpeg', 0, 0, img.width, img.height);
      resolve();
    };
  });
  pdf2.save(`${name}2.pdf`);
}, false);