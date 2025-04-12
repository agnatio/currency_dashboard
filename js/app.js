async function loadData() {
    try {
        let cryptoCurrencies = [];
        let fiatCurrencies = [];

        const cryptoResponse = await fetch('data/cryptos.json');
        const cryptoData = await cryptoResponse.json();
        cryptoCurrencies = cryptoData.cryptocurrencies;
        
        const fiatResponse = await fetch('data/fiats.json');
        const fiatData = await fiatResponse.json();
        fiatCurrencies = fiatData.fiatcurrencies;
        
        buildConversionGrid(cryptoCurrencies, fiatCurrencies);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function buildConversionGrid(cryptoCurrencies, fiatCurrencies) {
    // Get the container element where we'll add our grid
    const container = document.getElementById('conversionContainer');
    
    // Create a div for our conversion grid
    const grid = document.createElement('div');
    grid.className = 'conversion-grid';
    
    // Create conversion items
    cryptoCurrencies.forEach(crypto => {
        fiatCurrencies.forEach(fiat => {
            // Create a div for each conversion pair
            const conversionItem = document.createElement('div');
            conversionItem.className = 'conversion-item';
            conversionItem.id = `${crypto.id}_${fiat.id}`;
            
            // Create the link
            const link = document.createElement('a');
            link.href = `conversion.html?crypto=${crypto.id}&fiat=${fiat.id}&cryptoSymbol=${crypto.symbol}&fiatSymbol=${fiat.symbol}`;
            link.textContent = `${crypto.symbol}/${fiat.symbol}`;
            
            // Add the link to the conversion item
            conversionItem.appendChild(link);
            
            // Add the conversion item to the grid
            grid.appendChild(conversionItem);
        });
    });
    
    // Add the grid to the container
    container.appendChild(grid);
}

document.addEventListener('DOMContentLoaded', loadData);