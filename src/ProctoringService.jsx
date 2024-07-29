// ProctoringService.js

export function checkFocus(callback) {
    const statuses = ['lookingAway', 'lookingStraight', 'lookingLeft', 'lookingRight', 'lookingUp'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    callback(randomStatus);
  }
  