const names = ['Jon', 'Alex','Desmond', 'Sujung','Gurjot', 'Jessica', 'Kelly','Sona', 'Peter','Nicky', 'Felix', 'Andrii','Lily','Strider','Hien', 'Nick', 'Laurence', 'Young', 'Divy', 'Matt','Dan', 'Josh','Kianna','Jenny','Arash','Elaine'];
const months = ['January', 'February','March','April','May','June','July','August','September','October','November','December'];

let seed = () => {
  let seedData = [];
  for (let i = 0; i < names.length; i++) {
    let babySeed = {};
    babySeed.name = names[i];
    babySeed.character = 'char' + Math.ceil(Math.random() * 4);
    babySeed.count = Math.ceil(Math.random() * 4);
    babySeed.dob = months[Math.floor(Math.random() * 12)] + ' ' + Math.ceil(Math.random() * 30);
    babySeed.goalHangouts = Math.ceil(Math.random() * 20);
    babySeed.hangoutsYTD = Math.ceil(Math.random() * babySeed.goalHangouts * 1.5);
    babySeed.locx = [];
    babySeed.locy = [];
    seedData.push(babySeed);
  }
  return seedData
}

export default seed;