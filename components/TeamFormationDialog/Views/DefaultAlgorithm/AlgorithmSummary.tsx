import { Badge } from '@/components/Badge/Badge';
import { useDefaultAlgorithmStore } from '@/zustand/useDefaultAlgorithmStore';

export function DefaultAlgorithmSummary() {
  const defaultAlgorithmStore = useDefaultAlgorithmStore();

  if (
    defaultAlgorithmStore.anxiety.max === null ||
    defaultAlgorithmStore.anxiety.min === null ||
    defaultAlgorithmStore.agreeableness.max === null ||
    defaultAlgorithmStore.agreeableness.min === null
  ) {
    return;
  }

  return (
    <>
      {defaultAlgorithmStore.gender && (
        <>
          <p>
            The
            <Badge>{defaultAlgorithmStore.gender.name}</Badge>
            column will be used and 2 students of the values
            <Badge>{defaultAlgorithmStore.gender.values.join(', ')}</Badge> will
            be included in each team.
          </p>
          <br />
        </>
      )}
      {defaultAlgorithmStore.first_language && (
        <>
          <p>
            The
            <Badge>{defaultAlgorithmStore.first_language.name}</Badge>
            column will be used and 2 students not of the values
            <Badge>
              {defaultAlgorithmStore.first_language.values.join(', ')}
            </Badge>{' '}
            will be included in each team.
          </p>
          <br />
        </>
      )}
      {defaultAlgorithmStore.wam && (
        <>
          <p>
            The
            <Badge>{defaultAlgorithmStore.wam}</Badge>
            column will be used for the values of the students&apos; WAM and the
            largest possible WAM gap in a team will be 20 points.
          </p>
          <br />
        </>
      )}
      {defaultAlgorithmStore.anxiety && (
        <>
          <p>
            The
            <Badge>{defaultAlgorithmStore.anxiety.name}</Badge>
            column will be used for the values of the students&apos; anxiety
            level. Each team will have atleast 1 student with a high anxiety
            level
          </p>
          <br />
        </>
      )}
      {defaultAlgorithmStore.agreeableness && (
        <>
          <p>
            The
            <Badge>{defaultAlgorithmStore.agreeableness.name}</Badge>
            column will be used for the values of the students&apos;
            agreeableness level. Each team will have atleast 1 student with a
            high agreeableness level
          </p>
          <br />
        </>
      )}
    </>
  );
}
