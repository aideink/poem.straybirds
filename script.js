document.addEventListener('DOMContentLoaded', function() {
    const poemList = document.getElementById('poemList');
    const poemContent = document.getElementById('poemContent');

    // Create theme filters
    const themes = [...new Set(poems.map(poem => poem.theme))];
    createThemeFilters(themes);

    // Populate the poem list
    poems.forEach(poem => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#poem-' + poem.id;
        a.textContent = `${poem.title}`;
        a.dataset.theme = poem.theme;
        a.style.borderLeft = `4px solid ${themeColors[poem.theme]}`;
        
        a.addEventListener('click', (e) => {
            e.preventDefault();
            displayPoem(poem);
            
            // Remove active class from all links
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to clicked link
            a.classList.add('active');
        });
        li.appendChild(a);
        poemList.appendChild(li);
    });

    // Function to create theme filters
    function createThemeFilters(themes) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'theme-filters';
        
        const allThemesBtn = document.createElement('button');
        allThemesBtn.textContent = 'All';
        allThemesBtn.className = 'theme-btn active';
        allThemesBtn.addEventListener('click', () => filterPoems('all'));
        filterContainer.appendChild(allThemesBtn);

        themes.forEach(theme => {
            const button = document.createElement('button');
            button.textContent = theme;
            button.className = 'theme-btn';
            button.style.backgroundColor = themeColors[theme];
            button.addEventListener('click', () => filterPoems(theme));
            filterContainer.appendChild(button);
        });

        document.querySelector('nav').prepend(filterContainer);
    }

    // Function to filter poems by theme
    function filterPoems(theme) {
        const poems = document.querySelectorAll('nav ul li a');
        const buttons = document.querySelectorAll('.theme-btn');

        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        poems.forEach(poem => {
            const li = poem.parentElement;
            if (theme === 'all' || poem.dataset.theme === theme) {
                li.style.display = '';
                li.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                li.style.display = 'none';
            }
        });
    }

    // Function to display a poem with animation
    function displayPoem(poem) {
        // First, fade out the current content
        poemContent.style.opacity = '0';
        
        setTimeout(() => {
            poemContent.innerHTML = `
                <div class="poem-header">
                    <h3>${poem.title}</h3>
                    <div class="poem-meta">
                        <span class="poem-number">Poem ${poem.id}</span>
                        <span class="poem-theme" style="background-color: ${themeColors[poem.theme]}">${poem.theme}</span>
                        <span class="poem-date">${poem.date}</span>
                    </div>
                </div>
                <div class="poem-text">
                    ${poem.text.split('\n').map(line => `<p>${line}</p>`).join('')}
                </div>
            `;
            
            // Fade in the new content
            poemContent.style.opacity = '1';
        }, 300);
    }
}); 