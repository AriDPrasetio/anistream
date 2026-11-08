import './styles/main.css';

console.info('AniStream App Initialized');

const appContainer = document.querySelector('#app');
if (appContainer) {
  appContainer.innerHTML = `
  <header class="app-header">
    <h1>AniStream</h1>
    <p>Fondasi proyek siap.</p>
  </header>
  `;
}
