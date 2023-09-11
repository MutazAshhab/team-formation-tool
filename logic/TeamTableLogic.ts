export const TeamTableLogic = {
  convertResponseTo2dArray,
};

function addTeamNumberToRecords(
  records: Record<string, string>[][],
): Record<string, string>[][] {
  return records.map((team, teamIndex) => {
    const teamNumber = (teamIndex + 1).toString(); // Convert team number to string
    return team.map(record => {
      return { 'Team number': teamNumber, ...record }; // Add "team number" key to each record
    });
  });
}

function convertRecordsTo2dStringArray(
  records2dArray: Record<string, string>[][],
): string[][] {
  const result: string[][] = [];

  const header = Object.keys(records2dArray[0][0]);

  result.push(header);

  for (const arrayOfRecords of records2dArray) {
    for (const record of arrayOfRecords) {
      const values = Object.values(record);
      result.push(values);
    }
  }

  return result;
}

function convertResponseTo2dArray(
  teamsFromResposne: Record<string, string>[][],
) {
  const teamsWithTeamNumber = addTeamNumberToRecords(teamsFromResposne);
  const teams2dArray = convertRecordsTo2dStringArray(teamsWithTeamNumber);

  return teams2dArray;
}
