from invoke import task

@task
def start(ctx):
    ctx.run("python3 robottikoodieditori_backend/server.py")