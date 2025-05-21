document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const formContainer = document.getElementById('formContainer');
    
    if (taskForm) {
        taskForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const taskTitle = document.getElementById('taskTitle').value;
            const taskDescription = document.getElementById('taskDescription').value;

            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    title: taskTitle,
                    body: taskDescription
                })
            })
            .then(response => response.json())
            .then(data => {
                alert("Form submitted successfully! Task ID: " + data.id);
                taskForm.reset();
            })
            .catch(() => {
                alert("Error sending data to the server");
            });
        });
    }
});
