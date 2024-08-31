import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import MarkdownEditor from '@/components/common/MarkdownEditer'; // Import MarkdownEditor component

const { TextArea } = Input;

interface IContent {
  title: string;
  body: string;
}

interface Props {
  onContentChange: (contents: IContent[]) => void;
  initialContent: IContent[];
}

const DynamicContentForm: React.FC<Props> = ({ onContentChange, initialContent }) => {
  const [contents, setContents] = useState<IContent[]>(initialContent);

  useEffect(() => {
    setContents(initialContent);
  }, [initialContent]);

  const handleChange = (index: number, field: keyof IContent, value: string) => {
    const updatedContents = [...contents];
    updatedContents[index][field] = value;
    setContents(updatedContents);
    onContentChange(updatedContents);
  };

  const addContentSection = () => {
    const newContent = { title: "", body: "" };
    setContents([...contents, newContent]);
    onContentChange([...contents, newContent]);
  };

  const removeContentSection = (index: number) => {
    const updatedContents = contents.filter((_, i) => i !== index);
    setContents(updatedContents);
    onContentChange(updatedContents);
  };

  return (
    <div className='mb-4'>
      <span>Nội dung chi tiết</span>
      {contents.map((section, index) => (
        <div key={index} className="mb-4 border p-4 rounded-lg shadow-md">
          <Input
            placeholder="Nhập tiêu đề"
            value={section.title}
            onChange={(e) => handleChange(index, 'title', e.target.value)}
            className="mb-2"
          />
          <MarkdownEditor
            value={section.body}
            onEditorChange={(content) => handleChange(index, 'body', content)}
          />
          <Button
            type="link"
            danger
            onClick={() => removeContentSection(index)}
          >
            Xóa phần
          </Button>
        </div>
      ))}
      <Button
        type="dashed"
        onClick={addContentSection}
      >
        Thêm phần nội dung
      </Button>
    </div>
  );
};

export default DynamicContentForm;
