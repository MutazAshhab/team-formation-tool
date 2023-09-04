import { AlertBox } from '@/components/AlertBoxes/AlertBox';
import { DialogContent } from '@/components/Dialog/DialogContent';
import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

import { TeamFormationStepsDialogFooter } from '../TeamFormationStepsDialogFooter';

export function CustomAlgorithmExplainer() {
  const teamFormationStore = useTeamFormationStepsStore();

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="How to Customize Your Team Formation"
      />
      <DialogContent>
        <AlertBox variant="info">
          Want more control over your teams? Our custom algorithm lets you
          tailor the team formation to your specific needs. You can select which
          data columns to use and apply your own constraints. Whether you want
          at least one team member to have taken a specific elective or
          you&apos;re looking to limit the number of extroverted individuals in
          a team, you have the freedom to set it all up.
          <br />
          <br />
          Just match the data columns to your desired factors, add any extra
          rules, and let the algorithm create the perfect teams for you!
        </AlertBox>
      </DialogContent>
      <TeamFormationStepsDialogFooter
        onNextClick={teamFormationStore.gotoNextView}
      />
    </>
  );
}
