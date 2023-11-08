"use strict"

const showPosts = async() => {
	try {
		const users = await fetch('https://ajax.test-danit.com/api/json/users')
			.then(data => data.json());
		const posts = await fetch('https://ajax.test-danit.com/api/json/posts')
			.then(data => data.json());

		posts.forEach( post => {
			const {name, email} = users.find( el => el.id === post.userId);

			document.querySelector('#cards-container').insertAdjacentHTML("afterbegin", `
				<div class="card" id="card-${post.id}">
					<p class="card__header">
						<span class="card__header--author">
							<span class="card__header--id">#${post.id}</span>
							<span class="card__header--author_name">${name}</span>
							<span class="card__header--author_email"><a href="mailto:${email}">${email}</a></span>
						</span>
						<span class="card__header--buttons">
							<span class="card__header--button card__header--button_edit">✏️</span>
							<span class="card__header--button card__header--button_delete">❌</span>
						</span>
					</p>
					<h3 class="card__title">${post.title}</h3>
					<p class="card__text">${post.body}</p>
				</div>`
			);

		})
	} catch (err) {
		console.warn(err)
	}
}

showPosts()