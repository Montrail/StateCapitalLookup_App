const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search the state.json and filter it
const searchStates = async searchText => {
    const resp = await fetch('../data/states.json');
    const data = await resp.json();

    // Get matches to current text input
    let matches = data.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex) || state.abbr.match(regex) || state.capital.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';    
    }

    outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
  if(matches.length > 0) {
    const html = matches.map(match => `
      <div class="card card-body mb-1">
        <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
        <small>Lat: ${match.lat} / Long: ${match.long}</small>
      </div>
    `).join('');

    matchList.innerHTML = html;
  }
};

search.addEventListener('input', () => searchStates(search.value))
