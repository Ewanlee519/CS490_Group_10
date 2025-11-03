import { ITiledMapObject } from '@jonbell/tiled-map-type-guard';
import InvalidParametersError from '../lib/InvalidParametersError';
import Player from '../lib/Player';
import {
  BoundingBox,
  NoteTakingArea as NoteTakingAreaModel,
  InteractableCommand,
  InteractableCommandReturnType,
  TownEmitter,
<<<<<<< HEAD
<<<<<<< HEAD
  NoteTakingAreaUpdateCommand,
=======
>>>>>>> 581de96 (almost done implemented the controller)
=======
  NoteTakingAreaUpdateCommand,
>>>>>>> 8192c98 (removed placeholder and made it so people can both see the notes that are edited. (Not real-time, but after a player closes it))
} from '../types/CoveyTownSocket';
import InteractableArea from './InteractableArea';

export default class NoteTakingArea extends InteractableArea {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8192c98 (removed placeholder and made it so people can both see the notes that are edited. (Not real-time, but after a player closes it))
  public handleCommand<CommandType extends InteractableCommand>(
    command: CommandType,
  ): InteractableCommandReturnType<CommandType> {
    if (command.type === 'NoteTakingAreaUpdate') {
      const updateCommand = command as NoteTakingAreaUpdateCommand;
      this.notes = updateCommand.notes;
      this._emitAreaChanged();
      return undefined as InteractableCommandReturnType<CommandType>;
    }
<<<<<<< HEAD
    throw new InvalidParametersError('Unknown command type');
  }

  /* The notes in the note-taking area */
  public notes?: string;
=======
  public handleCommand<
    CommandType extends InteractableCommand,
  >(): InteractableCommandReturnType<CommandType> {
=======
>>>>>>> 8192c98 (removed placeholder and made it so people can both see the notes that are edited. (Not real-time, but after a player closes it))
    throw new InvalidParametersError('Unknown command type');
  }

  /* The notes in the note-taking area */
<<<<<<< HEAD
  public notes: string;
>>>>>>> 581de96 (almost done implemented the controller)
=======
  public notes?: string;
>>>>>>> 9cb2c58 (area controller done i think)

  /** The note-taking area is "active" when there are players inside of it  */
  public get isActive(): boolean {
    return this._occupants.length > 0;
  }

  /**
   * Creates a new NoteTakingArea
   *
   * @param noteTakingAreaModel model containing this area's current notes and its ID
   * @param coordinates  the bounding box that defines this note-taking area
   * @param townEmitter a broadcast emitter that can be used to emit updates to players
   */
  public constructor(
    { notes, id }: Omit<NoteTakingAreaModel, 'type'>,
    coordinates: BoundingBox,
    townEmitter: TownEmitter,
  ) {
    super(id, coordinates, townEmitter);
    this.notes = notes;
  }

  /**
   * Convert this NoteTakingArea instance to a simple NoteTakingAreaModel suitable for serialization
   */
  public toModel(): NoteTakingAreaModel {
    return {
      id: this.id,
      type: 'NoteTakingArea',
      notes: this.notes,
      occupants: this.occupantsByID,
    };
  }

  public static fromMapObject(
    mapObject: ITiledMapObject,
    broadcastEmitter: TownEmitter,
  ): NoteTakingArea {
    const { name, width, height } = mapObject;
    if (!width || !height) {
      throw new Error(`Malformed viewing area ${name}`);
    }
    const rect: BoundingBox = { x: mapObject.x, y: mapObject.y, width, height };
    return new NoteTakingArea({ id: name, occupants: [], notes: '' }, rect, broadcastEmitter);
  }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 28b737f (got the omit files to auto generate using prestart)

  public remove(player: Player) {
    super.remove(player);
    if (this._occupants.length === 0) {
      this.notes = undefined;
      this._emitAreaChanged();
    }
  }
<<<<<<< HEAD
=======
>>>>>>> 581de96 (almost done implemented the controller)
=======
>>>>>>> 28b737f (got the omit files to auto generate using prestart)
}
