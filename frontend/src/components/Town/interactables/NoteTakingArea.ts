import NoteTakingAreaController, {
  NoteTakingAreaEvents,
} from '../../../classes/interactable/NoteTakingAreaController';
import Interactable, { KnownInteractableTypes } from '../Interactable';

export default class NoteTakingArea extends Interactable {
  private _labelText?: Phaser.GameObjects.Text;

  private _isInteracting = false;

  private _noteTakingArea?: NoteTakingAreaController;

  private _changeListener?: NoteTakingAreaEvents['notesChange'];

  getType(): KnownInteractableTypes {
    return 'noteTakingArea';
  }

  addedToScene() {
    super.addedToScene();
    this.setTintFill();
    this.setAlpha(0.3);
    this.setDepth(-1);
    this.scene.add.text(
      this.x - this.displayWidth / 2,
      this.y + this.displayHeight / 2,
      this.name,
      { color: '#FFFFFF', backgroundColor: '#000000' },
    );
    this._labelText = this.scene.add.text(
      this.x - this.displayWidth / 2,
      this.y - this.displayHeight / 2,
      `Press space to take notes`,
      { color: '#FFFFFF', backgroundColor: '#000000' },
    );
    this._noteTakingArea = this.townController.getNoteTakingAreaController(this);
    //this._updateLabelText(this._noteTakingArea.notes);
    this._changeListener = newNotes => this._updateLabelText(newNotes);
    //this._noteTakingArea.addListener('notesChange', this._changeListener);
  }

  private _updateLabelText(newNotes: string) {
    this._labelText?.setText(newNotes);
  }

  removedFromScene(): void {
    if (this._changeListener) {
      this._noteTakingArea?.removeListener('notesChange', this._changeListener);
    }
  }

  interact(): void {
    this._labelText?.setVisible(false);
    this._isInteracting = true;
  }

  overlap(): void {
    if (!this._labelText) {
      throw new Error('Should not be able to overlap with this interactable before added to scene');
    }
    const location = this.townController.ourPlayer.location;
    this._labelText.setX(location.x);
    this._labelText.setY(location.y);
    this._labelText.setVisible(true);
  }

  overlapExit(): void {
    this._labelText?.setVisible(false);
    if (this._isInteracting) {
      this.townController.interactableEmitter.emit('endInteraction', this);
      this._isInteracting = false;
    }
  }
}
