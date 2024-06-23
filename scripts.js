// CoinGecko API'nin endpoint bilgilerini tanımlayın
const apiEndpoint = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1';

// Kripto paraların listesini oluşturacak fonksiyon
function createCryptoList() {
    const tableBody = document.querySelector('#cryptoTable tbody');
    const searchInput = document.querySelector('#searchInput');
    
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            data.forEach((crypto, index) => {
                const rank = index + 1;
                const symbol = crypto.symbol.toUpperCase();
                const price = crypto.current_price;
                const volume = crypto.total_volume.toLocaleString('en-US', { maximumFractionDigits: 0 });
                const marketCap = crypto.market_cap.toLocaleString('en-US', { maximumFractionDigits: 0 });
                const dailyChange = crypto.price_change_percentage_24h.toFixed(2);
                const logo = crypto.image;
                const changeClass = dailyChange < 0 ? 'red' : 'green';
                const row = `<tr>
                                <td>${rank}</td>
                                <td><img src="${logo}" alt="${symbol}" class="logo"></td>
                                <td>${symbol}</td>
                                <td>${price}</td>
                                <td class="${changeClass}">${dailyChange}%</td>
                                <td>${volume}</td>
                                <td>${marketCap}</td>
                             </tr>`;
                tableBody.innerHTML += row;
            });

            // Arama filtresi ekle
            searchInput.addEventListener('input', function() {
                const filter = this.value.toUpperCase();
                const rows = tableBody.querySelectorAll('tr');

                rows.forEach(row => {
                    const symbol = row.cells[2].textContent.toUpperCase();
                    if (symbol.indexOf(filter) > -1) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        })
        .catch(error => console.error('Hata:', error));
}

// Sayfa yüklendiğinde kripto listesini oluştur
document.addEventListener('DOMContentLoaded', createCryptoList);
