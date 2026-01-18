// 翻译数据
const translations = {
    zh: {
        // 页面标题和描述
        "pageTitle": "AI 工具集 - 提升创造力和工作效率的智能工具平台",
        "pageDescription": "AI工具集 - 提供智能文案生成、图像处理、代码辅助、音频处理和视频创作等多种AI驱动工具，提高工作效率和创造力",

        // 头部导航
        "siteTitle": "AI 工具集",
        "searchPlaceholder": "搜索工具名称或描述...",
        "langToggleTitle": "切换语言 / Switch Language",

        // 侧边栏导航
        "navAll": "所有工具",
        "navWriting": "写作助手",
        "navImage": "图像生成",
        "navCode": "代码工具",
        "navAudio": "音频处理",
        "navVideo": "视频创作",
        "navMedical": "医学工具",
        "navOriginal": "原创工具",

        // 页脚
        "footerHome": "首页",
        "footerTerms": "服务条款",
        "footerPrivacy": "隐私政策",
        "footerContact": "联系邮箱",
        "footerCopyright": "© 2025-2026 AI工具集. 保留所有权利.",

        // 工具相关
        "useTool": "使用工具",
        "noResults": "未找到匹配的工具。",

        // 按钮文本
        "calculate": "计算",
        "reset": "重置",
        "calculateSampleSize": "计算样本量",
        "resetForm": "重置",

        // 通用术语
        "loading": "加载中...",
        "error": "错误",
        "success": "成功",
        "warning": "警告",
        "info": "信息",

        // 医学工具相关
        "backToTools": "返回工具列表",
        "sampleSizeCalculator": "样本量计算器",
        "clinicalTrialTools": "临床试验设计工具",
        "singleGroupCalculator": "单组样本量计算",
        "twoGroupCalculator": "两组样本量计算",
        "twoGroupMeanCalculator": "两组样本均数计算",
        "bioequivalenceCalculator": "生物等效性样本量计算",

        // 统计学术语
        "significanceLevel": "显著性水平",
        "power": "统计功效",
        "sampleSize": "样本量",
        "mean": "均数",
        "standardDeviation": "标准差",
        "variance": "方差",
        "confidenceInterval": "置信区间",
        "pValue": "P值",
        "effectSize": "效应量",

        // 结果显示
        "calculationResults": "计算结果",
        "parameters": "参数",
        "statistics": "统计学参数",
        "recommendations": "建议",

        // 表单验证
        "enterValidNumber": "请输入有效的数值",
        "requiredField": "此字段为必填项",
        "invalidRange": "数值超出有效范围",

        // 帮助提示
        "help": "帮助",
        "about": "关于",
        "contact": "联系我们",
        "support": "技术支持"
    },
    en: {
        // 页面标题和描述
        "pageTitle": "AI Tools Collection - Intelligent Platform for Creativity and Productivity",
        "pageDescription": "AI Tools Collection - Providing AI-powered tools for content generation, image processing, code assistance, audio processing, and video creation to enhance work efficiency and creativity",

        // 头部导航
        "siteTitle": "AI Tools Collection",
        "searchPlaceholder": "Search tool names or descriptions...",
        "langToggleTitle": "Switch Language / 切换语言",

        // 侧边栏导航
        "navAll": "All Tools",
        "navWriting": "Writing Assistant",
        "navImage": "Image Generation",
        "navCode": "Code Tools",
        "navAudio": "Audio Processing",
        "navVideo": "Video Creation",
        "navMedical": "Medical Tools",
        "navOriginal": "Original Tools",

        // 页脚
        "footerHome": "Home",
        "footerTerms": "Terms of Service",
        "footerPrivacy": "Privacy Policy",
        "footerContact": "Contact Email",
        "footerCopyright": "© 2025-2026 AI Tools Collection. All rights reserved.",

        // 工具相关
        "useTool": "Use Tool",
        "noResults": "No matching tools found.",

        // 按钮文本
        "calculate": "Calculate",
        "reset": "Reset",
        "calculateSampleSize": "Calculate Sample Size",
        "resetForm": "Reset",

        // 通用术语
        "loading": "Loading...",
        "error": "Error",
        "success": "Success",
        "warning": "Warning",
        "info": "Information",

        // 医学工具相关
        "backToTools": "Back to Tools",
        "sampleSizeCalculator": "Sample Size Calculator",
        "clinicalTrialTools": "Clinical Trial Design Tools",
        "singleGroupCalculator": "Single Group Sample Size Calculator",
        "twoGroupCalculator": "Two Group Sample Size Calculator",
        "twoGroupMeanCalculator": "Two Group Mean Calculator",
        "bioequivalenceCalculator": "Bioequivalence Sample Size Calculator",

        // 统计学术语
        "significanceLevel": "Significance Level",
        "power": "Statistical Power",
        "sampleSize": "Sample Size",
        "mean": "Mean",
        "standardDeviation": "Standard Deviation",
        "variance": "Variance",
        "confidenceInterval": "Confidence Interval",
        "pValue": "P-Value",
        "effectSize": "Effect Size",

        // 结果显示
        "calculationResults": "Calculation Results",
        "parameters": "Parameters",
        "statistics": "Statistical Parameters",
        "recommendations": "Recommendations",

        // 表单验证
        "enterValidNumber": "Please enter a valid number",
        "requiredField": "This field is required",
        "invalidRange": "Value is outside the valid range",

        // 帮助提示
        "help": "Help",
        "about": "About",
        "contact": "Contact Us",
        "support": "Technical Support"
    }
};

