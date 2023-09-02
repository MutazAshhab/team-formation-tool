import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

import { Button } from '../Buttons';
import { DialogFooter } from '../Dialog/DialogFooter';

interface TeamFormationStepsDialogFooterProps {
  onNextClick: () => void;
}

export function TeamFormationStepsDialogFooter(
  props: TeamFormationStepsDialogFooterProps,
) {
  const teamFormationStore = useTeamFormationStepsStore();

  function handleNextClick() {
    props.onNextClick();
  }

  function handleGoToPreviousClick() {
    teamFormationStore.goToPreviousView();
  }

  return (
    <DialogFooter>
      <div className="flex justify-between items-center">
        <Button
          icon={<ArrowLeftIcon className="h-6 w-6" />}
          iconPosition="left"
          onClick={handleGoToPreviousClick}
        >
          Back
        </Button>

        <Button
          icon={<ArrowRightIcon className="h-6 w-6" />}
          iconPosition="right"
          onClick={handleNextClick}
        >
          Next
        </Button>
      </div>
    </DialogFooter>
  );
}
