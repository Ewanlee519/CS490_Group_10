import NoteTakingAreaController from '../../controllers/interactables/NoteTakingAreaController';
import { BoundingBox } from '../../../types/CoveyTownSocket';
import Interactable, { KnownInteractableTypes } from '../Interactable';

export default class NoteTakingArea extends Interactable {
    private _noteTakingArea?: NoteTakingAreaController;

    getType(): KnownInteractableTypes {
        return 'noteTakingArea';
    }

    removedFromScene(): void {
        // No-op
    }

    addedToScene(): void {
        super.addedToScene();
    }

    overlap(): void {
        // No-op
    }

    overlapExit(): void {
        // No-op
    }
}