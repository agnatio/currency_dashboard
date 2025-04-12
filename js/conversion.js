function getUrlParameter(name) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(name) || '';
}

function loadConversionDetails() {
    const cryptoId = getUrlParameter('crypto');
    const fiatId = getUrlParameter('fiat');
    const cryptoSymbol = getUrlParameter('cryptoSymbol');
    const fiatSymbol = getUrlParameter('fiatSymbol');

    const headerElement = document.getElementById('conversionHeader');
    headerElement.textContent = `${cryptoSymbol} to ${fiatSymbol} Conversion`;

    const contentElement = document.getElementById('conversionContent');
    contentElement.innerHTML = `
        <p>Crypto: ${cryptoId}</p>
        <p>Fiat: ${fiatId}</p>
        <p>Conversion Pair: ${cryptoSymbol}/${fiatSymbol}</p>
        <button onclick="fetchConversionRate()">Get Current Rate</button>
    `;
}

async function fetchConversionRate() {
    try {
        const mockRate = Math.random() * 50000;
        
        const contentElement = document.getElementById('conversionContent');
        contentElement.innerHTML += `
            <div>
                <h2>Current Rate</h2>
                <p>1 ${getUrlParameter('cryptoSymbol')} = ${mockRate.toFixed(2)} ${getUrlParameter('fiatSymbol')}</p>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching conversion rate:', error);
    }
}

// Load details when page loads
document.addEventListener('DOMContentLoaded', loadConversionDetails);