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
  useToast,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { TextStyleKit } from '@tiptap/extension-text-style';
import NotesToolbar from './NotesToolBar';
import { useInteractable } from '../../../classes/TownController';
import { NoteTakingArea } from '../../../types/CoveyTownSocket';
import useTownController from '../../../hooks/useTownController';
import NoteTakingAreaInteractable from './NoteTakingArea';
import NoteTakingAreaController, {
  useNoteTakingAreaNotes,
} from '../../../classes/interactable/NoteTakingAreaController';
<<<<<<< HEAD
import { debounce } from 'lodash';
=======
>>>>>>> 8192c98 (removed placeholder and made it so people can both see the notes that are edited. (Not real-time, but after a player closes it))

/**
 * NotesBoard component - A text editor using Tiptap for note-taking
 */
function NotesBoard({
  noteTakingAreaController,
  onExport,
  onImport,
}: {
  noteTakingAreaController: NoteTakingAreaController;
  onExport: () => void;
  onImport: () => void;
}): JSX.Element {
  const currentNotes = useNoteTakingAreaNotes(noteTakingAreaController);

<<<<<<< HEAD
  const debouncedSaveNotes = useCallback(
    debounce((notes: string) => {
      noteTakingAreaController.updateNotes(notes);
    }, 150),
    [noteTakingAreaController],
  );

  const editor = useEditor({
<<<<<<< HEAD
<<<<<<< HEAD
    extensions: [StarterKit],
<<<<<<< HEAD
=======
    extensions: [StarterKit, Underline],
>>>>>>> 3b9a4b4 (Add Bold, Italic, Underline, Strikethrough)
=======
    extensions: [StarterKit, Underline, TextStyleKit],
>>>>>>> 78c2a68 (Added Font Style/Text Style kit)
    content: currentNotes,
=======
    content: noteTakingArea.notes,
>>>>>>> 28b737f (got the omit files to auto generate using prestart)
    immediatelyRender: false,
<<<<<<< HEAD
<<<<<<< HEAD
    onDestroy: () => {
<<<<<<< HEAD
      // Save notes back to the backend when editor is destroyed
=======
    // onDestroy: () => {
    //   // Save notes back to the backend when editor is destroyed
    //   if (editor) {
    //     noteTakingAreaController.updateNotes(editor.getHTML());
    //   }
    //   console.log('Editor destroyed, notes saved to backend!');
    // },
=======
    onDestroy: () => {
      // Save notes back to the backend when editor is destroyed
      if (editor) {
        noteTakingAreaController.updateNotes(editor.getHTML());
      }
      console.log('Editor destroyed, notes saved to backend!');
    },
>>>>>>> 112a41c (added the on destroy back)
    onUpdate: () => {
      // Save notes back to the backend on every update
>>>>>>> 6110536 (made it so users can see the changes of the notes in real time)
      if (editor) {
        noteTakingAreaController.updateNotes(editor.getHTML());
      }
      console.log('Editor updated, notes saved to backend!');
    },
    onUpdate: ({ editor: updatedEditor }) => {
      const notes = updatedEditor.getHTML();
      debouncedSaveNotes(notes);
=======
      // Save notes back to the model when editor is destroyed
=======
  const editor = useEditor({
    extensions: [StarterKit],
    content: currentNotes,
    immediatelyRender: false,
    onDestroy: () => {
      // Save notes back to the backend when editor is destroyed
>>>>>>> 8192c98 (removed placeholder and made it so people can both see the notes that are edited. (Not real-time, but after a player closes it))
      if (editor) {
        noteTakingAreaController.updateNotes(editor.getHTML());
      }
<<<<<<< HEAD
      console.log('Editor destroyed, notes saved!');
      console.log(noteTakingArea);
<<<<<<< HEAD
      console.log(noteTakingArea.notes);
>>>>>>> 581de96 (almost done implemented the controller)
=======
>>>>>>> 28b737f (got the omit files to auto generate using prestart)
=======
      console.log('Editor destroyed, notes saved to backend!');
>>>>>>> 8192c98 (removed placeholder and made it so people can both see the notes that are edited. (Not real-time, but after a player closes it))
    },
  });

  // Update editor content when notes change externally
  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
    if (editor && currentNotes !== undefined) {
      console.log('updating editor content from notes:');
      console.log(currentNotes);
      if (editor.getHTML() !== currentNotes) {
        editor.commands.setContent(currentNotes);
      }
    }
  }, [editor, currentNotes]);
=======
    if (editor && noteTakingArea.notes !== undefined) {
=======
    if (editor && currentNotes !== undefined) {
>>>>>>> 8192c98 (removed placeholder and made it so people can both see the notes that are edited. (Not real-time, but after a player closes it))
      console.log('updating editor content from notes:');
      console.log(currentNotes);
      if (editor.getHTML() !== currentNotes) {
        editor.commands.setContent(currentNotes);
      }
    }
<<<<<<< HEAD
  }, [editor, noteTakingArea]);
>>>>>>> 581de96 (almost done implemented the controller)
=======
  }, [editor, currentNotes]);
