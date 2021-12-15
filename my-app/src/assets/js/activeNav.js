// Function for Active Nav Styling
const handleActiveNav = (e) => {
    for (let i = 0; i < e.target.children.length; i++) {
        let sections = e.target.children[i].id;
        let top = e.target.children[i].getBoundingClientRect().top;
        let activeNav = document.querySelector(`#${sections}-nav`);

        if (top < 1 && top > -1) { activeNav.style.color = 'black'; }
        else { activeNav.style.color = 'rgb(221,218,214)'; }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    let parentContainer = document.querySelector('#trip-views-container');
    parentContainer.addEventListener('scroll', handleActiveNav);
});