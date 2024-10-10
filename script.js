// Week containers (clickable)
const week1Container = document.getElementById('week1-container');
const week2Container = document.getElementById('week2-container');
const week3Container = document.getElementById('week3-container');
const week4Container = document.getElementById('week4-container');
const week5Container = document.getElementById('week5-container');
const week6Container = document.getElementById('week6-container');

// Demo content divs
const week1Demo = document.getElementById('week1-demo');
const week2Demo = document.getElementById('week2-demo');
const week3Demo = document.getElementById('week3-demo');
const week4Demo = document.getElementById('week4-demo');
const week5Demo = document.getElementById('week5-demo');
const week6Demo = document.getElementById('week6-demo');

// Add event listeners to containers to display corresponding demo
week1Container.addEventListener('click', () => {
    showDemo(week1Demo);
});

week2Container.addEventListener('click', () => {
    showDemo(week2Demo);
});

week3Container.addEventListener('click', () => {
    showDemo(week3Demo);
});

week4Container.addEventListener('click', () => {
    showDemo(week4Demo);
});

week5Container.addEventListener('click', () => {
    showDemo(week5Demo);
});

week6Container.addEventListener('click', () => {
    showDemo(week6Demo);
});

// Function to hide all demos and show the selected one
function showDemo(demo) {
    document.querySelectorAll('.demo-content').forEach(content => content.style.display = 'none');
    demo.style.display = 'block';
}

// Week 1 (CSS Box Model) Controls
const paddingRange = document.getElementById('paddingRange');
const marginRange = document.getElementById('marginRange');
const borderRange = document.getElementById('borderRange');
const interactiveBox = document.getElementById('interactive-box');

paddingRange.addEventListener('input', () => {
    interactiveBox.style.padding = paddingRange.value + 'px';
});

marginRange.addEventListener('input', () => {
    interactiveBox.style.margin = marginRange.value + 'px';
});

borderRange.addEventListener('input', () => {
    interactiveBox.style.borderWidth = borderRange.value + 'px';
});

// Week 2 (Flexbox) Controls
const justifyContent = document.getElementById('justifyContent');
const alignItems = document.getElementById('alignItems');
const flexContainer = document.getElementById('flex-container');

justifyContent.addEventListener('change', () => {
    flexContainer.style.justifyContent = justifyContent.value;
});

alignItems.addEventListener('change', () => {
    flexContainer.style.alignItems = alignItems.value;
});

// Week 3 (Grid Layout) Controls
const gridColumns = document.getElementById('gridColumns');
const gridContainer = document.getElementById('grid-container');

gridColumns.addEventListener('input', () => {
    gridContainer.style.gridTemplateColumns = `repeat(${gridColumns.value}, 1fr)`;
});

// Week 4: DOM Manipulation
const changeTextButton = document.getElementById('changeTextButton');
const domText = document.getElementById('dom-text');
changeTextButton.addEventListener('click', () => {
    domText.innerText = "Text Changed!";
});

// Week 5: Axios Requests
document.getElementById('fetchDataButton').addEventListener('click', () => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
            document.getElementById('api-data').textContent = JSON.stringify(response.data);
        });
});

// Week 6: Vue.js Basic App
const app = Vue.createApp({
    data() {
        return {
            message: 'Hello from Vue.js!'
        }
    },
    methods: {
        changeMessage() {
            this.message = 'Message Changed!';
        }
    }
});
app.mount('#vue-app');
