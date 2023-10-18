import React from 'react';

import { DialogContent } from '@/components/Dialog/DialogContent';
import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

import { TeamFormationStepsDialogFooter } from '../../TeamFormationStepsDialogFooter';
import { ColumnConstraintSection } from './Constraints/ColumnConstraintSection';

export function AddConstraintView() {
  const teamFormationStore = useTeamFormationStepsStore();

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="Custom Algorithm Constraints"
      />
      <DialogContent>
        <ColumnConstraintSection />
      </DialogContent>
      <TeamFormationStepsDialogFooter
        onNextClick={teamFormationStore.gotoNextView}
      />
    </>
  );
}
