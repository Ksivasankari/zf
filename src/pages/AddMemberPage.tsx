// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';
// import { memberships, trainers } from '../data/mockData';
// import Input from '../components/ui/Input';
// import Button from '../components/ui/Button';
// import { Card } from '../components/ui/Card';
// import toast from 'react-hot-toast';
// import { Member } from '../types';
// import { useMemberContext } from '../context/MemberContext';

// const AddMemberPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { addMember } = useMemberContext();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     membershipId: '',
//     trainerId: '',
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Basic validation
//     const newErrors: Record<string, string> = {};
//     if (!formData.name) newErrors.name = 'Name is required';
//     if (!formData.email) newErrors.email = 'Email is required';
//     if (!formData.phone) newErrors.phone = 'Phone is required';
//     if (!formData.membershipId) newErrors.membershipId = 'Membership is required';

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     // Create new member object
//     const newMember: Member = {
//       id: Math.random().toString(36).substr(2, 9),
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       membershipId: formData.membershipId,
//       trainerId: formData.trainerId || undefined,
//       joinDate: new Date().toISOString(),
//       status: 'active',
//       memberId: `MEM${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
//     };

//     // Add member using context
//     addMember(newMember);
//     toast.success('Member added successfully');
//     navigate('/members');
//   };

//   return (
//     <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-6">
//         <Link to="/members" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Members
//         </Link>
//       </div>

//       <Card className="p-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Member</h1>
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <Input
//             label="Full Name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             error={errors.name}
//             placeholder="John Doe"
//           />

//           <Input
//             type="email"
//             label="Email Address"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             error={errors.email}
//             placeholder="john@example.com"
//           />

//           <Input
//             label="Phone Number"
//             value={formData.phone}
//             onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//             error={errors.phone}
//             placeholder="(555) 123-4567"
//           />

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Membership Plan
//             </label>
//             <select
//               value={formData.membershipId}
//               onChange={(e) => setFormData({ ...formData, membershipId: e.target.value })}
//               className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
//                 errors.membershipId ? 'border-red-500' : ''
//               }`}
//             >
//               <option value="">Select a plan</option>
//               {memberships.map((membership) => (
//                 <option key={membership.id} value={membership.id}>
//                   {membership.name} - ${membership.price}/month
//                 </option>
//               ))}
//             </select>
//             {errors.membershipId && (
//               <p className="mt-1 text-xs text-red-500">{errors.membershipId}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Assign Trainer (Optional)
//             </label>
//             <select
//               value={formData.trainerId}
//               onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
//             >
//               <option value="">Select a trainer</option>
//               {trainers.map((trainer) => (
//                 <option key={trainer.id} value={trainer.id}>
//                   {trainer.name} - {trainer.specialization}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex justify-end space-x-4">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => navigate('/members')}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant="primary">
//               Add Member
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default AddMemberPage;


// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';
// import { memberships, trainers } from '../data/mockData';
// import Input from '../components/ui/Input';
// import Button from '../components/ui/Button';
// import { Card } from '../components/ui/Card';
// import toast from 'react-hot-toast';
// import { useMemberContext } from '../context/MemberContext';
// import { supabase } from '../context/supabaseClient';

// const AddMemberPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { addMember } = useMemberContext();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     membershipId: '',
//     trainerId: '',
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Form Validation
//     const newErrors: Record<string, string> = {};
//     if (!formData.name) newErrors.name = 'Name is required';
//     if (!formData.email) newErrors.email = 'Email is required';
//     if (!formData.phone) newErrors.phone = 'Phone is required';
//     if (!formData.membershipId) newErrors.membershipId = 'Membership is required';

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     // Prepare new member data
//     const newMember = {
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       membership_id: formData.membershipId,
//       trainer_id: formData.trainerId || null,
//       join_date: new Date().toISOString(),
//       status: 'active',
//       member_id: `MEM${Math.random().toString(36).substr(2, 6).toUpperCase()}`
//     };

//     // Insert into Supabase
//     const { data, error } = await supabase
//       .from('members')
//       .insert([newMember])
//       .select()
//       .single();

//     if (error) {
//       console.error('Supabase error:', error);
//       toast.error(`❌ Failed to add member: ${error.message}`);
//       return;
//     }

//     // Update Context & Navigate
//     addMember(data);
//     toast.success('✅ Member added successfully');
//     navigate('/members');
//   };

//   return (
//     <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-6">
//         <Link to="/members" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Members
//         </Link>
//       </div>

