import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Box,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useInteractable } from '../../../classes/TownController';
import { NoteTakingArea } from '../../../types/CoveyTownSocket';
import useTownController from '../../../hooks/useTownController';
import NoteTakingAreaInteractable from './NoteTakingArea';

/**
 * NotesBoard component - A text editor using Tiptap for note-taking
 */
let word = '';
function NotesBoard({
  noteTakingArea,
  onExport,
  onImport,
}: {
  noteTakingArea: NoteTakingArea;
  onExport: () => void;
  onImport: () => void;
}): JSX.Element {
  const editor = useEditor({
    extensions: [StarterKit],
    content: noteTakingArea.notes,
    immediatelyRender: false,
    onDestroy: () => {
      // Save notes back to the model when editor is destroyed
      if (editor) {
        word = editor.getHTML();
      }
      console.log('Editor destroyed, notes saved!');
      console.log(noteTakingArea);
    },
  });

  // Update editor content when notes change externally
  useEffect(() => {
    if (editor && noteTakingArea.notes !== undefined) {
      console.log('updating editor content from notes:');
      console.log(noteTakingArea);
      const currentContent = noteTakingArea.notes;
      if (currentContent !== noteTakingArea.notes) {
        editor.commands.setContent(noteTakingArea.notes);
      }
    }
  }, [editor, noteTakingArea]);

  // Expose editor to parent for export
  useEffect(() => {
    if (editor) {
      // Store editor reference on window temporarily for button handlers
      (window as any).__notesBoardEditor = editor;
    }
    return () => {
      delete (window as any).__notesBoardEditor;
    };
  }, [editor]);

  return (
    <Box width='100%' height='100%'>
      <Box
        border='1px'
        borderColor='gray.300'
        borderRadius='md'
        p={4}
        minHeight='400px'
        mb={4}
        bg='white'>
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
}

/**
 * NotesBoardWrapper - Always rendered component that shows NotesBoard modal when player interacts with NoteTakingArea
 */
export default function NotesBoardWrapper(): JSX.Element {
  const noteTakingAreaInteractable = useInteractable<NoteTakingAreaInteractable>('noteTakingArea');
  const townController = useTownController();
  const [noteTakingAreaModel, setNoteTakingAreaModel] = useState<NoteTakingArea>();
  // Create placeholder model from the interactable
  useEffect(() => {
    if (noteTakingAreaInteractable) {
      // For now, create a placeholder model since NoteTakingArea might not have a controller yet
      // This can be enhanced later when full backend integration is complete
      const placeholderModel: NoteTakingArea = {
        id: noteTakingAreaInteractable.id,
        type: 'NoteTakingArea',
        notes: word, // Will be populated when backend sends NoteTakingArea data
        occupants: [],
      };
      setNoteTakingAreaModel(placeholderModel);
      townController.pause();
    } else {
      setNoteTakingAreaModel(undefined);
      townController.unPause();
    }
  }, [townController, noteTakingAreaInteractable]);

  const closeModal = useCallback(() => {
    if (noteTakingAreaInteractable) {
      townController.interactEnd(noteTakingAreaInteractable);
    }
  }, [townController, noteTakingAreaInteractable]);

  const handleExport = useCallback(() => {
    // TODO: Implement export functionality
    const editor = (window as any).__notesBoardEditor;
    if (editor) {
      const content = editor.getHTML();
      console.log('Export button clicked - Current notes content:', content);
      // Future: Could trigger file download here
    }
  }, []);

  const handleImport = useCallback(() => {
    // TODO: Implement import functionality
    console.log('Import button clicked');
    // Future: Could open file picker here
  }, []);

  if (!noteTakingAreaInteractable || !noteTakingAreaModel) {
    return <></>;
  }

  const areaName = noteTakingAreaInteractable.name;

  return (
    <Modal isOpen onClose={closeModal} closeOnOverlayClick={false} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Notes Board - {areaName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <NotesBoard noteTakingArea={noteTakingAreaModel} onExport={handleExport} onImport={handleImport} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleExport} mr={3}>
            Export Notes
          </Button>
          <Button colorScheme="green" onClick={handleImport}>
            Import Notes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
