// function adjustSvgViewBox() {
//     const heroSection = document.querySelector('.hero');
//     const svgElement = document.querySelector('.flower-of-life');

//     if (heroSection && svgElement) {
//         // Get the dimensions of the hero section
//         const width = heroSection.offsetWidth;
//         const height = heroSection.offsetHeight;

//         // Set the viewBox to match the hero section dimensions
//         svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
//     }
// }

// function updateCircleAttributes() {
//     const heroSection = document.querySelector('.hero');
//     const svgElement = document.querySelector('.flower-of-life');
//     const circles = svgElement.querySelectorAll('circle');

//     if (heroSection && circles) {
//         const scaleRatio = heroSection.offsetWidth / 400; // Assuming the original viewBox width is 400

//         circles.forEach(circle => {
//             const originalCx = parseFloat(circle.getAttribute('cx'));
//             const originalCy = parseFloat(circle.getAttribute('cy'));
//             const originalR = parseFloat(circle.getAttribute('r'));

//             circle.setAttribute('cx', originalCx * scaleRatio);
//             circle.setAttribute('cy', originalCy * scaleRatio);
//             circle.setAttribute('r', originalR * scaleRatio);
//         });
//     }
// }


// document.addEventListener('DOMContentLoaded', function() {
//     adjustSvgViewBox();
//     updateCircleAttributes(); // Call after adjusting viewBox
// });

// // window.addEventListener('resize', function() {
// //     adjustSvgViewBox();
// //     updateCircleAttributes(); // Call after adjusting viewBox
// // });

function generateFlowerOfLife() {
    const heroSection = document.querySelector('.hero');
    const svgElement = document.querySelector('.flower-of-life');

    if (heroSection && svgElement) {
        const heroWidth = heroSection.offsetWidth;
        const centralCircleRadius = heroWidth * 0.08; // Central circle radius as 5% of hero width
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
    circle.setAttribute("stroke", "black");
    circle.setAttribute("stroke-width", "2");
    circle.setAttribute("fill", "none");
    svgElement.appendChild(circle);
}

document.addEventListener('DOMContentLoaded', generateFlowerOfLife);
window.addEventListener('resize', generateFlowerOfLife);
