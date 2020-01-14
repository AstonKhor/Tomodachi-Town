const names = ['Jon', 'Alex','Desmond', 'Sujung','Gurjot', 'Jessica', 'Kelly','Sona', 'Peter','Nicky', 'Felix', 'Andrii','Lily','Strider','Hien', 'Nick', 'Laurence', 'Young', 'Divy', 'Matt','Dan', 'Josh','Kiana','Jenny','Arash','Elaine', 'Jimmy', 'Jin', 'Neil'];
const months = ['January', 'February','March','April','May','June','July','August','September','October','November','December'];

let seed = () => {
  let seedData = [];
  for (let i = 0; i < names.length; i++) {
    let babySeed = {};
    babySeed.name = names[i];
    babySeed.character = 'char' + Math.ceil(Math.random() * 5);
    babySeed.count = Math.ceil(Math.random() * 4);
    babySeed.dob = months[Math.floor(Math.random() * 12)] + ' ' + Math.ceil(Math.random() * 30);
    babySeed.goalHangouts = Math.ceil(Math.random() * 20);
    babySeed.hangoutsYTD = Math.ceil(Math.random() * babySeed.goalHangouts * 1.5);
    babySeed.locx = [];
    babySeed.locy = [];
    seedData.push(babySeed);
  }
  //sort by name
  seedData.sort((a,b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  //sort by hangouts
  seedData.sort((a,b) => {
    if (a.goalHangouts > b.goalHangouts) {
      return -1;
    }
    if (a.goalHangouts < b.goalHangouts) {
      return 1;
    }
    return 0;
  });
  return seedData
}

export default seed;