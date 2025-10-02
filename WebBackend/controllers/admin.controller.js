import Admin from '../models/admin.model.js';
import bcrypt from 'bcrypt';

 const seedAdmin = async () => {   
   try {
     const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL }); 
     if (existingAdmin) {
       console.log('✅ @dmin already exists..');
       return;
      }
    const hashPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);

    const newAdmin = new Admin({
      fullname: 'HARSH DEV',
      email: process.env.ADMIN_EMAIL,
      password: hashPassword,
      role: '@dmin',
      verified: true
    });

    await newAdmin.save();
    console.log('🧑‍💼 Default @dmin created');
  } catch (error) {
    console.error('❌ Error:  default @dmin not created:', error.message);
  }
};

export default seedAdmin