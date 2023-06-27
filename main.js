const btc = {
  symbol: "BTC",
  name: "Bitcoin",
  price: 31019.25,
  tfLow: 29779.36,
  tfHeigh: 30935.3,
  sDayLow: 25654.98,
  sDayHeig: 30380.15,
  TV: 15136973.772,
  MCR: 1,
  MC: 599878127704,
  img: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/black/btc.svg",
};
const eth = {
  symbol: "ETH",
  name: "Ethereum",
  price: 1928.29,
  tfLow: 1869.12,
  tfHeigh: 1930.3,
  sDayLow: 1685.35,
  sDayHeig: 1928.29,
  TV: 7442456.5,
  MCR: 2,
  MC: 231531351.15,
  img: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/black/eth.svg",
};
const pol = {
  symbol: "DOT",
  name: "Polkadot",
  price: 30.29,
  tfLow: 26.12,
  tfHeigh: 35.3,
  sDayLow: 26.35,
  sDayHeig: 36.29,
  TV: 7442456.5,
  MCR: 14,
  MC: 43153135.15,
  img: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/black/dot.svg",
};
const doge = {
  symbol: "DOGE",
  name: "Doge Coin",
  price: 0.59,
  tfLow: 0.32,
  tfHeigh: 0.4,
  sDayLow: 0.35,
  sDayHeig: 0.49,
  TV: 744245.5,
  MCR: 11,
  MC: 13151351.15,
  img: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/black/doge.svg",
};
const inch = {
  symbol: "INCH",
  name: "1Inch",
  price: 2.29,
  tfLow: 1.12,
  tfHeigh: 2.3,
  sDayLow: 1.35,
  sDayHeig: 2.29,
  TV: 744245.5,
  MCR: 23,
  MC: 51531351.15,
  img: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/black/1inch.svg",
};
const ada = {
  symbol: "ADA",
  name: "Cardano",
  price: 1.29,
  tfLow: 1.12,
  tfHeigh: 2.3,
  sDayLow: 1.35,
  sDayHeig: 2.29,
  TV: 644245.5,
  MCR: 8,
  MC: 101531351.15,
  img: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/black/ada.svg",
};
const lite = {
  symbol: "LTE",
  name: "Lite Coin",
  price: 30.29,
  tfLow: 20.12,
  tfHeigh: 30.3,
  sDayLow: 20.35,
  sDayHeig: 30.29,
  TV: 744245.5,
  MCR: 13,
  MC: 91531351.15,
  img: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/black/ltc.svg",
};
const mana = {
  symbol: "MANA",
  name: "Decentraland",
  price: 3.29,
  tfLow: 2.12,
  tfHeigh: 3.3,
  sDayLow: 2.35,
  sDayHeig: 3.29,
  TV: 7442450.5,
  MCR: 11,
  MC: 82637173.15,
  img: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/black/mana.svg"
}
const bnb = {
  symbol: "BNB",
  name: "Binance",
  price: 240.29,
  tfLow: 220.12,
  tfHeigh: 242.3,
  sDayLow: 223.35,
  sDayHeig: 245.29,
  TV: 8442456.5,
  MCR: 3,
  MC: 131531351.15,
  img: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/black/bnb.svg"
}
let navbarNav,
  banner,
  rects,
  detailContainer,
  animationId,
  search,
  context,
  renderer,
  scene,
  camera,
  focalPoint,
  canvas;

let cryptoList = [btc, eth, pol, doge, inch, ada, lite, mana, bnb];
let frameRate = 1;
let cubeSize = 50;
let rotationSpeed = 0.01;
let changed = false;

