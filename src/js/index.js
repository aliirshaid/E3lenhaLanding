const navbar = document.querySelector("nav");
const sticky = navbar.offsetTop;
let topRectangles;
const navBarAnchorsSections = document.querySelectorAll(
  "#header, #sellers, #marketers, #contactus"
);

const handleNavBackground = (event) => {
  navbar.classList.add("bg-light");
  navbar.classList.remove("bg-transparent");
  if (navbar.classList.contains("corner-radius")) {
    navbar.classList.remove("corner-radius");
  } else {
    navbar.classList.add("corner-radius");
  }
};

const getTopRectanglesForNavbar = () => {
  topRectangles = Array.from(navBarAnchorsSections).map((section) => {
    const sectionId = section.id;
    const sectionRect = section.getBoundingClientRect();
    return { id: sectionId, top: sectionRect.top, bottom: sectionRect.bottom };
  });
};

const handleStickyNavbar = () => {
  if (navbar.classList.contains("corner-radius")) {
    return;
  }
  navbar.classList.toggle("bg-light", window.scrollY > sticky);
  navbar.classList.toggle("bg-transparent", window.scrollY <= sticky);
};

const handleActiveAnchorsNavbar = () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.clientHeight;

  let activeAnchorFound = false;

  for (const sectionData of topRectangles) {
    const { id, top, bottom } = sectionData;
    const anchor = document.querySelector(`a[href="#${id}"]`);

    if (
      scrollY >= top - windowHeight * 0.2 &&
      scrollY < bottom - windowHeight * 0.2
    ) {
      anchor.classList.add("active");
      activeAnchorFound = true;
    } else {
      anchor.classList.remove("active");
    }
  }

  const contactUsAnchor = document.querySelector('a[href="#contactus"]');

  if (scrollY + windowHeight >= documentHeight) {
    contactUsAnchor.classList.toggle("active");
  }
};

const handleScroll = () => {
  handleStickyNavbar();
  handleActiveAnchorsNavbar();
};

window.onload = () => {
  getTopRectanglesForNavbar();
  window.onscroll = handleScroll;
};
