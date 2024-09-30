import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import styles from './ChatBox.module.scss';

// Dynamically import ReactQuill since it's client-side only
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],        // text modification
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']                                         // remove formatting
  ],
};

interface Props {
  message: string;
  placeholder: string;
  setMessage: (message: string) => void;
}

const ChatBox = ({message, setMessage,placeholder}:Props) => {
  

  const handleSend = () => {
    console.log('Message sent:', message);
    setMessage(''); // clear message after sending
  };

  return (
    <div className={styles.chatBox}>
      <ReactQuill
        theme="snow"
        value={message}
        onChange={setMessage}
        placeholder={placeholder}
        modules={modules}
      />
    </div>
  );
};

export default ChatBox;
