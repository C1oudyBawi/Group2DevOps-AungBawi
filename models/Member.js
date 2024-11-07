class Member { 
    constructor(name, email, adminNumber, gymPrograms) { 
    this.name = name; 
    this.email = email; 
    this.adminNumber = adminNumber; 
    this.gymPrograms = gymPrograms; 
    const timestamp = new Date().getTime();  
    const random = Math.floor(Math.random() * 1000); 
    this.id = timestamp + "" + random.toString().padStart(3, '0'); 
    } 
    } 
    module.exports = { Member }; 