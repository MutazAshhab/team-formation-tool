from fastapi import APIRouter
from typing import List

from app.api.logic.team_formation import default_team_formation
from app.api.types.mapping import AlgorithmDataMapping
from app.api.logic.genetic_solver.solver import genetic_team_formation

router = APIRouter()


@router.post("/default_algorithm/")
async def process_default_team_formation(csv_data: List[List[str]], mapping: AlgorithmDataMapping):
    is_optimal, teams = default_team_formation(csv_data, mapping)

    # only process the genetic team formation if the default algorithm is not optimal
    if not is_optimal:
        teams = genetic_team_formation(csv_data, mapping)

    return {"teams": teams}


@router.post("/custom_algorithm/")
async def process_custom_team_formation(csv_data: List[List[str]], mapping: AlgorithmDataMapping):
    teams = []

    return {"teams": teams}
