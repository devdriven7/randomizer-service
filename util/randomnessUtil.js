module.exports = {
    generateRandomNumber: (max = 100, min = 0) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  };
  