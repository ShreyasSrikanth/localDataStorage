var form = document.getElementById('use-data');

form.addEventListener('submit',addlocalStorage)

function addlocalStorage(e){
    e.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    var obj ={name:name,email:email,phone:phone};

    var userJSON = JSON.stringify(obj);

    localStorage.setItem(email, userJSON);

    var displayDiv = document.getElementById('display-data');

    var ul = document.createElement('ul');

    var li = document.createElement('li');
    li.textContent = 'Name: ' + name + ' Email: ' + email + ' Phone: ' + phone;
    
    // Create a delete button
    var deleteButton = document.createElement('button');
    var editButton = document.createElement('button');

    deleteButton.textContent = 'Delete';
    editButton.textContent='Edit';

    deleteButton.addEventListener('click', delBun);

    function delBun(e) {
        ul.removeChild(li);
        localStorage.removeItem(email)
    }

    editButton.addEventListener('click',editBun);

    function editBun(e) {
        var userData = JSON.parse(localStorage.getItem(email));

        document.getElementById('name').value = userData.name;
        document.getElementById('email').value = userData.email;
        document.getElementById('phone').value = userData.phone;

        localStorage.removeItem(email);
        ul.removeChild(li);
    }
    
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    ul.appendChild(li);
    displayDiv.appendChild(ul);

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';

    alert('User data stored in local storage!');
}