//       <Card className="p-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Member</h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <Input
//             label="Full Name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             error={errors.name}
//             placeholder="John Doe"
//           />
//           <Input
//             type="email"
//             label="Email Address"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             error={errors.email}
//             placeholder="john@example.com"
//           />
//           <Input
//             label="Phone Number"
//             value={formData.phone}
//             onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//             error={errors.phone}
//             placeholder="(555) 123-4567"
//           />
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Membership Plan</label>
//             <select
//               value={formData.membershipId}
//               onChange={(e) => setFormData({ ...formData, membershipId: e.target.value })}
//               className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${errors.membershipId ? 'border-red-500' : ''}`}
//             >
//               <option value="">Select a plan</option>
//               {memberships.map((membership) => (
//                 <option key={membership.id} value={membership.id}>
//                   {membership.name} - ${membership.price}/month
//                 </option>
//               ))}
//             </select>
//             {errors.membershipId && (
//               <p className="mt-1 text-xs text-red-500">{errors.membershipId}</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Assign Trainer (Optional)</label>
//             <select
//               value={formData.trainerId}
//               onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
//             >
//               <option value="">Select a trainer</option>
//               {trainers.map((trainer) => (
//                 <option key={trainer.id} value={trainer.id}>
//                   {trainer.name} - {trainer.specialization}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex justify-end space-x-4">
//             <Button type="button" variant="outline" onClick={() => navigate('/members')}>
//               Cancel
//             </Button>
//             <Button type="submit" variant="primary">
//               Add Member
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default AddMemberPage;


// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';
// import { memberships, trainers } from '../data/mockData';
// import Input from '../components/ui/Input';
// import Button from '../components/ui/Button';
// import { Card } from '../components/ui/Card';
// import toast from 'react-hot-toast';
// import { useMemberContext } from '../context/MemberContext';
// import { supabase } from '../context/supabaseClient';

// const AddMemberPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { addMember } = useMemberContext();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     membershipId: '',
//     trainerId: '',
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});

//   // Generate sequential member ID like MEM001, MEM002
//   const generateMemberId = async () => {
//     const { data, error } = await supabase
//       .from('members')
//       .select('member_id');

//     if (error) {
//       console.error('Error fetching member count:', error);
//       return 'MEM001'; // fallback
//     }

//     const count = data.length + 1;
//     const padded = String(count).padStart(3, '0');
//     return `MEM${padded}`;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Form Validation
//     const newErrors: Record<string, string> = {};
//     if (!formData.name) newErrors.name = 'Name is required';
//     if (!formData.email) newErrors.email = 'Email is required';
//     if (!formData.phone) newErrors.phone = 'Phone is required';
//     if (!formData.membershipId) newErrors.membershipId = 'Membership is required';

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     const memberId = await generateMemberId();

//     const newMember = {
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       membership_id: formData.membershipId,
//       trainer_id: formData.trainerId || null,
//       join_date: new Date().toISOString(),
//       status: 'active',
//       member_id: memberId,
//     };

//     const { data, error } = await supabase
//       .from('members')
//       .insert([newMember])
//       .select()
//       .single();

//     if (error) {
//       console.error('Supabase error:', error);
//       toast.error(`❌ Failed to add member: ${error.message}`);
//       return;
//     }

//     addMember(data);
//     toast.success('✅ Member added successfully');
//     navigate('/members');
//   };

//   return (
//     <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-6">
//         <Link to="/members" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Members
//         </Link>
//       </div>

//       <Card className="p-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Member</h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <Input
//             label="Full Name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             error={errors.name}
//             placeholder="John Doe"
//           />
//           <Input
//             type="email"
//             label="Email Address"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             error={errors.email}
//             placeholder="john@example.com"
//           />
//           <Input
//             label="Phone Number"
//             value={formData.phone}
//             onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//             error={errors.phone}
//             placeholder="(555) 123-4567"
//           />
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Membership Plan</label>
//             <select
//               value={formData.membershipId}
//               onChange={(e) => setFormData({ ...formData, membershipId: e.target.value })}
//               className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${errors.membershipId ? 'border-red-500' : ''}`}
//             >
//               <option value="">Select a plan</option>
//               {memberships.map((membership) => (
//                 <option key={membership.id} value={membership.id}>
//                   {membership.name} - ${membership.price}/month
//                 </option>
//               ))}
//             </select>
//             {errors.membershipId && (
//               <p className="mt-1 text-xs text-red-500">{errors.membershipId}</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Assign Trainer (Optional)</label>
//             <select
//               value={formData.trainerId}
//               onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
//             >
//               <option value="">Select a trainer</option>
//               {trainers.map((trainer) => (
//                 <option key={trainer.id} value={trainer.id}>
//                   {trainer.name} - {trainer.specialization}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex justify-end space-x-4">
//             <Button type="button" variant="outline" onClick={() => navigate('/members')}>
//               Cancel
//             </Button>
//             <Button type="submit" variant="primary">
//               Add Member
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default AddMemberPage;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';
// import Input from '../components/ui/Input';
// import Button from '../components/ui/Button';
// import { Card } from '../components/ui/Card';
// import toast from 'react-hot-toast';
// import { useMemberContext } from '../context/MemberContext';
// import { supabase } from '../context/supabaseClient';

