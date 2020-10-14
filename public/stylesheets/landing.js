function cycleBackgrounds(interval) {
    let index = 0

    const imgElement = document.querySelectorAll('.cont .slide') // Get the images to be cycled.

    setInterval(() => {
        // Get the next index.  If at end, restart to the beginning.
        index = index + 1 < imgElement.length ? index + 1 : 0

        // Show the next
        imgElement[index].classList.add('show')

        // Find the previous.
        const previous = index - 1 < 0 ? imgElement.length - 1 : index - 1;

        // Hide the previous
        imgElement[previous].classList.remove('show')
    }, interval)
}

document.addEventListener("DOMContentLoaded", function() {
    cycleBackgrounds(5000);
});