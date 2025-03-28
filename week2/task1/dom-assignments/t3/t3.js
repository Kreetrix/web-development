document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('target');
    const ua = navigator.userAgent;
    
     //the power of regex I guess
    const browsers = [
        { name: 'Mozilla Firefox', pattern: /Firefox\/(\d+)/ },
        { name: 'Microsoft Edge', pattern: /Edg\/(\d+)/ },
        { name: 'Google Chrome', pattern: /Chrome\/(\d+)/ },
        { name: 'Apple Safari', pattern: /Version\/(\d+)/ }
    ];
    
    let browser = browsers.find(b => ua.includes(b.name.split(' ').pop())) || {};
    let [browserName, browserVersion] = browser.name 
        ? [browser.name, ua.match(browser.pattern)[1]] 
        : ['Unknown Browser', 'Unknown Version'];
    
    const osList = [
        { name: 'Windows', pattern: 'Windows' },
        { name: 'MacOS', pattern: 'Mac' },
        { name: 'Linux', pattern: 'Linux' },
        { name: 'Android', pattern: 'Android' },
        { name: 'iOS', pattern: 'iOS' }
    ];
    
    const os = osList.find(os => ua.includes(os.pattern)) || { name: 'Unknown OS' };
    
    const { width: screenWidth, height: screenHeight, availWidth, availHeight } = window.screen;
    
    const now = new Date();
    const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    
    target.innerHTML = 
    `
        <p><strong>Browser:</strong> ${browserName}, ${browserVersion}</p>
        <p><strong>Operating System:</strong> ${os.name}</p>
        <p><strong>Screen Resolution:</strong> ${screenWidth} × ${screenHeight}</p>
        <p><strong>Available Screen Space:</strong> ${availWidth} × ${availHeight}</p>
        <p><strong>Current Date:</strong> ${now.toLocaleDateString('fi-FI', dateOptions)}</p>
        <p><strong>Current Time:</strong> ${now.toLocaleTimeString('fi-FI', timeOptions)}</p>
    `
});