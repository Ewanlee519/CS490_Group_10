import { useEffect, useState } from 'react';
<<<<<<< HEAD
import TownController from '../TownController';
import { NoteTakingArea, NoteTakingAreaUpdateCommand } from '../../types/CoveyTownSocket';
=======
import { NoteTakingArea } from '../../types/CoveyTownSocket';
>>>>>>> 581de96 (almost done implemented the controller)
import PlayerController from '../PlayerController';
import InteractableAreaController, {
  BaseInteractableEventMap,
  NOTE_TAKING_AREA_TYPE,
} from './InteractableAreaController';

/**
 * The events that the NoteTakingAreaController emits to subscribers. These events
 * are only ever emitted to local components (not to the townService).
 */
export type NoteTakingAreaEvents = BaseInteractableEventMap & {
  notesChange: (newNotes: string) => void;
};

/**
 * A NoteTakingAreaController manages the local behavior of a note-taking area in the frontend,
 * implementing the logic to bridge between the townService's interpretation of note-taking areas and the
 * frontend's. The NoteTakingAreaController emits events when the note-taking area changes.
 */
export default class NoteTakingAreaController extends InteractableAreaController<
  NoteTakingAreaEvents,
  NoteTakingArea
> {
  toInteractableAreaModel(): NoteTakingArea {
    return {
      id: this.id,
      occupants: this.occupants.map(player => player.id),
<<<<<<< HEAD
      notes: this._notes.length > 0 ? this._notes : undefined,
=======
      notes: this._notes,
>>>>>>> 581de96 (almost done implemented the controller)
      type: 'NoteTakingArea',
    };
  }

  protected _updateFrom(newModel: NoteTakingArea): void {
<<<<<<< HEAD
    this._setNotes(newModel.notes);
  }

  public isActive(): boolean {
    return this.occupants.length > 0;
=======
    this._notes = newModel.notes;
  }

  public isActive(): boolean {
    return this.notes.length > 0 && this.occupants.length > 0;
>>>>>>> 581de96 (almost done implemented the controller)
  }

  public get friendlyName(): string {
    return 'Notes';
  }

  public get type(): string {
    return NOTE_TAKING_AREA_TYPE;
  }

  private _notes = '';

  /**
   * Create a new NoteTakingAreaController
   * @param id
   * @param notes
   */
<<<<<<< HEAD
  constructor(id: string, notes: string, townController: TownController) {
    super(id, townController);
=======
  constructor(id: string, notes: string) {
    super(id);
>>>>>>> 581de96 (almost done implemented the controller)
    this._notes = notes;
  }

  /**
   * The notes of the note-taking area. Changing the notes will emit a notesChange event
   */
<<<<<<< HEAD
  private _setNotes(newNotes: string | undefined) {
    if (newNotes === undefined) {
      newNotes = '';
    }
=======
  set notes(newNotes: string) {
>>>>>>> 581de96 (almost done implemented the controller)
    if (this._notes !== newNotes) {
      this.emit('notesChange', newNotes);
    }
    this._notes = newNotes;
  }

  get notes(): string {
    return this._notes;
  }

<<<<<<< HEAD
  /**
   * Sends a command to the server to update the notes content.
   * @param newNotes The new notes content (HTML string).
   */
  public async updateNotes(newNotes: string) {
    const command: NoteTakingAreaUpdateCommand = {
      type: 'NoteTakingAreaUpdate',
      notes: newNotes,
    };
    await this.townController.sendInteractableCommand(this.id, command);
  }

  static fromNoteTakingAreaModel(
    model: NoteTakingArea,
    townController: TownController,
    playerFinder: (PlayerIDs: string[]) => PlayerController[],
  ): NoteTakingAreaController {
    const ret = new NoteTakingAreaController(model.id, model.notes || '', townController);
=======
  static fromNoteTakingAreaModel(
    model: NoteTakingArea,
    playerFinder: (PlayerIDs: string[]) => PlayerController[],
  ): NoteTakingAreaController {
    const ret = new NoteTakingAreaController(model.id, model.notes);
>>>>>>> 581de96 (almost done implemented the controller)
    ret.occupants = playerFinder(model.occupants);
    return ret;
  }
}

export function useNoteTakingAreaNotes(area: NoteTakingAreaController): string {
<<<<<<< HEAD
  const [notes, setNotes] = useState(area.notes || '');
=======
  const [notes, setNotes] = useState(area.notes);
>>>>>>> 581de96 (almost done implemented the controller)

  useEffect(() => {
    area.addListener('notesChange', setNotes);
    return () => {
      area.removeListener('notesChange', setNotes);
    };
  }, [area]);
  return notes || '';
}
