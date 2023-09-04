import { AlertBox } from '@/components/AlertBoxes/AlertBox';
import { Button } from '@/components/Buttons';
import { DialogContent } from '@/components/Dialog/DialogContent';
import { DialogFooter } from '@/components/Dialog/DialogFooter';
import { DialogHeader } from '@/components/Dialog/DialogHeader';
import {
  useTeamFormationStepsStore,
  views,
} from '@/zustand/useTeamFormationStepsStore';

export function Explainer() {
  const teamFormationStore = useTeamFormationStepsStore();

  function handleDefaultAlgorithmClick() {
    teamFormationStore.gotoView(views.defaultAlgorithmExplainer);
  }

  function handleCustomAlgorithmClick() {
    teamFormationStore.gotoView(views.customAlgorithmExplainer);
  }

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="About the Team Formation Tool"
      />
      <DialogContent>
        <AlertBox variant="info">
          Welcome to our Team Formation Tool! This tool is designed to automate
          the creation of balanced and diverse teams. Whether you&apos;re an
          educator, a project manager, or simply someone looking to form groups,
          our tool has you covered. With just a simple data upload, you can
          either use our default algorithm for quick and balanced team formation
          or customize your own rules to meet specific needs.
          <br />
          <br />
          Choose the Default Algorithm for a quick and balanced team formation
          that considers factors like gender, language, and academic
          performance. Opt for the Custom Algorithm if you have specific
          requirements or constraints you&apos;d like to apply, giving you more
          control over how teams are formed.
        </AlertBox>
      </DialogContent>
      <DialogFooter>
        <div className="flex justify-around items-center">
          <Button onClick={handleDefaultAlgorithmClick}>
            Default Algorithm
          </Button>
          <Button onClick={handleCustomAlgorithmClick}>Custom Algorithm</Button>
        </div>
      </DialogFooter>
    </>
  );
}
