# dataVisualizationSandbox
A space to create data visualizations with AI tools

## Pokémon type bar chart

This project includes a small web visualization that uses the public [PokéAPI](https://pokeapi.co/) to show the distribution of Pokémon by type as a bar chart.

### Run locally

From the project root, start a simple static server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Files:
- `index.html` – page layout and chart container
- `app.js` – fetches API data and renders the Chart.js bar chart
