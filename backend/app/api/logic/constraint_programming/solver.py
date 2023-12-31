import pandas as pd
from ortools.sat.python import cp_model

from app.api.types.mapping import AlgorithmDataMapping


def constraint_programming(csv_file, column_mapping: AlgorithmDataMapping):
    # Read the CSV file into a DataFrame
    data = pd.DataFrame(csv_file[1:], columns=csv_file[0])

    num_students = len(data)
    num_teams = num_students // 5  # Assuming teams of 5

    # Use mapped column names
    gender_col = column_mapping.gender.name
    first_language_col = column_mapping.first_language.name
    wam_col = column_mapping.wam
    anxiety_col = column_mapping.anxiety.name
    agreeableness_col = column_mapping.agreeableness.name

    # Convert the data to the correct types
    data[wam_col] = pd.to_numeric(data[wam_col], errors="raise")
    data[anxiety_col] = pd.to_numeric(data[anxiety_col], errors="raise")
    data[agreeableness_col] = pd.to_numeric(
        data[agreeableness_col], errors="raise")

    # Initialize the model
    model = cp_model.CpModel()

    # Create variables
    x = {}
    for student in range(num_students):
        for team in range(num_teams):
            x[student, team] = model.NewBoolVar(
                f'student_{student}_team_{team}')

    # Constraints

    # Each student is assigned to exactly one team
    for student in range(num_students):
        model.Add(sum(x[student, team] for team in range(num_teams)) == 1)

    # Each team has exactly 5 members
    for team in range(num_teams):
        model.Add(sum(x[student, team]
                  for student in range(num_students)) == 5)

    # Gender diversity constraint
    gender_values = column_mapping.gender.values
    for team in range(num_teams):
        model.Add(sum(x[student, team] for student in range(
            num_students) if data.iloc[student][gender_col] not in gender_values) >= 2)

    # Language diversity constraint
    first_language_values = column_mapping.first_language.values
    for team in range(num_teams):
        model.Add(sum(x[student, team] for student in range(
            num_students) if data.iloc[student][first_language_col] not in first_language_values) >= 2)

    # High agreeableness constraint
    high_agreeableness_threshold = (column_mapping.agreeableness.max -
                                    column_mapping.agreeableness.min) * 0.75 + column_mapping.agreeableness.min
    for team in range(num_teams):
        model.Add(sum(x[student, team] for student in range(
            num_students) if data.iloc[student][agreeableness_col] >= high_agreeableness_threshold) > 1)

    # At most one high anxiety member in each team
    high_anxiety_threshold = (column_mapping.anxiety.max -
                              column_mapping.anxiety.min) * 0.75 + column_mapping.anxiety.min
    for team in range(num_teams):
        model.Add(sum(x[student, team] for student in range(
            num_students) if data.iloc[student][anxiety_col] > high_anxiety_threshold) <= 1)

    # WAM constraint
    for team in range(num_teams):
        max_wam = model.NewIntVar(0, 100, f'max_wam_team_{team}')
        min_wam = model.NewIntVar(0, 100, f'min_wam_team_{team}')

        for student in range(num_students):
            wam = data.iloc[student][wam_col]
            model.Add(max_wam >= wam).OnlyEnforceIf(x[student, team])
            model.Add(min_wam <= wam).OnlyEnforceIf(x[student, team])

        model.Add(max_wam - min_wam <= 20)

    # Solve the model
    solver = cp_model.CpSolver()
    status = solver.Solve(model)

    match status:
        case cp_model.OPTIMAL:
            print('OPTIMAL')
        case cp_model.FEASIBLE:
            print('FEASIBLE')
        case cp_model.INFEASIBLE:
            print('INFEASIBLE')
        case cp_model.MODEL_INVALID:
            print('MODEL_INVALID')
        case cp_model.UNKNOWN:
            print('UNKNOWN')

    teams = {}

    if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
        # Extract the teams
        for team in range(num_teams):
            teams[f'Team {team + 1}'] = [data.iloc[student].to_dict()
                                         for student in range(num_students) if solver.Value(x[student, team]) == 1]

    return teams
