const statusEl = document.getElementById('status');
const chartCanvas = document.getElementById('typeChart');

const POKEAPI_TYPE_LIST = 'https://pokeapi.co/api/v2/type';
const excludedTypes = new Set(['unknown', 'shadow']);

async function fetchTypeCounts() {
  const listRes = await fetch(POKEAPI_TYPE_LIST);
  if (!listRes.ok) {
    throw new Error(`Failed to load type list: ${listRes.status}`);
  }

  const listData = await listRes.json();
  const typeUrls = listData.results
    .filter((type) => !excludedTypes.has(type.name))
    .map((type) => type.url);

  const typeDetails = await Promise.all(
    typeUrls.map(async (url) => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to load type details: ${res.status}`);
      }
      const data = await res.json();
      return {
        type: data.name,
        count: data.pokemon.length,
      };
    })
  );

  return typeDetails.sort((a, b) => b.count - a.count);
}

function renderChart(typeData) {
  const labels = typeData.map((item) => item.type);
  const counts = typeData.map((item) => item.count);

  new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Number of Pokémon',
          data: counts,
          backgroundColor: '#3b82f6',
          borderColor: '#1d4ed8',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Pokémon Count by Type',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Pokémon count',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Type',
          },
        },
      },
    },
  });
}

async function init() {
  try {
    const typeData = await fetchTypeCounts();
    renderChart(typeData);
    statusEl.textContent = 'Loaded successfully.';
  } catch (error) {
    statusEl.textContent = `Error: ${error.message}`;
    statusEl.style.color = '#b91c1c';
  }
}

init();
