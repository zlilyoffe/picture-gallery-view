let state = {
    category: '',
    filter: '',
    size: {w: 640, h: 480}
  };
  
  onPageLoad();
  
  function setState(newState) {
    Object.assign(state, newState);
    render(state);
  }
  
  function render(state) {
    document.querySelector('#root').innerHTML = App(state);
  }
  
  function onPageLoad() {
    setState({category: 'people'});
  }
  
  function onGenerate() {
    setState({});
  }
  
  function onFilterChange(event) {
    setState({filter: event.target.value});
  }
  
  function onCategoryChange(event) {
    let select = event.target;
    let option = select.options[select.selectedIndex];
    setState({category: option.value});
  }
  
  function App(state) {
    return `
      <main style="
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 0.5em;">
        ${Image(state)}
        <div>
          <button onclick="onGenerate(event)">Generate</button>
          ${Filters(state.filter)}
          ${Categories(state.category)}
        </div>
      </main>
    `;
  }
  
  function Image(state) {
    let url = `https://placeimg.com/${state.size.w}/${state.size.h}/${state.category}${state.filter && `/${state.filter}`}`;
    return `
      <img
        style="border: 3px solid"
        width="${state.size.w}" height="${state.size.h}"
        src="${url}" />
      <p>${url}</p>
    `;
  }
  
  function Filters(filter) {
    return `
      <input onclick="onFilterChange(event)" type="radio" ${filter === 'sepia' && 'checked'} value="sepia" id="sepia"><label for="sepia">Sepia</label>
      <input onclick="onFilterChange(event)" type="radio" ${filter === 'grayscale' && 'checked'} value="grayscale" id="grayscale"><label for="grayscale">Grayscale</label>
    `;
  }
  
  function Categories(category) {
    let options = [
      {value: 'animals'},
      {value: 'people'},
      {value: 'nature'},
      {value: 'tech'},
      {value: 'architecture'}
    ];
    return `
      <select onchange="onCategoryChange(event)">
        ${options.map(option => `<option value="${option.value}" ${option.value === category && 'selected'}>${option.value}</option>`).join('')}
      </select>
    `;
  }