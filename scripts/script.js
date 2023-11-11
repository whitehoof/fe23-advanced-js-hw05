import {Card} from "./Classes/Card.js";

const showPosts = async() => {
	try {
		const users = await fetch('https://ajax.test-danit.com/api/json/users')
			.then(dataU => dataU.json());
		const posts = await fetch('https://ajax.test-danit.com/api/json/posts')
			.then(dataP => dataP.json());
		
		document.querySelector('.lds-ripple').remove();
		
		posts.forEach( post => {
			const {name, email} = users.find( el => el.id === post.userId);
			const card= new Card(post.id, name, email, post.title, post.body).render();
		});
		
		document.querySelector('.footer').style.display = 'block';
	} catch (err) {
		console.warn(err)
	}
}

showPosts();
