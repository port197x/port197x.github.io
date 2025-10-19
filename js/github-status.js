let lastGitHubStatus = '';
let lastGitHubIncidentCount = 0;

async function fetchGitHubSummary() {
  try {
    const res = await fetch('https://www.githubstatus.com/api/v2/summary.json');
    const data = await res.json();

    const statusDesc = data.status?.description || 'Unknown';
    const lastUpdated = data.page?.updated_at || 'N/A';
    const activeIncidents = data.incidents?.length || 0;
    const now = new Date().toLocaleTimeString();

    const statusChanged = statusDesc !== lastGitHubStatus;
    const incidentsChanged = activeIncidents !== lastGitHubIncidentCount;

    let highlightStyle = '';
    if (statusChanged || incidentsChanged) {
      highlightStyle = 'color: #d9534f; font-weight: bold;';
    }

    document.getElementById('github-summary').innerHTML = `
      <strong>GitHub Summary</strong><br>
      <span style="${highlightStyle}">Status: ${statusDesc}</span><br>
      Active Incidents: ${activeIncidents}<br>
      Last Updated (GitHub): ${new Date(lastUpdated).toLocaleString()}<br>
      Last Checked (Local): ${now}<br>
      <a href="https://www.githubstatus.com" target="_blank">View Full Status Page</a>
    `;

    lastGitHubStatus = statusDesc;
    lastGitHubIncidentCount = activeIncidents;

  } catch (error) {
    document.getElementById('github-summary').innerHTML =
      `<strong>GitHub Summary:</strong> Error fetching data`;
    console.error('GitHub Summary Error:', error);
  }
}

fetchGitHubSummary();
setInterval(fetchGitHubSummary, 60 * 60 * 1000);
