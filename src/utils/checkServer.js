/*
change the https://jsonplaceholder.typicode.com/posts/1 
link to invalid one in order to simulate an error
*/
document.addEventListener('DOMContentLoaded', function() {
    const xhrBtn = document.getElementById('xhrBtn');
    if (xhrBtn) {
        xhrBtn.addEventListener('click', function() {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1');
            xhr.onload = function() {
                const resultDiv = document.getElementById('xhrResult');
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    resultDiv.textContent = `Test server is active`;
                } else {
                    resultDiv.textContent = "Error! Status: " + xhr.status;
                }
            };
            xhr.onerror = function() {
                document.getElementById('xhrResult').textContent =
                    "Request error (check your connection)";
            };
            xhr.send();
        });
    }
});
