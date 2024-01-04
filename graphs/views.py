from django.shortcuts import render
import datetime

def index(request):
    current_time = datetime.datetime.now()
    context = {'current_time': current_time}
    return render(request, 'graphs.html', context)
