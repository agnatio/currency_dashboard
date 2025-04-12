
async function loadData() {
    try {
        let cryptoCurrencies = [];
        let fiatCurrencies = [];

        const cryptoResponse = await fetch('data/cryptos.json');
        const cryptoData = await cryptoResponse.json();
        cryptoCurrencies = cryptoData.cryptocurrencies;
        console.log(cryptoCurrencies);

        const fiatResponse = await fetch('data/fiats.json');
        const fiatData = await fiatResponse.json();
        fiatCurrencies = fiatData.fiatcurrencies;
        console.log(fiatCurrencies);

        buildConversionTable(cryptoCurrencies, fiatCurrencies);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}


function buildConversionTable(cryptoCurrencies, fiatCurrencies) {
    const table = document.getElementById('conversionTable');
    
    const headerRow = document.createElement('tr');
    const emptyHeader = document.createElement('th');
    headerRow.appendChild(emptyHeader);

    // fiatCurrencies.forEach(fiat => {
    //     const th = document.createElement('th');
    //     th.textContent = fiat.symbol;
    //     headerRow.appendChild(th);
    // });

    // table.appendChild(headerRow);

    cryptoCurrencies.forEach(crypto => {
        const row = document.createElement('tr');

        // const cryptoCell = document.createElement('td');
        // cryptoCell.textContent = crypto.symbol;
        // row.appendChild(cryptoCell);

        fiatCurrencies.forEach(fiat => {
            const conversionCell = document.createElement('td');
            const link = document.createElement('a');
        
            // Set href to the conversion page with parameters
            link.href = `conversion.html?crypto=${crypto.id}&fiat=${fiat.id}&cryptoSymbol=${crypto.symbol}&fiatSymbol=${fiat.symbol}`;
            
            link.textContent = `${crypto.symbol}/${fiat.symbol}`;
            
            // Comment out the previous event listener
            /*
            link.addEventListener('click', (event) => {
                event.preventDefault(); 
                handleConversionClick(crypto, fiat);
            });
            */
        
            conversionCell.appendChild(link);
            conversionCell.id = `${crypto.id}_${fiat.id}`;
            row.appendChild(conversionCell);
        });
        
        table.appendChild(row);
    });
}

function handleConversionClick(crypto, fiat) {
    console.log(`I pressed click: ${crypto.symbol} to ${fiat.symbol}`);
}


document.addEventListener('DOMContentLoaded', loadData);