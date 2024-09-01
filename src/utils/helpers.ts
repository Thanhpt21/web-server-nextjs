export const formatCurrency = (amount: any) => {
    // Chuyển đổi số thành chuỗi với dấu phân cách ngàn
    const formattedAmount = amount.toLocaleString('vi-VN');
    
    // Thêm ký tự "đ" vào cuối chuỗi
    return `${formattedAmount} đ`;
};

export const handleSlugify = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};


export const isValidMongoId = (id: string): boolean => {
    try {
        new ObjectId(id);
        return true;
    } catch (error) {
        return false;
    }
};