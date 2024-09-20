document.getElementById('influencerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const influencer = document.getElementById('influencerSelect').value;

    try {
        const response = await fetch(`/news?name=${influencer}&q=73f28138b553`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const newsContainer = document.getElementById('newsContainer');
        newsContainer.innerHTML = '';

        data.forEach(newsItem => {
            const newsElement = document.createElement('div');
            newsElement.classList.add('bg-white', 'shadow-lg', 'rounded-lg', 'p-6', 'space-y-4');

            const textElement = document.createElement('p');
            textElement.classList.add('text-gray-800', 'text-lg');
            textElement.textContent = newsItem.text;

            const imagesContainer = document.createElement('div');
            imagesContainer.classList.add('flex', 'space-x-2');

            if (Array.isArray(newsItem.imageUrls)) {
                newsItem.imageUrls.forEach(imageUrl => {
                    const thumbnailElement = document.createElement('img');
                    thumbnailElement.classList.add('w-24', 'h-24', 'rounded-lg', 'object-cover', 'cursor-pointer');
                    thumbnailElement.src = imageUrl;

                    thumbnailElement.addEventListener('click', () => {
                        document.getElementById('modalImage').src = imageUrl;
                        document.getElementById('imageModal').classList.remove('hidden');
                    });

                    imagesContainer.appendChild(thumbnailElement);
                });
            } else {
                const noImagesMessage = document.createElement('p');
                noImagesMessage.classList.add('text-gray-500');
                noImagesMessage.textContent = '没有图片';
                imagesContainer.appendChild(noImagesMessage);
            }

            newsElement.appendChild(textElement);
            newsElement.appendChild(imagesContainer);

            newsContainer.appendChild(newsElement);
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        const newsContainer = document.getElementById('newsContainer');
        newsContainer.innerHTML = '<p class="text-red-500">无法加载新闻，请稍后再试。</p>';
    }
});

// 关闭弹窗
document.getElementById('imageModal').addEventListener('click', function () {
    this.classList.add('hidden');
});
