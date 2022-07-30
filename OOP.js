// Initializing a Contact ------------------------------------------------

class Contact {
    constructor (name, place, number){
        this.name = name;
        this.place = place;
        this.number = number;
    }

}


// chaning the interface --------------------------------------------------

class Display {

    static displayContacts() {
        
       
        let contactList = Storage.renderStorage();

       

        contactList.forEach(contact => {
            Display.addToList(contact)
        })

    }


    static addToList(contact) {
        

        let newNumber = document.createElement('tr')

        newNumber.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.place}</td>
            <td>${contact.number}<i class="bi bi-trash3-fill"></i></td>
            `

        const table = document.getElementById('table')

        table.append(newNumber)
       
    }
    static removeFromList(event) {
        

        let clicked = event.target; 

        clicked.parentElement.parentElement.remove();


        // console.log(clicked)
    }

    static showMessage(color, DisplayMessage) {
        const message = document.querySelector('.phonebook .message')

        message.style.display = 'block';
        message.style.backgroundColor = color;
        message.innerText = DisplayMessage;

        setInterval(()=> {
            message.style.display = 'none';
        }, 3000)
        
    }

    static clearContent(username, place, num) {
        username.value = ''
        place.value = ''
        num.value = ''
    }
}


// storing items ----------------------------------------------------------

class Storage {
    
    static renderStorage() {
        let contactList;
        let storage = JSON.parse(localStorage.getItem('storage'))

       if(storage) {
            contactList = storage
        } else {
            contactList = []
        }

        return contactList
    }

    static addToStorage(contact) {

       

        let contactList = Storage.renderStorage()

       
        contactList.push(contact)

        localStorage.setItem('storage', JSON.stringify(contactList))
    }

    static removeFromStorage(num) {

        // console.log(num)
        let storage = Storage.renderStorage()

        let newList = storage.filter(item => {
            return item.number != num;
        })

        localStorage.setItem('storage', JSON.stringify(newList))
    }
}




// document initial loading

document.addEventListener('DOMContentLoaded', Display.displayContacts)

// Event Handling


// add button event

const submit = document.getElementById('add-btn')

submit.onclick = ()=> {
    // add new item

    const userName = document.getElementById('name')
    const place = document.getElementById('place')
    const tel = document.getElementById('tel')

    // validation

    if(userName.value.trim() == '' || place.value.trim() == '' || tel.value.trim() == '') {

        Display.showMessage('red', 'Please fill all the boxes')
        
    } else {

        // renderring memory

        Display.showMessage('red', 'Please fill all the boxes')
        let stored = Storage.renderStorage();

        stored.forEach(item => {

            // checking if number exists
            
            if(item. number == tel.value.trim()) {

                Display.showMessage('red', `That number ${tel.value.trim()} already exist`)
                Display.clearContent(userName, place, tel);

            } else {

                // creating new contact object

                const contact = new Contact(userName.value.trim(), place.value.trim(), tel.value.trim())

                Display.addToList(contact)

                Display.showMessage('green', 'Contact Added')

                Display.clearContent(userName, place, tel);

                Storage.addToStorage(contact)
            }
        })

        
    }

}

// delete button event


const listContainer = document.querySelector('.list-container')

listContainer.onclick = (event)=> {


    if (event.target.classList.contains('bi-trash3-fill')) {
        Display.removeFromList(event)
        Display.showMessage('blue', 'Contact Deleted')
        Storage.removeFromStorage(event.target.parentElement.innerText)
    }
}



