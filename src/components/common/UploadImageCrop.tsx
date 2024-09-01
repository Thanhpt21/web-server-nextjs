'use client'
import React, { useState } from 'react';
import { Upload, UploadFile, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';

interface IUploadImageProps {
    imageUrl?: string;
    onImageUpload: (url: string) => void;
    token: string;
}

const UploadImageCrop: React.FC<IUploadImageProps> = ({ imageUrl, onImageUpload, token }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    // Function to handle custom image upload
    const handleUploadImage = async ({ file, onSuccess, onError }: RcCustomRequestOptions) => {
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', file as any); // Cast to `any` if necessary

            const response = await fetch('http://localhost:8080/api/v1/upload/image', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`, // Add token to header
                },
            });

            const result = await response.json();

            if (result.data && result.data.secure_url) {
                onImageUpload(result.data.secure_url);
                // Clear the file list and only add the new uploaded file
                setFileList([]);
                onSuccess && onSuccess({ secure_url: result.data.secure_url });
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error during upload:', error);
            if (onError) {
                onError(error as Error);
            }
        } finally {
            setUploading(false);
        }
    };

    // Handle changes to the file list
    const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
        // No need to handle changes here, since fileList is managed by handleUploadImage
    };

    return (
        <ImgCrop rotationSlider>
            <Upload
                customRequest={handleUploadImage}
                fileList={fileList}
                onChange={handleChange}
                showUploadList={false} // Hide default upload list
                listType="picture-card"
                accept="image/*"
                onPreview={() => {
                    // Trigger file input click when image is clicked
                    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
                    input?.click();
                }}
            >
                {fileList.length > 0 || imageUrl ? (
                    <img src={fileList[0]?.url || imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {uploading ? 'Uploading...' : 'Upload'}
                    </div>
                )}
            </Upload>
        </ImgCrop>
    );
};

export default UploadImageCrop;
