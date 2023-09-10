from fastapi import FastAPI
from app.api.endpoints import default_algorithm
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(default_algorithm.router)

# TODO: make this more secure once deployed. See https://fastapi.tiangolo.com/tutorial/cors/
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can also specify particular origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"hi": ":)"}