const init = () => {
  navbarNav = document.getElementById("navbarNav");
  canvas = document.getElementById("myCanvas");

  banner = document.getElementById("crypto-banner");
  addIcons(cryptoList);
  bannerItems = [...banner.getElementsByTagName("img")];
  detailContainer = document.getElementById("crypto-details");
  search = document.getElementById("searchInput");
  search.value = "";

  search.addEventListener("input", searchCrypto);
  canvas.addEventListener("mouseover", stopRotation)
  canvas.addEventListener("mouseleave", startRotation)
  window.addEventListener('scroll', autoStartStop)
  createRects();
  animate();
  drawBlockChain();
  blockChainAnimate();
  addDragScroll();
};
const showDetails = (e) => {
  let symbol = e.value;
  let selectedCrypto = cryptoList.find((crypto) => crypto.symbol === symbol);
  let card = createDetailCard(selectedCrypto);

  detailContainer.style.display = "flex";
  detailContainer.classList.add("scale-in-center");
  detailContainer.innerHTML = card;

  setTimeout(() => {
    detailContainer.classList.remove("scale-in-center");
  }, 500);
};
const closeDetails = () => {
  detailContainer.style.display = "none";
  detailContainer.innerHTML = "";
  detailContainer.classList.remove("scale-in-center");
};
const createDetailCard = (crypto) => {
  let card =
    '<div class="close"><button onclick="closeDetails()"><i class="fa-solid fa-xmark fa-2x"></i></button></div>';
  card += `<h2 class="detail-title">${crypto?.name}</h2>`;
  card += "<table><tbody>";
  card += "<tr>";
  card += "<td>Price<td>";
  card += `<td>$ ${crypto?.price}</td>`;
  card += "</tr>";
  card += "<tr>";
  card += "<td>24h Low / 24h High<td>";
  card += `<td>$ ${crypto?.tfLow.toLocaleString(
    "en-US"
  )} / $ ${crypto?.tfHeigh.toLocaleString("en-US")}</td>`;
  card += "</tr>";
  card += "<tr>";
  card += "<td>7d Low / 7d High<td>";
  card += `<td>$ ${crypto?.sDayLow.toLocaleString(
    "en-US"
  )} / $ ${crypto?.sDayHeig.toLocaleString("en-US")}</td>`;
  card += "</tr>";
  card += "<tr>";
  card += "<td>Trading Volume<td>";
  card += `<td>$ ${crypto?.TV.toLocaleString("en-US")}</td>`;
  card += "</tr>";
  card += "<tr>";
  card += "<td>Market Cap Rank<td>";
  card += `<td># ${crypto?.MCR}</td>`;
  card += "</tr>";
  card += "<tr>";
  card += "<td>Market Cap<td>";
  card += `<td>$ ${crypto?.MC.toLocaleString("en-US")}</td>`;
  card += "</tr>";
  card += "</tbody></table>";
  return card;
};
const animate = () => {
  const l = cryptoList.length;

  for (let i = 0; i < l; i++) {
    const item = bannerItems[i];
    const rect = rects[i];
    rect.left -= frameRate;
    if (rect.left + rect.width <= 0) {
      const lastRect = rects[rects.length - 1];
      rect.left = lastRect.left + lastRect.width + 50;
      bannerItems = bannerItems.slice(1, l);
      bannerItems.push(item);
      rects = rects.slice(1, l);
      rects.push(rect);
    }
    item.style.left = rect.left + "px";
  }
  animationId = requestAnimationFrame(animate);
};
const startAnimation = () => {
  animationId = requestAnimationFrame(animate);
};
const stopAnimation = () => {
  cancelAnimationFrame(animationId);
};
const searchCrypto = () => {
  let inputValue = search.value.toUpperCase();
  if (inputValue === "") {
    banner.addEventListener("mouseover", stopAnimation);
    banner.innerHTML = "";
    createRects();
    addIcons(cryptoList);
    bannerItems = [...banner.getElementsByTagName("img")];
    startAnimation();
  } else {
    banner.removeEventListener("mouseover", stopAnimation);
    stopAnimation();
    banner.innerHTML = "";
    let i = cryptoList.filter((x) => x.name.toUpperCase().includes(inputValue));
    createRects()
    addIcons(i);
  }
};
const createIcon = (crypto) => {
  let li = document.createElement("li");
  let btn = document.createElement("button");
  let img = document.createElement("img");
  li.classList.add("crypto-banner-icon");
  btn.value = crypto?.symbol;
  btn.onclick = function () {
    showDetails(this);
  };
  img.src = crypto?.img;
  img.alt = crypto?.name;
  btn.append(img);
  li.append(btn);
  return li;
};
const addIcons = (list) => {
  let icons = list.map((item) => createIcon(item));
  while (icons.length > 0) {
    let { selectedIcon, rndIndex } = randomPick(icons);
    banner.appendChild(selectedIcon);
    icons.splice(rndIndex, 1);
  }
};
const randomPick = (icons) => {
  const min = 0;
  let max = icons?.length;
  let rndIndex = Math.floor(Math.random() * (max - min - 1) + min);
  let selectedIcon = icons[rndIndex];
  return {
    selectedIcon,
    rndIndex,
  };
};
const drawBlockChain = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  renderer.setSize(300, 300);
  renderer.setPixelRatio(window.devicePixelRatio);
  focalPoint = new THREE.Object3D();
  scene.add(focalPoint);
  // Create a cube geometry
  var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

  var cubeMaterialWhite = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: false,
    opacity: 1,
  });

  // Create cubes at different positions
  var cube1 = new THREE.Mesh(cubeGeometry, cubeMaterialWhite);
  cube1.position.set(0, -50, 0);
  focalPoint.add(cube1);

  var cube2 = new THREE.Mesh(cubeGeometry, cubeMaterialWhite);
  cube2.position.set(0, 50, 0);
  focalPoint.add(cube2);

  var cube3 = new THREE.Mesh(cubeGeometry, cubeMaterialWhite);
  cube3.position.set(100, -50, 0);
  focalPoint.add(cube3);

  var cube4 = new THREE.Mesh(cubeGeometry, cubeMaterialWhite);
  cube4.position.set(100, 50, 0);
  focalPoint.add(cube4);

  var cube5 = new THREE.Mesh(cubeGeometry, cubeMaterialWhite);
  cube5.position.set(0, -50, 100);
  focalPoint.add(cube5);

  var cube6 = new THREE.Mesh(cubeGeometry, cubeMaterialWhite);
  cube6.position.set(0, -50, -100);
  focalPoint.add(cube6);

  var cube7 = new THREE.Mesh(cubeGeometry, cubeMaterialWhite);
  cube7.position.set(100, -50, -100);
  focalPoint.add(cube7);

  var cube8 = new THREE.Mesh(cubeGeometry, cubeMaterialWhite);
  cube8.position.set(0, 50, -100);
  focalPoint.add(cube8);

  var cube9 = new THREE.Mesh(cubeGeometry, cubeMaterialWhite);
  cube9.position.set(100, 50, -100);
  focalPoint.add(cube9);

  var lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

  // Create lines connecting the cubes
  var lineGeometry = new THREE.Geometry();
  lineGeometry.vertices.push(cube1.position, cube5.position);
  lineGeometry.vertices.push(cube1.position, cube2.position);
  lineGeometry.vertices.push(cube1.position, cube3.position);
  lineGeometry.vertices.push(cube3.position, cube4.position);
  lineGeometry.vertices.push(cube4.position, cube2.position);
  lineGeometry.vertices.push(cube8.position, cube9.position);
  lineGeometry.vertices.push(cube8.position, cube6.position);
  lineGeometry.vertices.push(cube6.position, cube7.position);
  lineGeometry.vertices.push(cube6.position, cube1.position);

  var line = new THREE.Line(lineGeometry, lineMaterial);
  focalPoint.add(line);

  camera.position.set(0, 0, 400);
  camera.lookAt(focalPoint.position);
};
const blockChainAnimate = () => {
  requestAnimationFrame(blockChainAnimate);
  rotateCamera();
  renderer.render(scene, camera);
};
const rotateCamera = () => {
  // Define the rotation speed and angles
 // Adjust this value to control the rotation speed
  const rotationX = 0; // Rotation around the X-axis
  const rotationY = 1; // Rotation around the Y-axis
  const rotationZ = 0.01; // Rotation around the Z-axis
  focalPoint.rotation.x += rotationX * rotationSpeed;
  focalPoint.rotation.y += rotationY * rotationSpeed;
  focalPoint.rotation.z += rotationZ * rotationSpeed;
};
const createRects = () => {
  rects = cryptoList.map((item, index) => {
    const rect = {
      left: index * (100 + 40),
      top: 0,
      width: 100,
    };
    return rect;
  });
};
const menuToggler = () => navbarNav.classList.toggle("d-none");
const addDragScroll = () => {
  let startX;
  let scrollLeft;
  let isScrolling = false;

  banner.addEventListener("mouseover", stopAnimation);

  banner.addEventListener("mousedown", function (event) {
    stopAnimation();
    isScrolling = true;
    startX = event.pageX - banner.offsetLeft;
    scrollLeft = banner.scrollLeft;
  });

  banner.addEventListener("mouseleave", function () {
    if (search.value === ''){
      startAnimation();
    }
    isScrolling = false;
  });

  banner.addEventListener("mouseup", function () {
    isScrolling = false;
  });

  banner.addEventListener("mousemove", function (event) {
    if (!isScrolling) return;
    event.preventDefault();
    var x = event.pageX - banner.offsetLeft;
    var walk = (x - startX) * 2;
    banner.scrollLeft = scrollLeft - walk;
  });
};
const stopRotation = () => rotationSpeed = 0
const startRotation = () => rotationSpeed = 0.01
const isInViewport = (el) => {
  const rectangle = el.getBoundingClientRect();
  return (
      rectangle.top >= 0 &&
      rectangle.left >= 0 &&
      rectangle.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rectangle.right <= (window.innerWidth || document.documentElement.clientWidth)

  );
}
const autoStartStop = () => {
  let visible = isInViewport(banner)
  if (changed === visible){
    if (visible){
      startAnimation()
      changed = !changed
    }else {
      stopAnimation()
      changed = !changed
    }
  }
}
