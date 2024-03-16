function generateFlowerOfLife() {
    const heroSection = document.querySelector('.hero');
    const svgElement = document.querySelector('.flower-of-life');

    if (heroSection && svgElement) {
        const heroWidth = heroSection.offsetWidth;
        const centralCircleRadius = heroWidth * 0.08; // Central circle radius as 8% of hero width
        const circleDistance = centralCircleRadius * 2; // Distance for the first ring of circles
        const outerCircleRadius = centralCircleRadius * 1.5; // Larger radius for outer circles
        const outerCircleDistance = circleDistance + centralCircleRadius + outerCircleRadius; // Distance for the outer ring

        // Clear previous SVG content
        svgElement.innerHTML = '';

        // Central Circle
        createCircle(svgElement, heroWidth / 2, heroSection.offsetHeight / 2, centralCircleRadius);

        // Generate first ring of surrounding circles
        const angles = [0, 60, 120, 180, 240, 300]; // Angles for hexagonal pattern
        angles.forEach(angle => {
            const rad = Math.PI * angle / 180; // Convert angle to radians
            const cx = (heroWidth / 2) + circleDistance * Math.cos(rad);
            const cy = (heroSection.offsetHeight / 2) + circleDistance * Math.sin(rad);
            createCircle(svgElement, cx, cy, centralCircleRadius);
        });

        // Generate outer ring of larger circles
        angles.forEach(angle => {
            const rad = Math.PI * angle / 180; // Convert angle to radians
            const cx = (heroWidth / 2) + outerCircleDistance * Math.cos(rad);
            const cy = (heroSection.offsetHeight / 2) + outerCircleDistance * Math.sin(rad);
            createCircle(svgElement, cx, cy, outerCircleRadius);
        });
    }
}


function createCircle(svgElement, cx, cy, r) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    circle.setAttribute("stroke", "rgb(0, 0, 67)");
    circle.setAttribute("stroke-width", "2");
    circle.setAttribute("fill", "none");
    svgElement.appendChild(circle);
}

document.addEventListener('DOMContentLoaded', () => {
    const circles = document.querySelectorAll('.geometry-group .circle, .geometry-group-inner .circle, .geometry-group-outer1 .circle, .geometry-group-outer2 .circle');
    let activeBubbles = [];

    function showChatBubbles() {
        // Clear out any existing bubbles before creating new ones
        activeBubbles.forEach(bubble => bubble.remove());
        activeBubbles = []; // Reset the array after cleanup

        const numberOfBubblesToShow = Math.floor(Math.random() * 7) + 1;
        const uniqueIndices = new Set();
        while (uniqueIndices.size < numberOfBubblesToShow) {
            const randomIndex = Math.floor(Math.random() * circles.length);
            uniqueIndices.add(randomIndex);
        }

        uniqueIndices.forEach(index => {
            const chatBubble = document.createElement('div');
            chatBubble.textContent = '💬';
            chatBubble.className = 'chat-bubble';
            chatBubble.style.display = 'flex';
            chatBubble.style.justifyContent = 'center';
            chatBubble.style.alignItems = 'center';

            const circle = circles[index];
            circle.appendChild(chatBubble);
            activeBubbles.push(chatBubble); // Keep track of active bubbles for later removal

            const timeoutDuration = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
            setTimeout(() => {
                const index = activeBubbles.indexOf(chatBubble);
                if (index > -1) {
                    activeBubbles.splice(index, 1); // Remove bubble from tracking array
                }
                chatBubble.remove();
            }, timeoutDuration);
        });
    }

    // Initial call
    showChatBubbles();

    // Regular updates
    const intervalId = setInterval(showChatBubbles, 4000);

    // Consider adding a way to clear the interval if the user navigates away or the element is removed
    // For example, on a page navigation or component unmount in a SPA (Single Page Application)
});


document.addEventListener('DOMContentLoaded', generateFlowerOfLife);
window.addEventListener('resize', generateFlowerOfLife);
