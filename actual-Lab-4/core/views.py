from django.shortcuts import render
from django.shortcuts import redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Teacher, Student

# Create your views here.
def home(request):
    return render(request, 'core/home.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.error(request, 'Invalid credentials')
    return render(request, 'core/login.html')

def logout_view(request):
    logout(request)
    return redirect('home')

@login_required
def dashboard(request):
    context = {
        'total_teachers': Teacher.objects.count(),
        'total_students': Student.objects.count(),
    }
    return render(request, 'core/dashboard.html', context)

# Teacher CRUD
@login_required
def teacher_list(request):
    teachers = Teacher.objects.all()
    return render(request, 'core/teachers.html', {'teachers': teachers})

@login_required
def teacher_create(request):
    if request.method == 'POST':
        teacher = Teacher.objects.create(
            name=request.POST['name'],
            email=request.POST['email'],
            subject=request.POST['subject'],
            phone=request.POST['phone']
        )
        messages.success(request, 'Teacher added successfully')
        return redirect('teacher_list')
    return render(request, 'core/teacher_form.html')

@login_required
def teacher_edit(request, id):
    teacher = get_object_or_404(Teacher, id=id)
    if request.method == 'POST':
        teacher.name = request.POST['name']
        teacher.email = request.POST['email']
        teacher.subject = request.POST['subject']
        teacher.phone = request.POST['phone']
        teacher.save()
        messages.success(request, 'Teacher updated successfully')
        return redirect('teacher_list')
    return render(request, 'core/teacher_form.html', {'teacher': teacher})

@login_required
def teacher_delete(request, id):
    teacher = get_object_or_404(Teacher, id=id)
    teacher.delete()
    messages.success(request, 'Teacher deleted successfully')
    return redirect('teacher_list')

# Student CRUD
@login_required
def student_list(request):
    students = Student.objects.select_related('teacher').all()
    return render(request, 'core/students.html', {'students': students})

@login_required
def student_create(request):
    teachers = Teacher.objects.all()
    if request.method == 'POST':
        student = Student.objects.create(
            name=request.POST['name'],
            email=request.POST['email'],
            course=request.POST['course'],
            age=request.POST['age'],
            teacher_id=request.POST.get('teacher') or None
        )
        messages.success(request, 'Student added successfully')
        return redirect('student_list')
    return render(request, 'core/student_form.html', {'teachers': teachers})

@login_required
def student_edit(request, id):
    student = get_object_or_404(Student, id=id)
    teachers = Teacher.objects.all()
    if request.method == 'POST':
        student.name = request.POST['name']
        student.email = request.POST['email']
        student.course = request.POST['course']
        student.age = request.POST['age']
        student.teacher_id = request.POST.get('teacher') or None
        student.save()
        messages.success(request, 'Student updated successfully')
        return redirect('student_list')
    return render(request, 'core/student_form.html', {'student': student, 'teachers': teachers})

@login_required
def student_delete(request, id):
    student = get_object_or_404(Student, id=id)
    student.delete()
    messages.success(request, 'Student deleted successfully')
    return redirect('student_list')