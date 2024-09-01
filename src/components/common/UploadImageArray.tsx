import { Upload, message } from 'antd';
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import React, { useState, useEffect } from 'react';

interface IUploadImageArrayProps {
    imageUrls: string[];
    onImagesUpload: (urls: string[]) => void;
    token: string;
}

const UploadImageArray: React.FC<IUploadImageArrayProps> = ({ imageUrls, onImagesUpload, token }) => {
    const [uploading, setUploading] = useState(false);
    const [allImageUrls, setAllImageUrls] = useState<string[]>([]);

    useEffect(() => {
        // Set initial image URLs from props
        setAllImageUrls(imageUrls);
    }, [imageUrls]);

    const handleUploadImage = async ({ file, onSuccess, onError }: RcCustomRequestOptions) => {
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('images', file as any);

            const response = await fetch('http://localhost:8080/api/v1/upload/images', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();
            if (result.data && result.data.data && Array.isArray(result.data.data)) {
                const newUrls = result.data.data;
                
                // Update allImageUrls and call onImagesUpload with the updated array
                setAllImageUrls(prev => {
                    const combinedUrls = Array.from(new Set([...prev, ...newUrls]));
                    onImagesUpload(combinedUrls); // Pass updated list to parent component
                    return combinedUrls;
                });

                onSuccess && onSuccess(result.data.data);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error during upload:', error);
            message.error('Upload failed.');
            if (onError) {
                onError(error as Error);
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <Upload
                customRequest={handleUploadImage}
                showUploadList={false}
                listType="picture-card"
                accept="image/*"
                multiple
            >
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {uploading ? 'Đang tải lên...' : 'Tải lên'}
                </div>
            </Upload>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                {allImageUrls.length > 0 ? (
                    allImageUrls.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`uploaded-${index}`}
                            className='w-20'
                        />
                    ))
                ) : (
null
                )}
            </div>
        </div>
    );
};

export default UploadImageArray;
