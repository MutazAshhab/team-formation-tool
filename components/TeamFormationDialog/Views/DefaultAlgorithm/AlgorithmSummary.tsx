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
      <h3>Algorithm Settings Summary</h3>
      <p>
        The team formation algorithm is configured with the following criteria
        to ensure diverse and balanced teams:
      </p>
      {defaultAlgorithmStore.gender && (
        <li>
          <strong>
            Gender Diversity (Column: {defaultAlgorithmStore.gender.name}
            ):
          </strong>{' '}
          At least one member of the gender{' '}
          {defaultAlgorithmStore.gender.values.join(', ')} is required in each
          team.
        </li>
      )}
      {defaultAlgorithmStore.first_language && (
        <li>
          <strong>
            Language Diversity (Column:{' '}
            {defaultAlgorithmStore.first_language.name}):
          </strong>{' '}
          Teams will include members with different first languages,
          prioritizing those who do not speak{' '}
          {defaultAlgorithmStore.first_language.values.join(', ')} as their
          first language.
        </li>
      )}
      {defaultAlgorithmStore.wam && (
        <li>
          <strong>
            WAM (Weighted Average Mark) (Column: {defaultAlgorithmStore.wam}
            ):
          </strong>{' '}
          The algorithm will consider the WAM score for each student to ensure
          academic diversity within the teams.
        </li>
      )}
      {defaultAlgorithmStore.anxiety && (
        <li>
          <strong>
            Anxiety Level (Column: {defaultAlgorithmStore.anxiety.name}):
          </strong>{' '}
          Each team will have at most one member with high anxiety, defined as a
          score of{' '}
          {Math.ceil(
            (defaultAlgorithmStore.anxiety.max -
              defaultAlgorithmStore.anxiety.min) *
              0.75 +
              defaultAlgorithmStore.anxiety.min,
          )}{' '}
          or above on a scale of {defaultAlgorithmStore.anxiety.min} to{' '}
          {defaultAlgorithmStore.anxiety.max}.
        </li>
      )}
      {defaultAlgorithmStore.agreeableness && (
        <li>
          <strong>
            Agreeableness (Column: {defaultAlgorithmStore.agreeableness.name}):
          </strong>{' '}
          Each team is required to have at least one member with high
          agreeableness, defined as a score of{' '}
          {Math.ceil(
            (defaultAlgorithmStore.agreeableness.max -
              defaultAlgorithmStore.agreeableness.min) *
              0.75 +
              defaultAlgorithmStore.agreeableness.min,
          )}{' '}
          or above on a scale of {defaultAlgorithmStore.agreeableness.min} to{' '}
          {defaultAlgorithmStore.agreeableness.max}.
        </li>
      )}
    </>
  );
}
