export class Card {
	constructor(cardId, userName, userEmail, title, text) {
		this.cardId = cardId;
		this.userName = userName;
		this.userEmail = userEmail;
		this.title = title;
		this.text = text;
	}
	
	render() {
		const card = document.createElement('div');
		card.classList.add('card');
		card.setAttribute('id', `card-${this.cardId}`);
		
		const cardHeader = document.createElement('p');
		cardHeader.classList.add('card__header');
		
		const cardHeaderAuthor = document.createElement('span');
		cardHeaderAuthor.classList.add('card__header--author');
	
		const cardHeaderId = document.createElement('span');
		cardHeaderId.classList.add('card__header--id');
		cardHeaderId.innerText = `#${this.cardId}`;

		const cardHeaderAuthorName = document.createElement('span');
		cardHeaderAuthorName.classList.add('card__header--author_name');
		cardHeaderAuthorName.innerText = this.userName;
		
		const cardHeaderEmail = document.createElement('span');
		cardHeaderEmail.classList.add('card__header--author_email');
		cardHeaderEmail.innerHTML = `<a href="mailto:${this.userEmail}">${this.userEmail}</a>`;
		
		const cardHeaderButtons = document.createElement('span');
		cardHeaderButtons.classList.add('card__header--buttons');
		
		const cardHeaderButtonDelete = document.createElement('span');
		cardHeaderButtonDelete.classList.add('card__header--button');
		cardHeaderButtonDelete.classList.add('card__header--button_delete');
		cardHeaderButtonDelete.innerText = `❌`;
		cardHeaderButtonDelete.addEventListener('click', this.delete);
		
		const cardTitle = document.createElement('h3');
		cardTitle.classList.add('card__title');
		cardTitle.innerText = this.title;
		
		const cardText = document.createElement('h3');
		cardText.classList.add('card__text');
		cardText.innerText = this.text;
		
		card.append(cardHeader);
		cardHeader.append(cardHeaderAuthor);
		cardHeaderAuthor.append(cardHeaderId, cardHeaderAuthorName, cardHeaderEmail);
		cardHeader.append(cardHeaderButtons);
		cardHeaderButtons.append(cardHeaderButtonDelete);
		card.append(cardTitle);
		card.append(cardText);
		document.querySelector('#cards-container').prepend(card);
	}
	
	async delete(event) {
		try {
			const postId = +event.target.closest(`.card`).getAttribute('id').split("-")[1];
			const deleting = await fetch(`https://ajax.test-danit.com/api/json/posts/${postId}`, {method: "DELETE"})
				.then(res => res.text());
			console.log(deleting);
			document.querySelector(`#card-${postId}`).remove();
		} catch (err) {
			console.warn(err)
		}
	}
	
	edit() {
		//
	}
}