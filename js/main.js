document.addEventListener('DOMContentLoaded', () => {
    // --- 元素获取 ---
    const toolGrid = document.getElementById('tool-grid');
    const searchInput = document.getElementById('searchInput');
    const categoryLinks = document.querySelectorAll('.side-nav nav ul li');
    const navToggle = document.getElementById('nav-toggle');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const sideNav = document.querySelector('.side-nav');
    const container = document.querySelector('.container');
    
    // 检查URL中是否有锚点，用于类别导航
    const checkUrlHash = () => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const categoryLink = document.querySelector(`.side-nav nav ul li[data-category="${hash}"]`);
            if (categoryLink) {
                categoryLinks.forEach(l => l.classList.remove('active'));
                categoryLink.classList.add('active');
                if (toolGrid) {
                    handleFiltering();
                }
            }
        }
    };

    let allTools = []; // 用于存储所有工具的数据

    // --- 数据加载 ---
    async function loadToolData() {
        // 只在首页加载工具数据
        if (!toolGrid) return;
        
        try {
            const response = await fetch('data/tools.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allTools = await response.json();
            initializeApp();
        } catch (error) {
            console.error("无法加载工具数据:", error);
            toolGrid.innerHTML = '<p class="no-results">错误：无法加载工具数据。</p>';
        }
    }

    // --- 核心功能 ---
    function renderToolCards(toolsToRender) {
        if (!toolGrid) return;
        
        toolGrid.innerHTML = '';
        if (toolsToRender.length === 0) {
            toolGrid.innerHTML = '<p class="no-results">未找到匹配的工具。</p>';
            return;
        }

        toolsToRender.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            card.dataset.category = tool.category;
            card.innerHTML = `
                <div class="card-icon"><i class="${tool.icon}"></i></div>
                <h3 class="card-title">${tool.title}</h3>
                <p class="card-description">${tool.description}</p>
                <div class="card-tags">
                    ${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <button class="card-action" data-url="${tool.url || ''}">${t('useTool')}</button>
            `;
            toolGrid.appendChild(card);
        });
    }

    function updateCategoryCounts() {
        // 只在首页更新类别计数
        if (!toolGrid) return;
        
        categoryLinks.forEach(link => {
            const category = link.dataset.category;
            const countSpan = link.querySelector('.count');
            if (!countSpan) return;

            if (category === 'all') {
                countSpan.textContent = allTools.length;
            } else {
                const count = allTools.filter(tool => tool.category === category).length;
                countSpan.textContent = count;
            }
        });
    }

    function handleFiltering() {
        // 只在首页处理过滤
        if (!toolGrid) return;
        
        const filterText = searchInput ? searchInput.value.toLowerCase() : '';
        const activeCategory = document.querySelector('.side-nav nav li.active')?.dataset.category || 'all';

        const filteredTools = allTools.filter(tool => {
            const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
            const matchesSearch = tool.title.toLowerCase().includes(filterText) ||
                                  tool.description.toLowerCase().includes(filterText);
            return matchesCategory && matchesSearch;
        });
        renderToolCards(filteredTools);
    }

    // --- 事件监听 ---
    function setupEventListeners() {
        // 语言切换按钮事件监听
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', toggleLanguage);
        }

        // 搜索框事件监听
        if (searchInput) {
            searchInput.addEventListener('input', handleFiltering);
        }

        // 类别链接事件监听
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // 如果不在首页且点击的不是首页链接，则跳转到首页对应类别
                if (!toolGrid && !window.location.pathname.endsWith('index.html')) {
                    const category = link.dataset.category;
                    if (category !== 'all') {
                        window.location.href = `index.html#${category}`;
                        return;
                    } else {
                        window.location.href = 'index.html';
                        return;
                    }
                }
                
                const category = link.dataset.category;
                if (category !== 'all') {
                    window.location.hash = category;
                } else {
                    // 如果是"所有工具"，则移除hash
                    history.pushState("", document.title, window.location.pathname + window.location.search);
                }
                
                categoryLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                handleFiltering();
                if (sideNav.classList.contains('open')) {
                    sideNav.classList.remove('open');
                }
            });
        });
        
        // 监听hash变化
        window.addEventListener('hashchange', checkUrlHash);

        // 工具卡片点击事件
        if (toolGrid) {
            toolGrid.addEventListener('click', (e) => {
                const actionButton = e.target.closest('.card-action');
                if (actionButton) {
                    const url = actionButton.dataset.url;
                    if (url) {
                        window.location.href = url;
                    } else {
                        alert('该工具正在开发中！');
                    }
                }
            });
        }

        // 桌面端侧边栏收起
        if (navToggle) {
            navToggle.addEventListener('click', () => container.classList.toggle('nav-collapsed'));
        }

        // 移动端侧边栏滑出
        if (mobileNavToggle) {
            mobileNavToggle.addEventListener('click', () => sideNav.classList.toggle('open'));
        }
    }

    // --- 初始化 ---
    function initializeApp() {
        initLanguage(); // 初始化语言设置
        renderToolCards(allTools);
        updateCategoryCounts();
        setupEventListeners();
        checkUrlHash(); // 检查URL中的锚点
    }

    loadToolData();
});
