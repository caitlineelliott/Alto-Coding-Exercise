// Function for Active Nav Styling
const handleActiveNav = (e) => {
    for (let i = 0; i < e.target.children.length; i++) {
        const sections = e.target.children[i].id;
        const top = e.target.children[i].getBoundingClientRect().top;
        const activeNav = document.querySelector(`#${sections}-nav`);

        if (top < 1 && top > -1) { activeNav.style.color = 'black'; }
        else { activeNav.style.color = 'rgb(221,218,214)'; }
    }
};

window.addEventListener('DOMContentLoaded', () => {
    const parentContainer = document.querySelector('#trip-views-container');
    parentContainer.addEventListener('scroll', handleActiveNav);
});