import csv
import json
import pandas as pd
import pulp

from app.api.types.mapping import AlgorithmDataMapping


def default_team_formation(csv_file, column_mapping: AlgorithmDataMapping):
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

    # Create a binary variable to state that a student is assigned to a particular team
    x = pulp.LpVariable.dicts("student_team",
                              ((student, team) for student in range(num_students)
                               for team in range(num_teams)),
                              cat='Binary')

    # Initialize the model
    model = pulp.LpProblem("Team_Formation", pulp.LpMaximize)

    # Objective function: For simplicity, let's try to maximize the number of students assigned to teams
    model += pulp.lpSum(x[student, team]
                        for student in range(num_students) for team in range(num_teams))

    # Constraints

    # Each student is assigned to exactly one team
    for student in range(num_students):
        model += pulp.lpSum(x[student, team] for team in range(num_teams)) == 1

    # Each team has exactly 5 members
    for team in range(num_teams):
        model += pulp.lpSum(x[student, team]
                            for student in range(num_students)) == 5

    # At least 2 'diverse' genders in each team
    diverse_gender_values = column_mapping.gender.values
    for team in range(num_teams):
        model += pulp.lpSum(x[student, team] for student in range(num_students)
                            if data.iloc[student][gender_col] not in diverse_gender_values) >= 2

    # At least 2 non-English speakers in each team
    english_speaking_values = column_mapping.first_language.values
    for team in range(num_teams):
        model += pulp.lpSum(x[student, team] for student in range(num_students)
                            if data.iloc[student][first_language_col] not in english_speaking_values) >= 2

    # WAM constraints
    data[wam_col] = pd.to_numeric(data[wam_col], errors="raise")
    for team in range(num_teams):
        for student in range(num_students):
            for other_student in range(student+1, num_students):
                if abs(data.iloc[student][wam_col] - data.iloc[other_student][wam_col]) > 20:
                    model += x[student, team] + x[other_student, team] <= 1

    # At least one agreeable member in each team
    for team in range(num_teams):
        model += pulp.lpSum(x[student, team] for student in range(num_students)
                            if data.iloc[student][agreeableness_col] == "TRUE") >= 1

    # TODO: data.iloc[student][agreeability_col] == True is it true or is it a score?

    # No more than one high anxiety member in each team
    for team in range(num_teams):
        model += pulp.lpSum(x[student, team] for student in range(num_students)
                            if data.iloc[student][anxiety_col] == 'High') <= 1

    # TODO: data.iloc[student][agreeability_col] == high is it low, medium, or high or is it a score

    # Solve the model
    model.solve()

    # Prepare the results
    teams = {}
    for team in range(num_teams):
        teams[f"Team {team + 1}"] = [data.iloc[student].to_dict()
                                     for student in range(num_students) if x[student, team].varValue == 1]

    return teams
