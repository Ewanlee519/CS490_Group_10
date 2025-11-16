import React from 'react';
import { HStack, Button, Select } from '@chakra-ui/react';
import { Editor } from '@tiptap/react';

export default function NotesToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <HStack spacing={2} mb={2}>
      <Select
        width='150px'
        placeholder='Arial'
        onChange={e => editor.chain().focus().setFontFamily(e.target.value).run()}>
        <option value='Georgia'>Georgia</option>
        <option value='Times New Roman'>Times New Roman</option>
        <option value='Courier New'>Courier New</option>
      </Select>

      <Button size='sm' onClick={() => editor.chain().focus().toggleBold().run()}>
        <b>B</b>
      </Button>

      <Button size='sm' onClick={() => editor.chain().focus().toggleItalic().run()}>
        <em>I</em>
      </Button>

      <Button size='sm' onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <u>U</u>
      </Button>

      <Button size='sm' onClick={() => editor.chain().focus().toggleStrike().run()}>
        <s>S</s>
      </Button>
    </HStack>
  );
}
