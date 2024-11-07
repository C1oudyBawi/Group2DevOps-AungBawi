class Member { 
    constructor(name, email, admin_number, gym_programs) { 
    this.name = name; 
    this.email = email; 
    this.admin_number = admin_number; 
    this.gym_programs = gym_programs; 
    const timestamp = new Date().getTime();  
    const random = Math.floor(Math.random() * 1000); 
    this.id = timestamp + "" + random.toString().padStart(3, '0'); 
    } 
    } 
    module.exports = { Member }; 