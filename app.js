// 存储新农人信息的数组
let farmers = [];

// 存储技能需求的数组
let skillRequests = [];

// DOM元素
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');
const farmerForm = document.getElementById('farmer-form');
const requestForm = document.getElementById('request-form');
const sampleBtn = document.getElementById('sample-btn');
const farmerMessage = document.getElementById('farmer-message');
const requestMessage = document.getElementById('request-message');
const sampleMessage = document.getElementById('sample-message');
const matchResults = document.getElementById('match-results');
const farmersList = document.getElementById('farmers-list');
const requestsList = document.getElementById('requests-list');

// 导航功能
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetSection = btn.getAttribute('data-section');
        
        // 隐藏所有 section
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // 显示目标 section
        document.getElementById(targetSection).classList.add('active');
        
        // 如果是查看页面，刷新数据
        if (targetSection === 'view-farmers') {
            displayFarmers();
        } else if (targetSection === 'view-requests') {
            displayRequests();
        } else if (targetSection === 'match-skills') {
            displayMatchResults();
        }
    });
});

// 添加新农人
farmerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('farmer-name').value;
    const skills = document.getElementById('farmer-skills').value;
    
    if (name && skills) {
        farmers.push({
            id: farmers.length + 1,
            name,
            skills: skills.split(',').map(skill => skill.trim())
        });
        
        showMessage(farmerMessage, `已添加新农人: ${name}，技能: ${skills}`, 'success');
        farmerForm.reset();
    } else {
        showMessage(farmerMessage, '请填写完整信息', 'error');
    }
});

// 添加技能需求
requestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('request-title').value;
    const requiredSkills = document.getElementById('request-skills').value;
    
    if (title && requiredSkills) {
        skillRequests.push({
            id: skillRequests.length + 1,
            title,
            requiredSkills: requiredSkills.split(',').map(skill => skill.trim())
        });
        
        showMessage(requestMessage, `已添加技能需求: ${title}，所需技能: ${requiredSkills}`, 'success');
        requestForm.reset();
    } else {
        showMessage(requestMessage, '请填写完整信息', 'error');
    }
});

// 添加示例数据
sampleBtn.addEventListener('click', () => {
    // 清空现有数据
    farmers = [];
    skillRequests = [];
    
    // 添加新农人
    farmers.push(
        { id: 1, name: '张三', skills: ['种植', '养殖', '电商'] },
        { id: 2, name: '李四', skills: ['养殖', '农产品加工'] },
        { id: 3, name: '王五', skills: ['种植', '电商', '农业技术指导'] },
        { id: 4, name: '赵六', skills: ['农产品加工', '电商'] }
    );
    
    // 添加技能需求
    skillRequests.push(
        { id: 1, title: '农产品线上销售', requiredSkills: ['电商', '种植'] },
        { id: 2, title: '养殖场管理', requiredSkills: ['养殖'] },
        { id: 3, title: '农产品加工与销售', requiredSkills: ['农产品加工', '电商'] }
    );
    
    showMessage(sampleMessage, '示例数据添加成功！', 'success');
});

// 显示消息
function showMessage(element, text, type) {
    element.textContent = text;
    element.className = `message ${type}`;
    
    // 3秒后清除消息
    setTimeout(() => {
        element.textContent = '';
        element.className = 'message';
    }, 3000);
}

// 显示所有新农人
function displayFarmers() {
    if (farmers.length === 0) {
        farmersList.innerHTML = '<p>暂无新农人数据</p>';
        return;
    }
    
    farmersList.innerHTML = farmers.map(farmer => `
        <div class="farmer-item">
            <h3>${farmer.name}</h3>
            <p><strong>技能:</strong> ${farmer.skills.join(', ')}</p>
        </div>
    `).join('');
}

// 显示所有技能需求
function displayRequests() {
    if (skillRequests.length === 0) {
        requestsList.innerHTML = '<p>暂无技能需求数据</p>';
        return;
    }
    
    requestsList.innerHTML = skillRequests.map(request => `
        <div class="request-item">
            <h3>${request.title}</h3>
            <p><strong>所需技能:</strong> ${request.requiredSkills.join(', ')}</p>
        </div>
    `).join('');
}

// 显示匹配结果
function displayMatchResults() {
    if (skillRequests.length === 0) {
        matchResults.innerHTML = '<p>暂无技能需求数据</p>';
        return;
    }
    
    matchResults.innerHTML = skillRequests.map(request => {
        const matchedFarmers = farmers.filter(farmer => {
            return request.requiredSkills.every(skill => 
                farmer.skills.includes(skill)
            );
        });
        
        return `
            <div class="match-item">
                <h3>${request.title}</h3>
                <p><strong>所需技能:</strong> ${request.requiredSkills.join(', ')}</p>
                <div class="matched-farmers">
                    <strong>匹配的新农人:</strong>
                    ${matchedFarmers.length > 0 ? 
                        matchedFarmers.map(farmer => `
                            <div class="matched-farmer">
                                ${farmer.name} (技能: ${farmer.skills.join(', ')})
                            </div>
                        `).join('') : 
                        '<p>暂无匹配的新农人</p>'
                    }
                </div>
            </div>
        `;
    }).join('');
}

// 默认显示第一个 section
document.getElementById('add-farmer').classList.add('active');