// const AddMemberPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { addMember } = useMemberContext();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     membershipId: '',
//     trainerId: '',
//   });

//   const [membershipPlans, setMembershipPlans] = useState<any[]>([]);
//   const [trainerOptions, setTrainerOptions] = useState<any[]>([]);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   useEffect(() => {
//     const fetchMemberships = async () => {
//       const { data, error } = await supabase.from('memberships').select('*');
//       if (error) {
//         console.error('Error fetching memberships:', error);
//       } else {
//         setMembershipPlans(data);
//       }
//     };

//     const fetchTrainers = async () => {
//       const { data, error } = await supabase.from('trainers').select('*');
//       if (error) {
//         console.error('Error fetching trainers:', error);
//       } else {
//         setTrainerOptions(data);
//       }
//     };

//     fetchMemberships();
//     fetchTrainers();
//   }, []);

//   // Generate sequential member ID like MEM001, MEM002
//   // const generateMemberId = async () => {
//   //   const { data, error } = await supabase
//   //     .from('members')
//   //     .select('member_id');

//   //   if (error) {
//   //     console.error('Error fetching member count:', error);
//   //     return 'MEM001'; // fallback
//   //   }

//   //   const count = data.length + 1;
//   //   const padded = String(count).padStart(3, '0');
//   //   return `MEM${padded}`;
//   // };
//   const generateMemberId = async () => {
//   const { data, error } = await supabase
//     .from('members')
//     .select('memberId')
//     .order('memberId', { ascending: false })
//     .limit(1);

//   if (error || !data || data.length === 0) {
//     return 'MEM001'; // fallback if no members exist
//   }

//   const lastId = data[0].memberId; // example: "MEM007"
//   const number = parseInt(lastId.replace('MEM', ''), 10); // 7
//   const nextNumber = number + 1;
//   const nextId = `MEM${String(nextNumber).padStart(3, '0')}`;
//   return nextId; // returns "MEM008"
// };


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Form Validation
//     const newErrors: Record<string, string> = {};
//     if (!formData.name) newErrors.name = 'Name is required';
//     if (!formData.email) newErrors.email = 'Email is required';
//     if (!formData.phone) newErrors.phone = 'Phone is required';
//     if (!formData.membershipId) newErrors.membershipId = 'Membership is required';

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     const memberId = await generateMemberId();

//     const newMember = {
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       membershipId: formData.membershipId,
//       trainerId: formData.trainerId || null,
//       joinDate: new Date().toISOString(),
//       status: 'active',
//       memberId: memberId,
//     };

//     const { data, error } = await supabase
//       .from('members')
//       .insert([newMember])
//       .select()
//       .single();

//     if (error) {
//       console.error('Supabase error:', error);
//       toast.error(`❌ Failed to add member: ${error.message}`);
//       return;
//     }

//     addMember(data);
//     toast.success('✅ Member added successfully');
//     navigate('/members');
//   };

//   return (
//     <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-6">
//         <Link to="/members" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Members
//         </Link>
//       </div>

