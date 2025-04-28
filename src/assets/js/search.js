async function searchProduct() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');

    // Xóa kết quả cũ
    resultsContainer.innerHTML = '';

    if (!searchInput) {
        resultsContainer.innerHTML = '<p style="color: red;">Vui lòng nhập từ khóa để tìm kiếm.</p>';
        return;
    }

    try {
        // Lấy dữ liệu từ file products.json
        const response = await fetch('data/products.json');
        const products = await response.json();

        // Tìm sản phẩm khớp với từ khóa
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchInput)
        );

        if (filteredProducts.length === 0) {
            resultsContainer.innerHTML = '<p style="color: red;">Không tìm thấy sản phẩm nào.</p>';
            return;
        }

        // Hiển thị kết quả
        filteredProducts.forEach(product => {
            const productHTML = `
                <div style="border: 1px solid #ccc; border-radius: 5px; padding: 1rem; margin-bottom: 1rem; background: #fff;">
                    <h3 style="color: #ff4d4d;">${product.name}</h3>
                    <p><strong>Danh mục:</strong> ${product.category}</p>
                    <p><strong>Mô tả:</strong> ${product.description}</p>
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; max-width: 300px; height: auto; border-radius: 5px; margin-bottom: 1rem;">
                    <p><strong>Báo chính thống đưa tin:</strong></p>
                    <ul>
                        ${product.official_reports.map(report => `<li><a href="${report}" target="_blank">${report}</a></li>`).join('')}
                    </ul>
                </div>
            `;
            resultsContainer.innerHTML += productHTML;
        });
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        resultsContainer.innerHTML = '<p style="color: red;">Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.</p>';
    }
}