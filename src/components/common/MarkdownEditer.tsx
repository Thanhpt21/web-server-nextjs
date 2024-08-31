// components/TinyMCEEditor.tsx
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyMCEEditorProps {
    value: string;
    onEditorChange: (content: string) => void;
}

const MarkdownEditer: React.FC<TinyMCEEditorProps> = ({ value, onEditorChange }) => {
    return (
        <Editor
            apiKey="av0qsby18h1ex6ezz8rb9404ry1kzpexk31nuj27ikvncfi1"
            value={value}
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={onEditorChange}
        />
    );
};

export default MarkdownEditer;

