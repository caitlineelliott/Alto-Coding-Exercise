// Function to change ETA time to "En route... when view #4 (#trip) is reached"
function handleFooterText(e) {
    let tripSection = e.target.lastChild;
    let top = tripSection.getBoundingClientRect().top;
    let footerText = document.querySelector('#address-row2');

    if (top < 1 && top > -1) { footerText.innerHTML = 'En route..' }
}

window.addEventListener('DOMContentLoaded', () => {
    let parentContainer = document.querySelector('#trip-views-container');
    parentContainer.addEventListener('scroll', handleFooterText);
});