const fs = require('fs');

/**
 * Returns an sorted by time array of a user's tasks
 * Requires the userId to be present in users.json
 */
function getUserTasks(userId) {
  var usersPath = 'database/users.json'; 
  var usersRead = fs.readFileSync(usersPath); 
  var users = JSON.parse(usersRead); 
  var tasks = users[userId]; 
  tasks.sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()); 
  return tasks; 
}

module.exports.getUserTasks = getUserTasks; 