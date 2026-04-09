// New Farmer Skill Matching Program

// Array to store farmers' information
const farmers = [];

// Array to store skill requests
const skillRequests = [];

// Add a new farmer
function addFarmer(name, skills) {
  farmers.push({
    id: farmers.length + 1,
    name,
    skills: skills.split(',').map(skill => skill.trim())
  });
  console.log(`已添加新农人: ${name}，技能: ${skills}`);
}

// Add a new skill request
function addSkillRequest(title, requiredSkills) {
  skillRequests.push({
    id: skillRequests.length + 1,
    title,
    requiredSkills: requiredSkills.split(',').map(skill => skill.trim())
  });
  console.log(`已添加技能需求: ${title}，所需技能: ${requiredSkills}`);
}

// Match skills
function matchSkills() {
  console.log('\n=== 技能匹配结果 ===');
  
  skillRequests.forEach(request => {
    console.log(`\n需求: ${request.title}`);
    console.log(`所需技能: ${request.requiredSkills.join(', ')}`);
    
    const matchedFarmers = farmers.filter(farmer => {
      // Check if farmer has all required skills
      return request.requiredSkills.every(skill => 
        farmer.skills.includes(skill)
      );
    });
    
    if (matchedFarmers.length > 0) {
      console.log('匹配的新农人:');
      matchedFarmers.forEach(farmer => {
        console.log(`- ${farmer.name} (技能: ${farmer.skills.join(', ')})`);
      });
    } else {
      console.log('暂无匹配的新农人');
    }
  });
}

// Show all farmers
function showAllFarmers() {
  console.log('\n=== 所有新农人 ===');
  farmers.forEach(farmer => {
    console.log(`${farmer.id}. ${farmer.name} - 技能: ${farmer.skills.join(', ')}`);
  });
}

// Show all skill requests
function showAllSkillRequests() {
  console.log('\n=== 所有技能需求 ===');
  skillRequests.forEach(request => {
    console.log(`${request.id}. ${request.title} - 所需技能: ${request.requiredSkills.join(', ')}`);
  });
}

// Sample data
function addSampleData() {
  console.log('添加示例数据...');
  
  // Add farmers
  addFarmer('张三', '种植, 养殖, 电商');
  addFarmer('李四', '养殖, 农产品加工');
  addFarmer('王五', '种植, 电商, 农业技术指导');
  addFarmer('赵六', '农产品加工, 电商');
  
  // Add skill requests
  addSkillRequest('农产品线上销售', '电商, 种植');
  addSkillRequest('养殖场管理', '养殖');
  addSkillRequest('农产品加工与销售', '农产品加工, 电商');
}

// Main menu
function mainMenu() {
  console.log('\n=== 新农人技能匹配程序 ===');
  console.log('1. 添加新农人');
  console.log('2. 添加技能需求');
  console.log('3. 匹配技能');
  console.log('4. 查看所有新农人');
  console.log('5. 查看所有技能需求');
  console.log('6. 添加示例数据');
  console.log('7. 退出');
}

// Run program
function runProgram() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  function askQuestion(question) {
    return new Promise(resolve => rl.question(question, resolve));
  }
  
  async function processMenu() {
    mainMenu();
    const choice = await askQuestion('请选择操作: ');
    
    switch(choice) {
      case '1':
        const name = await askQuestion('请输入新农人姓名: ');
        const skills = await askQuestion('请输入技能（用逗号分隔）: ');
        addFarmer(name, skills);
        break;
      case '2':
        const title = await askQuestion('请输入需求标题: ');
        const requiredSkills = await askQuestion('请输入所需技能（用逗号分隔）: ');
        addSkillRequest(title, requiredSkills);
        break;
      case '3':
        matchSkills();
        break;
      case '4':
        showAllFarmers();
        break;
      case '5':
        showAllSkillRequests();
        break;
      case '6':
        addSampleData();
        break;
      case '7':
        console.log('程序已退出');
        rl.close();
        return;
      default:
        console.log('无效的选择，请重试');
    }
    
    processMenu();
  }
  
  processMenu();
}

// Start program
runProgram();