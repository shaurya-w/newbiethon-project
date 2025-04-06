document.addEventListener('DOMContentLoaded', () => {
    const stories = [
      { id: 1, title: "The Forgotten Melody", author: "Sarah_567", cover: "images/melody.jpg" },
      { id: 2, title: "City of Secrets", author: "David_23", cover: "images/city.jpg" },
      { id: 3, title: "The Enchanted Library", author: "Sarah_12", cover: "images/library.jpg" },
      { id: 4, title: "Whispers in the Woods", author: "Lily_James", cover: "images/woods.jpg" },
      { id: 5, title: "The Haunted Castle", author: "Sofia", cover: "images/castle.jpg" }
    ];

    let continueReading = JSON.parse(localStorage.getItem('continueReading')) || null;
    let readList = JSON.parse(localStorage.getItem('readList')) || [];

    const topStoriesSection = document.querySelector('.top-stories');
    const continueReadingSection = document.querySelector('.cr-grid');

    const renderStoryCard = (story, container) => {
      const div = document.createElement('div');
      div.className = 'story';
      div.innerHTML = `
        <img src="${story.cover}" alt="${story.title}">
        <h3>${story.title}</h3>
        <p>Author: ${story.author}</p>
        <div class="actions">
          <button onclick="readStory(${story.id})">Read</button>
          <button class="like-btn" data-id="${story.id}">❤️</button>
          <button class="add-btn" data-id="${story.id}">${readList.includes(story.id) ? '✅' : '➕'}</button>
        </div>
      `;
      container.appendChild(div);
    };

    topStoriesSection.innerHTML = '';
    stories.slice(0, 4).forEach(story => renderStoryCard(story, topStoriesSection));

    continueReadingSection.innerHTML = '';
    if (continueReading !== null) {
      const story = stories.find(s => s.id === continueReading);
      if (story) renderStoryCard(story, continueReadingSection);
    }

    window.readStory = function(id) {
      continueReading = id;
      localStorage.setItem('continueReading', JSON.stringify(continueReading));
      
      const story = stories.find(s => s.id === id);
      if (story) {
        continueReadingSection.innerHTML = '';
        renderStoryCard(story, continueReadingSection);
      }

      window.location.href = `read.html?id=${id}`;
    };

    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('like-btn')) {
        e.target.classList.toggle('liked');
      }

      if (e.target.classList.contains('add-btn')) {
        const storyId = parseInt(e.target.getAttribute('data-id'));
        if (!readList.includes(storyId)) {
          readList.push(storyId);
          e.target.textContent = '✅';
        } else {
          readList = readList.filter(id => id !== storyId);
          e.target.textContent = '➕';
        }
        localStorage.setItem('readList', JSON.stringify(readList));
      }
    });
  });
