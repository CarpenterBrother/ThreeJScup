//Variables for setup

let container;
let camera;
let renderer;
let scene;
let coffee;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();

  const fov = 40;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 12);

  camera.updateProjectionMatrix();
  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 0.6);
  light.position.set(50, 50, 100);
  scene.add(light);

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("./resources/coffee.gltf", function(gltf) {
    scene.add(gltf.scene);
    coffee = gltf.scene.children[0];
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  window.addEventListener('scroll', () => {
  let offSet = window.pageYOffset;
  if (offSet <= 275) {
  coffee.rotation.y = -(offSet / 90);
  } else {
    coffee.rotation.y = -275 / 90;
  }
  });
  coffee.rotation.x = 0.6;
  renderer.render(scene, camera);
};

init();


function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

  camera.updateProjectionMatrix();
  


// nav stuff //

let menuTog = document.querySelector('.menu-toggle');
let nav = document.querySelector('.nav');
let navLeft = document.querySelector('.nav-left');
let navRight = document.querySelector('.nav-right');
let navLinks = Array.from(document.querySelectorAll('.nav-link'));
let contact = document.querySelector('.contact');

menuTog.addEventListener('click', () => {
  menuTog.classList.toggle('active');
  navRight.classList.toggle('active');
  navLeft.classList.toggle('active');
  nav.classList.toggle('active');

  contact.classList.remove('active');
  navRight.classList.remove('active');

  if (menuTog.classList.contains('active')) {
    setTimeout(()=> {
      navRight.classList.add('active');
    },100)

    for(let i = 0; i < navLinks.length; i++) {
      navLinks[i].classList.remove('active');
      setTimeout(()=>{
        navLinks[i].classList.add('active')
      }, i * 100);

      setTimeout(()=>{
        contact.classList.add('active');
      }, 700);
    }
  };

})