// 当前语言
let currentLanguage = 'zh';

// 获取翻译文本
function t(key) {
    return translations[currentLanguage][key] || key;
}

// 设置语言
function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        localStorage.setItem('preferred-language', lang);
        updatePageLanguage();
        updateUILanguage();
    }
}

// 获取保存的语言偏好
function getSavedLanguage() {
    return localStorage.getItem('preferred-language') || 'zh';
}

// 初始化语言
function initLanguage() {
    const savedLang = getSavedLanguage();
    setLanguage(savedLang);
}

// 更新页面语言
function updatePageLanguage() {
    // 更新页面标题和描述
    document.title = t('pageTitle');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', t('pageDescription'));
    }

    // 更新HTML语言属性
    document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
}

// 更新UI语言
function updateUILanguage() {
    // 更新语言按钮文本
    const langText = document.getElementById('lang-text');
    if (langText) {
        langText.textContent = currentLanguage === 'zh' ? '中' : 'EN';
    }

    // 更新搜索框占位符
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.placeholder = t('searchPlaceholder');
    }

    // 更新语言切换按钮标题
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.title = t('langToggleTitle');
    }

    // 更新导航链接
    const navItems = {
        'all': 'navAll',
        'writing': 'navWriting',
        'image': 'navImage',
        'code': 'navCode',
        'audio': 'navAudio',
        'video': 'navVideo',
        'medical': 'navMedical',
        'original': 'navOriginal'
    };

    Object.keys(navItems).forEach(category => {
        const navLink = document.querySelector(`.side-nav nav ul li[data-category="${category}"] a span:first-of-type`);
        if (navLink) {
            navLink.textContent = t(navItems[category]);
        }
    });

    // 更新页脚
    const footerHome = document.querySelector('.footer-links a[href*="index.html"]');
    if (footerHome) footerHome.textContent = t('footerHome');

    const footerTerms = document.querySelector('.footer-links a[href*="terms.html"]');
    if (footerTerms) footerTerms.textContent = t('footerTerms');

    const footerPrivacy = document.querySelector('.footer-links a[href*="privacy.html"]');
    if (footerPrivacy) footerPrivacy.textContent = t('footerPrivacy');

    const footerCopyright = document.querySelector('.footer-copyright p');
    if (footerCopyright) footerCopyright.textContent = t('footerCopyright');

    // 更新Logo
    const logoTitle = document.querySelector('.logo h1');
    if (logoTitle) logoTitle.textContent = t('siteTitle');

    // 更新页脚Logo
    const footerLogo = document.querySelector('.footer-logo span');
    if (footerLogo) footerLogo.textContent = t('siteTitle');

    // 更新无结果提示
    const noResults = document.querySelector('.no-results');
    if (noResults) noResults.textContent = t('noResults');
}

// 切换语言
function toggleLanguage() {
    const newLang = currentLanguage === 'zh' ? 'en' : 'zh';
    setLanguage(newLang);
}

// 导出函数供全局使用
window.t = t;
window.setLanguage = setLanguage;
window.toggleLanguage = toggleLanguage;
