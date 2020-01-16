const $body = document.body;
const {
  clientWidth,
  clientHeight,
} = $body;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(clientWidth, clientHeight);
$body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const material = new THREE.LineBasicMaterial({
  color: 0x00ff00,
});

const geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 10, 0));
geometry.vertices.push(new THREE.Vector3(10, 0, 0));

const line = new THREE.Line(geometry, material);

scene.add(line);
renderer.render(scene, camera);