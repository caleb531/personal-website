(function () {

function $$(selector) {
  return document.querySelector(selector);
}

// Cache elements
var menuToggle = $$('#site-header-nav-toggle');
var siteHeaderNav = $$('#site-header-nav');
var siteHeaderNavList = $$('#site-header-nav-list');

// Toggle nav menu when nav control is clicked
menuToggle.addEventListener('click', function () {
  siteHeaderNav.classList.toggle('site-header-nav-open');
}, false);

// Do not visit on first click nav items which have submenus
siteHeaderNavList.addEventListener('click', function (event) {
  var link = event.target,
    subMenu = link.nextElementSibling;
  // If nav menu is open and sub menu exists and sub menu is not open
  if (link.nodeName === 'A' && siteHeaderNav.classList.contains('site-header-nav-open') && subMenu !== null && !subMenu.classList.contains('sub-menu-open')) {
    // Close any open submenus
    var openSubMenus = $$('.sub-menu-open');
    if (openSubMenus) {
      openSubMenus.forEach(function (openSubMenu) {
        openSubMenu.classList.remove('sub-menu-open');
      });
    }
    // Open submenu for clicked link
    subMenu.classList.add('sub-menu-open');
    event.preventDefault();
    event.stopPropagation();
  }
}, false);

// Enable FastClick
FastClick.attach(document.body);

}());
