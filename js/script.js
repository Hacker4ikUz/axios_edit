let url =  "http://localhost:3001/users"
let cont = document.querySelector('.container')

function react() {
	axios.get(url)
		.then(res => {
			if (res.status == 201 || res.status == 200) {
				reload(res.data)
			}
		})
}

let form = document.forms.add_item
form.onsubmit = (e) => {
    e.preventDefault()
    submit()
    let inps = document.querySelectorAll('.input')

    inps.forEach(el => {
        el.value = ''
    });
}
function submit() {
    let user = {
        id: Math.random()
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        user[key] = value 
    });

    axios.post(url, user) 
        .then(res => {
            if(res.status ===  200 || res.status ===  201) {
                react()
            }
        })
        .catch(err => console.log(err))
}

function reload(arr) {
	let left = document.querySelector('.left')
	let cent = document.querySelector('.center')
	let right = document.querySelector('.right')
	left.innerHTML = ''
	cent.innerHTML = ''
	right.innerHTML = ''
	for (let item of arr) {
		let hr = document.createElement('hr')
		let arr25 = []
		let arr50 = []
		let arrother = []
		if(item.age < 26){
			arr25.push(item)
		}
		if(item.age > 26 && item.age < 51){
			arr50.push(item)
		}
		if(item.age > 51){
			arrother.push(item)
		}
		for(let ileft of arr25){
			left.innerHTML += `
            <div class="item" id="${ileft.id}">
                <h3>${ileft.name}</h3>
                <div class="age">
                    <p>Age</p> 
                    <p>${ileft.age}</p>
                </div>
                <div class="flex">
                    <button class="del">Delete</button>
                    <button class="edit">Edit</button>
                </div>
            </div>
            `
		}
		for(let icent of arr50){
			cent.innerHTML += `
            <div class="item" id="${icent.id}">
                <h3>${icent.name}</h3>
                <div class="age">
                    <p>Age</p> 
                    <p>${icent.age}</p>
                </div>
                <div class="flex">
                    <button class="del">Delete</button>
                    <button class="edit">Edit</button>
                </div>
            </div>
            `
		}
		for(let iright of arrother){
			right.innerHTML += `
            <div class="item" id="${iright.id}">
                <h3>${iright.name}</h3>
                <div class="age">
                    <p>Age</p> 
                    <p>${iright.age}</p>
                </div>
                <div class="flex">
                    <button class="del">Delete</button>
                    <button class="edit">Edit</button>
                </div>
            </div>
            `
		}
		let editBtn = document.querySelectorAll('.edit')
		editBtn.forEach(el => {
			el.onclick = (event) => {
				let n = prompt('Your name: ')
				let agee = prompt('Your age: ')
				let id = event.target.parentNode.parentNode.id
				axios.patch(`${url}/${id}`, {
					id: Math.random(),
					name: n,
					age: agee
				})
				.then(res => {
					console.log(res)
					if(res.status === 200 || res.status === 201) {
						react()
					}
				})
				.catch(err => console.log(err))

			}
		})
		let delbtn = document.querySelectorAll('.del')
		delbtn.forEach(elem => {
			elem.onclick = (e) => {
				let id = e.target.parentNode.parentNode.id
				del(id)
			}
		})
	}
}

// edit item
// function editItem(id) {
// 	axios.patch(`${url}/${id}`, {
// 		id: Math.random(),
// 		name: 'Edited',
// 		age: 1
// 	})
// 	.then(res => {
// 		console.log(res)
// 		if(res.status === 200 || res.status === 201) {
// 			react()
// 		}
// 	})
// 	.catch(err => console.log(err))
// }

// delete item
function del(id) {
	axios.delete(`${url}/${id}`)
	.then(res => {
		console.log(res)
		if(res.status === 200 || res.status === 201) {
			react()
		}
	})
	.catch(err => console.log(err))
}


react()

