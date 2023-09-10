from fastapi import APIRouter
from typing import List

from app.api.logic.team_formation import default_team_formation
from app.api.types.mapping import AlgorithmDataMapping

router = APIRouter()


@router.post("/default_algorithm/")
async def process_default_team_formation(csv_data: List[List[str]], mapping: AlgorithmDataMapping):
    teams = default_team_formation(csv_data, mapping)

    return {"teams": teams}