>>>>>>> 8192c98 (removed placeholder and made it so people can both see the notes that are edited. (Not real-time, but after a player closes it))

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
        {editor && <NotesToolbar editor={editor} />}
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
<<<<<<< HEAD
<<<<<<< HEAD
  const isOpen = noteTakingAreaInteractable !== undefined;
  const noteTakingAreaController = noteTakingAreaInteractable?.controller;

=======
  const [noteTakingAreaModel, setNoteTakingAreaModel] = useState<NoteTakingArea>();
>>>>>>> 28b737f (got the omit files to auto generate using prestart)
=======
  const isOpen = noteTakingAreaInteractable !== undefined;
  const noteTakingAreaController = noteTakingAreaInteractable?.controller;

>>>>>>> 8192c98 (removed placeholder and made it so people can both see the notes that are edited. (Not real-time, but after a player closes it))
  // Create placeholder model from the interactable
  useEffect(() => {
    if (noteTakingAreaInteractable) {
      // For now, create a placeholder model since NoteTakingArea might not have a controller yet
      // This can be enhanced later when full backend integration is complete
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8192c98 (removed placeholder and made it so people can both see the notes that are edited. (Not real-time, but after a player closes it))
      // const placeholderModel: NoteTakingArea = {
      //   id: noteTakingAreaInteractable.id,
      //   type: 'NoteTakingArea',
      //   notes: noteTakingAreaInteractable.notes,
      //   occupants: [],
      // };
      // setNoteTakingAreaModel(placeholderModel);
<<<<<<< HEAD
=======
      const placeholderModel: NoteTakingArea = {
        id: noteTakingAreaInteractable.id,
        type: 'NoteTakingArea',
        notes: word, // Will be populated when backend sends NoteTakingArea data
        occupants: [],
      };
      setNoteTakingAreaModel(placeholderModel);
>>>>>>> 581de96 (almost done implemented the controller)
=======
>>>>>>> 8192c98 (removed placeholder and made it so people can both see the notes that are edited. (Not real-time, but after a player closes it))
      townController.pause();
    } else {
      //setNoteTakingAreaModel(undefined);
      townController.unPause();
    }
  }, [townController, noteTakingAreaInteractable]);

  const closeModal = useCallback(() => {
    if (noteTakingAreaInteractable) {
      townController.interactEnd(noteTakingAreaInteractable);
    }
  }, [townController, noteTakingAreaInteractable]);

  const toast = useToast();

  const handleExport = useCallback(() => {
    // TODO: Implement export functionality
    const editor = (window as any).__notesBoardEditor;
    if (editor) {
      const content = editor.getHTML();
      const blob = new Blob([content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'notes.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast({
        title: 'Notes exported successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      console.log('Export button clicked - Nothing happened!');
      // Future: Could trigger file download here
    }
  }, [toast]);

  const handleImport = useCallback(() => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt, .html';

    fileInput.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      try {
        if (target.files && target.files.length > 0) {
          const file = target.files[0];
          const reader = new FileReader();
          reader.onload = loadEvent => {
            const text = loadEvent.target?.result;
            if (typeof text === 'string') {
              const editor = (window as any).__notesBoardEditor;
              if (editor) {
                editor.commands.setContent(text);
                toast({
                  title: 'Notes imported successfully!',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                });
              }
            }
          };
          reader.readAsText(file);
        }
      } finally {
        document.body.removeChild(fileInput);
      }
    };

    document.body.appendChild(fileInput);
    fileInput.click();
    console.log('Import button clicked');
    // Future: Could open file picker here
  }, [toast]);

  if (!noteTakingAreaController) {
    return <></>;
  }
  const areaName = noteTakingAreaInteractable.name;

  return (
    <Modal isOpen={isOpen} onClose={closeModal} closeOnOverlayClick={false} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Notes Board - {areaName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <NotesBoard
            noteTakingAreaController={noteTakingAreaController}
            onExport={handleExport}
            onImport={handleImport}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' onClick={handleExport} mr={3}>
            Export Notes
          </Button>
          <Button colorScheme='green' onClick={handleImport}>
            Import Notes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