//       <Card className="p-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Member</h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <Input
//             label="Full Name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             error={errors.name}
//             placeholder="John Doe"
//           />
//           <Input
//             type="email"
//             label="Email Address"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             error={errors.email}
//             placeholder="john@example.com"
//           />
//           <Input
//             label="Phone Number"
//             value={formData.phone}
//             onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//             error={errors.phone}
//             placeholder="(555) 123-4567"
//           />
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Membership Plan</label>
//             <select
//               value={formData.membershipId}
//               onChange={(e) => setFormData({ ...formData, membershipId: e.target.value })}
//               className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${errors.membershipId ? 'border-red-500' : ''}`}
//             >
//               <option value="">Select a plan</option>
//               {membershipPlans.map((membership) => (
//                 <option key={membership.id} value={membership.id}>
//                   {membership.name} - ${membership.price}/month
//                 </option>
//               ))}
//             </select>
//             {errors.membershipId && (
//               <p className="mt-1 text-xs text-red-500">{errors.membershipId}</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Assign Trainer (Optional)</label>
//             <select
//               value={formData.trainerId}
//               onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
//             >
//               <option value="">Select a trainer</option>
//               {trainerOptions.map((trainer) => (
//                 <option key={trainer.id} value={trainer.id}>
//                   {trainer.name} - {trainer.specialization}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex justify-end space-x-4">
//             <Button type="button" variant="outline" onClick={() => navigate('/members')}>
//               Cancel
//             </Button>
//             <Button type="submit" variant="primary">
//               Add Member
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default AddMemberPage;


import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import toast from 'react-hot-toast';
import { useMemberContext } from '../context/MemberContext';
import { supabase } from '../context/supabaseClient';

const AddMemberPage: React.FC = () => {
  const navigate = useNavigate();
  const { addMember } = useMemberContext();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membershipId: '',
    trainerId: '',
    profileImage: null as File | null,
  });

  const [membershipPlans, setMembershipPlans] = useState<any[]>([]);
  const [trainerOptions, setTrainerOptions] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchMemberships = async () => {
      const { data, error } = await supabase.from('memberships').select('*');
      if (error) {
        console.error('Error fetching memberships:', error);
      } else {
        setMembershipPlans(data);
      }
    };

    const fetchTrainers = async () => {
      const { data, error } = await supabase.from('trainers').select('*');
      if (error) {
        console.error('Error fetching trainers:', error);
      } else {
        setTrainerOptions(data);
      }
    };

    fetchMemberships();
    fetchTrainers();
  }, []);

  const generateMemberId = async () => {
    const { data, error } = await supabase
      .from('members')
      .select('memberId')
      .order('memberId', { ascending: false })
      .limit(1);

    if (error || !data || data.length === 0) {
      return 'MEM001';
    }

    const lastId = data[0].memberId;
    const number = parseInt(lastId.replace('MEM', ''), 10);
    const nextNumber = number + 1;
    return `MEM${String(nextNumber).padStart(3, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.membershipId) newErrors.membershipId = 'Membership is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let imageUrl = null;
    if (formData.profileImage) {
      const fileExt = formData.profileImage.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `members/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('member-photos')
        .upload(filePath, formData.profileImage);

      if (uploadError) {
        toast.error(' Failed to upload image');
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('member-photos')
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;
    }

    const memberId = await generateMemberId();

    const newMember = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      membershipId: formData.membershipId,
      trainerId: formData.trainerId || null,
      joinDate: new Date().toISOString(),
      status: 'active',
      memberId,
      profileImage: imageUrl,
    };

    const { data, error } = await supabase
      .from('members')
      .insert([newMember])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      toast.error(` Failed to add member: ${error.message}`);
      return;
    }

    addMember(data);
    toast.success(' Member added successfully');
    navigate('/members');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/members" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Link>
      </div>

      <Card className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Member</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            placeholder="John Doe"
          />
          <Input
            type="email"
            label="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            placeholder="john@example.com"
          />
          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={errors.phone}
            placeholder="(555) 123-4567"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Membership Plan</label>
            <select
              value={formData.membershipId}
              onChange={(e) => setFormData({ ...formData, membershipId: e.target.value })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${errors.membershipId ? 'border-red-500' : ''}`}
            >
              <option value="">Select a plan</option>
              {membershipPlans.map((membership) => (
                <option key={membership.id} value={membership.id}>
                  {membership.name} - ${membership.price}/month
                </option>
              ))}
            </select>
            {errors.membershipId && (
              <p className="mt-1 text-xs text-red-500">{errors.membershipId}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign Trainer (Optional)</label>
            <select
              value={formData.trainerId}
              onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            >
              <option value="">Select a trainer</option>
              {trainerOptions.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.name} - {trainer.specialization}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData({ ...formData, profileImage: file });
                }
              }}
              className="mt-1 block w-full text-sm text-gray-700"
            />
            {formData.profileImage && (
              <img
                src={URL.createObjectURL(formData.profileImage)}
                alt="Preview"
                className="h-24 w-24 object-cover rounded-full mt-2"
              />
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate('/members')}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Member
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddMemberPage;
