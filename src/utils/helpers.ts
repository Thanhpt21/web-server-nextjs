export const formatCurrency = (amount: any) => {
    // Chuyển đổi số thành chuỗi với dấu phân cách ngàn
    const formattedAmount = amount.toLocaleString('vi-VN');
    
    // Thêm ký tự "đ" vào cuối chuỗi
    return `${formattedAmount} đ`;
};