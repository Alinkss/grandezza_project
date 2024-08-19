document.getElementById('like-img').addEventListener('click', function() {
    var form = document.getElementById('like-form');
    var formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
        }
    })
    .then(response => response.json())
    .then(data => {
        var img = document.getElementById('like-img');
        if (data.liked) {
            img.src = "{% static 'blog/images/like-click.jpg' %}";
        } else {
            img.src = "{% static 'blog/images/like.png' %}";
        }
    })
    .catch(error => console.error('Error:', error));
});