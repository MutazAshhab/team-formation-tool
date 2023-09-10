from deap import base, creator, tools, algorithms
import random

import pandas as pd

from app.api.types.mapping import AlgorithmDataMapping


def split_into_teams(individual, num_teams):
    teams = [[] for _ in range(num_teams)]
    for i, team_num in enumerate(individual):
        teams[team_num].append(i)
    return teams


def get_team_data(data, team):
    team_data = []
    for student_index in team:
        student_data = data.iloc[student_index]
        team_data.append(student_data)
    return team_data


def calculate_team_diversity(team, mapping: AlgorithmDataMapping):
    scores = [
        gender_score(team, mapping),
        language_score(team, mapping),
        wam_score(team, mapping),
        agreeability_score(team, mapping),
        anxiety_score(team, mapping)
    ]

    return sum(scores)


def gender_score(team, mapping: AlgorithmDataMapping):
    gender_col = mapping.gender.name

    diverse_gender_count = sum(
        1 for student in team if student[gender_col] in mapping.gender.values)

    if diverse_gender_count >= 2:
        return 1
    elif diverse_gender_count == 1:
        return 0.5

    return 0


def language_score(team, mapping: AlgorithmDataMapping):
    first_language_col = mapping.first_language.name

    non_english_speakers = sum(
        1 for student in team if student[first_language_col] not in mapping.first_language.values)

    if non_english_speakers >= 2:
        return 1
    return 0


def wam_score(team, mapping: AlgorithmDataMapping):
    wam_col = mapping.wam

    wams = [student[wam_col] for student in team]

    max_wam_diff = max(wams) - min(wams) if len(wams) > 0 else 100

    if max_wam_diff <= 20:
        return 1
    return 0


def agreeability_score(team, mapping: AlgorithmDataMapping):
    agreeability_col = mapping.agreeableness.name

    agreeableness_min = mapping.agreeableness.min
    agreeableness_max = mapping.agreeableness.max

    # Calculate the 75% thresholds
    high_agreeableness_threshold = (
        agreeableness_max - agreeableness_min) * 0.75 + agreeableness_min

    agreeable_members = sum(
        1 for student in team if student[agreeability_col] > high_agreeableness_threshold)

    if agreeable_members >= 1:
        return 1
    return 0


def anxiety_score(team, mapping: AlgorithmDataMapping):
    anxiety_col = mapping.anxiety.name

    anxiety_min = mapping.anxiety.min
    anxiety_max = mapping.anxiety.max

    # Calculate the 75% thresholds
    high_anxiety_threshold = (anxiety_max - anxiety_min) * 0.75 + anxiety_min

    high_anxiety_members = sum(
        1 for student in team if student[anxiety_col] > high_anxiety_threshold)

    if high_anxiety_members <= 1:
        return 1
    return 0


def genetic_team_formation(csv_file, column_mapping: AlgorithmDataMapping):
    # Read the CSV file into a DataFrame
    data = pd.DataFrame(csv_file[1:], columns=csv_file[0])
    num_students = len(data)
    num_teams = num_students // 5  # Assuming teams of 5

    # Use mapped column names
    wam_col = column_mapping.wam
    anxiety_col = column_mapping.anxiety.name
    agreeableness_col = column_mapping.agreeableness.name

    # Convert the data to the correct types
    data[wam_col] = pd.to_numeric(data[wam_col], errors="raise")
    data[anxiety_col] = pd.to_numeric(data[anxiety_col], errors="raise")
    data[agreeableness_col] = pd.to_numeric(
        data[agreeableness_col], errors="raise")

    # Initialize DEAP
    creator.create("FitnessMax", base.Fitness, weights=(1.0,))
    creator.create("Individual", list, fitness=creator.FitnessMax)

    toolbox = base.Toolbox()

    # Attribute generator
    toolbox.register("attr_int", random.randint, 0, num_teams-1)

    # Structure initializers
    toolbox.register("individual", tools.initRepeat,
                     creator.Individual, toolbox.attr_int, num_students)
    toolbox.register("population", tools.initRepeat, list, toolbox.individual)

    # Evaluation function
    def evalTeams(individual):
        total_score = 0

        # Split the individual into teams
        teams = split_into_teams(individual, num_teams)

        # Calculate the diversity score for each team
        for team in teams:
            team_data = get_team_data(data, team)
            total_score += calculate_team_diversity(team_data, column_mapping)

        return total_score,

    toolbox.register("mate", tools.cxTwoPoint)
    toolbox.register("mutate", tools.mutUniformInt,
                     low=0, up=num_teams-1, indpb=0.2)
    toolbox.register("select", tools.selTournament, tournsize=3)
    toolbox.register("evaluate", evalTeams)

    # Create an initial population of 300 individuals
    population = toolbox.population(n=300)

    # Number of generations
    ngen = 40

    # Probability of mating two individuals
    cxpb = 0.5

    # Probability of mutating an individual
    mutpb = 0.2

    # The algorithm
    algorithms.eaSimple(population, toolbox, cxpb, mutpb,
                        ngen, stats=None, halloffame=None, verbose=True)

    # Extract the best individual
    best_ind = tools.selBest(population, 1)[0]
    best_teams = [[] for _ in range(num_teams)]
    for i, team_number in enumerate(best_ind):
        best_teams[team_number].append(data.iloc[i].to_dict())

    return best_teams
