let lastStatusDesc = '';
let lastIncidentCount = 0;

async function fetchCloudflareSummary() {
  try {
    const res = await fetch('https://www.cloudflarestatus.com/api/v2/summary.json');
    const data = await res.json();

    const statusDesc = data.status?.description || 'Unknown';
    const lastUpdated = data.page?.updated_at || 'N/A';
    const activeIncidents = data.incidents?.length || 0;
    const now = new Date().toLocaleTimeString();

    const statusChanged = statusDesc !== lastStatusDesc;
    const incidentsChanged = activeIncidents !== lastIncidentCount;

    let highlightStyle = '';
    if (statusChanged || incidentsChanged) {
      highlightStyle = 'color: #d9534f; font-weight: bold;';
    }

    document.getElementById('cloudflare-summary').innerHTML = `
      <strong>Cloudflare Summary</strong><br>
      <span style="${highlightStyle}">Status: ${statusDesc}</span><br>
      Active Incidents: ${activeIncidents}<br>
      Last Updated (Cloudflare): ${new Date(lastUpdated).toLocaleString()}<br>
      Last Checked (Local): ${now}<br>
      <a href="https://www.cloudflarestatus.com" target="_blank">View Full Status Page</a>
    `;

    lastStatusDesc = statusDesc;
    lastIncidentCount = activeIncidents;

  } catch (error) {
    document.getElementById('cloudflare-summary').innerHTML =
      `<strong>Cloudflare Summary:</strong> Error fetching data`;
    console.error('Cloudflare Summary Error:', error);
  }
}

fetchCloudflareSummary();
setInterval(fetchCloudflareSummary, 60 * 60 * 1000);
