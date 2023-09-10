from pydantic import BaseModel
from typing import List


class ColumnAndValues(BaseModel):
    name: str
    values: List[str]


class ColumnAndMinMax(BaseModel):
    name: str
    min: float
    max: float


class AlgorithmDataMapping(BaseModel):
    gender: ColumnAndValues
    first_language: ColumnAndValues
    wam: str
    anxiety: ColumnAndMinMax
    agreeableness: ColumnAndMinMax
