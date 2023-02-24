from apscheduler.schedulers.background import BlockingScheduler
import papermill as pm
import os

def job(data):
    print("start")
    pm.execute_notebook(
   './execute.ipynb',
   './execute1.ipynb'
    )
    print(data)


def main():
    sched = BlockingScheduler()
    sched.add_job(job,'interval', seconds=60*60*24,id='test', args=['end'])
    sched.start()

if __name__ == "__main__":
    main()