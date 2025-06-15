// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Search, Edit, Trash2, UserPlus, MessageCircle } from 'lucide-react';
// import { Member, Trainer } from '../../types';
// import { formatDate } from '../../lib/utils';
// import { supabase } from '../../context/supabaseClient';
// import Input from '../ui/Input';
// import Button from '../ui/Button';
// import Badge from '../ui/Badge';
// import toast from 'react-hot-toast';

// interface MemberListProps {
//   members: Member[];
//   trainers: Trainer[];
//   onDeleteMember: (id: string) => void;
//   onDeleteTrainer: (id: string) => void;
// }

// const MemberList: React.FC<MemberListProps> = ({
//   members,
//   trainers,
//   onDeleteMember,
//   onDeleteTrainer,
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState<string | null>(null);
//   const [memberships, setMemberships] = useState<{ id: string; name: string; duration?: number }[]>([]);

//   useEffect(() => {
//     const fetchMemberships = async () => {
//       const { data, error } = await supabase.from('memberships').select('id, name, duration');
//       if (error) {
//         console.error('Error fetching memberships:', error.message);
//         toast.error('Failed to load membership plans');
//       } else {
//         setMemberships(data || []);
//       }
//     };

//     fetchMemberships();
//   }, []);

//   const getMembershipName = (id: string | undefined | null) => {
//     if (!id || id.toLowerCase() === 'unknown') return 'Unknown';
//     const membership = memberships.find((m) => String(m.id) === String(id));
//     return membership?.name || 'Unknown';
//   };

//   const getStatusBadgeVariant = (status: string) => {
//     switch (status) {
//       case 'active':
//         return 'success';
//       case 'inactive':
//         return 'danger';
//       case 'pending':
//         return 'warning';
//       default:
//         return 'default';
//     }
//   };
// const enrichedMembers = members.map((member) => {
//   const membership = memberships.find((m) => String(m.id) === String(member.membershipId));
//   if (!membership || !member.joinDate) {
//     return member;
//   }

//   const join = new Date(member.joinDate);
//   const dueDate = new Date(join);
//   dueDate.setDate(dueDate.getDate() + Number(membership.duration || 0));

//   const today = new Date();
//   const timeDiff = dueDate.getTime() - today.getTime();
//   const remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // convert ms to days

//   let dynamicStatus = 'expired';
//   if (remainingDays > 15) {
//     dynamicStatus = 'active';
//   } else if (remainingDays >= 0 && remainingDays <= 15) {
//     dynamicStatus = 'upcoming';
//   }

//   return {
//     ...member,
//     status: dynamicStatus,
//   };
// });

// const filteredMembers = enrichedMembers.filter((member) => {
//   const matchesSearch =
//     member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     member.phone.includes(searchTerm) ||
//     member.memberId.toLowerCase().includes(searchTerm.toLowerCase());

//   const matchesStatus = statusFilter ? member.status === statusFilter : true;

//   return matchesSearch && matchesStatus;
// });

//   const filteredTrainers = trainers.filter((trainer) => {
//     const matchesSearch =
//       trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       trainer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       trainer.phone.includes(searchTerm) ||
//       trainer.trainerId.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus = statusFilter ? trainer.status === statusFilter : true;

//     return matchesSearch && matchesStatus;
//   });

//   const handleDeleteMember = (id: string) => {
//     if (confirm('Are you sure you want to delete this member?')) {
//       onDeleteMember(id);
//       toast.success('Member deleted successfully');
//     }
//   };

//   const handleDeleteTrainer = (id: string) => {
//     if (confirm('Are you sure you want to delete this trainer?')) {
//       onDeleteTrainer(id);
//       toast.success('Trainer deleted successfully');
//     }
//   };

//   const handleMessage = (phone: string, name: string, joinDate?: string, membershipId?: string) => {
//     const membership = memberships.find((m) => String(m.id) === String(membershipId));

//     if (!membership || !joinDate) {
//       toast.error('Unable to generate message. Membership or join date missing.');
//       return;
//     }

//     const join = new Date(joinDate);
//     const dueDate = new Date(join);
//     dueDate.setDate(dueDate.getDate() + Number(membership.duration || 0));

//     const expiryDate = dueDate.toLocaleDateString('en-GB', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric',
//     });

//     const message = `Hi ${name}, your gym plan is going to expire on ${expiryDate}. Please renew your plan to continue your gym membership.`;
//     const whatsappLink = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;

//     window.open(whatsappLink, "_blank");
//   };


//   return (
//     <div className="space-y-4 animate-enter">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <Input
//           placeholder="Search by name, email, phone or ID..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           leftIcon={<Search size={18} />}
//           className="sm:max-w-xs"
//         />
//       </div>

//       {/* Members Table */}
//       <div className="bg-white shadow rounded-lg border border-gray-200 mb-8">
//         <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//           <h2 className="text-lg font-semibold">Members List</h2>
//           <Link to="/members/new">
//             <Button variant="primary" leftIcon={<UserPlus size={16} />}>
//               Add Member
//             </Button>
//           </Link>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membership</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredMembers.map((member) => (
//                 <tr key={member.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.memberId}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="h-10 w-10 flex-shrink-0">
//                         <img
//                           className="h-10 w-10 rounded-full"
//                           src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
//                           alt={member.name}
//                         />
//                       </div>
//                       <div className="ml-4">
//                         <div className="font-medium text-gray-900">{member.name}</div>
//                         <div className="text-gray-500">{member.email}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {getMembershipName(member.membershipId)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {formatDate(member.joinDate)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <Badge variant={getStatusBadgeVariant(member.status)}>
//                       {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
//                     </Badge>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex justify-end space-x-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() =>
//                           handleMessage(member.phone, member.name, member.joinDate, member.membershipId)
//                         }
//                       >
//                         <MessageCircle size={16} />
//                       </Button>
//                       <Link to={`/members/${member.id}`}>
//                         <Button variant="outline" size="sm">
//                           <Edit size={16} />
//                         </Button>
//                       </Link>
//                       <Button variant="outline" size="sm" onClick={() => handleDeleteMember(member.id)}>
//                         <Trash2 size={16} className="text-red-500" />
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Trainers Table */}
//       <div className="bg-white shadow rounded-lg border border-gray-200">
//         <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//           <h2 className="text-lg font-semibold">Trainers List</h2>
//           <Link to="/trainers/new">
//             <Button variant="primary" leftIcon={<UserPlus size={16} />}>
//               Add Trainer
//             </Button>
//           </Link>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredTrainers.map((trainer) => (
//                 <tr key={trainer.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainer.trainerId}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="h-10 w-10 flex-shrink-0">
//                         <img
//                           className="h-10 w-10 rounded-full"
//                           src={trainer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(trainer.name)}&background=0EA5E9&color=fff`}
//                           alt={trainer.name}
//                         />
//                       </div>
//                       <div className="ml-4">
//                         <div className="font-medium text-gray-900">{trainer.name}</div>
//                         <div className="text-gray-500">{trainer.email}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainer.specialization}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainer.experience}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <Badge variant={getStatusBadgeVariant(trainer.status)}>
//                       {trainer.status.charAt(0).toUpperCase() + trainer.status.slice(1)}
//                     </Badge>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex justify-end space-x-2">
//                       <Button variant="outline" size="sm" onClick={() => handleMessage(trainer.phone, trainer.name)}>
//                         <MessageCircle size={16} />
//                       </Button>
//                       <Link to={`/trainers/${trainer.id}`}>
//                         <Button variant="outline" size="sm">
//                           <Edit size={16} />
//                         </Button>
//                       </Link>
//                       <Button variant="outline" size="sm" onClick={() => handleDeleteTrainer(trainer.id)}>
//                         <Trash2 size={16} className="text-red-500" />
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemberList;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Search, Edit, Trash2, UserPlus, MessageCircle } from 'lucide-react';
// import { Member, Trainer } from '../../types';
// import { formatDate } from '../../lib/utils';
// import { supabase } from '../../context/supabaseClient';
// import Input from '../ui/Input';
// import Button from '../ui/Button';
// import Badge from '../ui/Badge';
// import toast from 'react-hot-toast';

// interface MemberListProps {
//   members: Member[];
//   trainers: Trainer[];
//   onDeleteMember: (id: string) => void;
//   onDeleteTrainer: (id: string) => void;
// }

// const MemberList: React.FC<MemberListProps> = ({
//   members,
//   trainers,
//   onDeleteMember,
//   onDeleteTrainer,
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState<string | null>(null);
//   const [memberships, setMemberships] = useState<{ id: string; name: string; duration?: number }[]>([]);

//   useEffect(() => {
//     const fetchMemberships = async () => {
//       const { data, error } = await supabase.from('memberships').select('id, name, duration');
//       if (error) {
//         console.error('Error fetching memberships:', error.message);
//         toast.error('Failed to load membership plans');
//       } else {
//         setMemberships(data || []);
//       }
//     };

//     fetchMemberships();
//   }, []);

//   const getMembershipName = (id: string | undefined | null) => {
//     if (!id || id.toLowerCase() === 'unknown') return 'Unknown';
//     const membership = memberships.find((m) => String(m.id) === String(id));
//     return membership?.name || 'Unknown';
//   };

//   const getStatusBadgeVariant = (status: string) => {
//     switch (status) {
//       case 'active':
//         return 'success';
//       case 'inactive':
//         return 'danger';
//       case 'pending':
//         return 'warning';
//       case 'upcoming':
//         return 'warning';
//       case 'expired':
//         return 'danger';
//       default:
//         return 'default';
//     }
//   };

//   const enrichedMembers = members.map((member) => {
//     const membership = memberships.find((m) => String(m.id) === String(member.membershipId));
//     if (!membership || !member.joinDate) {
//       return member;
//     }

//     const join = new Date(member.joinDate);
//     const dueDate = new Date(join);
//     dueDate.setDate(dueDate.getDate() + Number(membership.duration || 0));

//     const today = new Date();
//     const timeDiff = dueDate.getTime() - today.getTime();
//     const remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

//     let dynamicStatus = 'expired';
//     if (remainingDays > 15) {
//       dynamicStatus = 'active';
//     } else if (remainingDays >= 0 && remainingDays <= 15) {
//       dynamicStatus = 'upcoming';
//     }

//     return {
//       ...member,
//       status: dynamicStatus,
//     };
//   });

//   const filteredMembers = enrichedMembers.filter((member) => {
//     const matchesSearch =
//       member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       member.phone.includes(searchTerm) ||
//       member.memberId.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus = statusFilter ? member.status === statusFilter : true;

//     return matchesSearch && matchesStatus;
//   });

//   const filteredTrainers = trainers.filter((trainer) => {
//     const matchesSearch =
//       trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       trainer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       trainer.phone.includes(searchTerm) ||
//       trainer.trainerId.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus = statusFilter ? trainer.status === statusFilter : true;

//     return matchesSearch && matchesStatus;
//   });

//   // const handleDeleteMember = (id: string) => {
//   //   if (confirm('Are you sure you want to delete this member?')) {
//   //     onDeleteMember(id);
//   //     toast.success('Member deleted successfully');
//   //   }
//   // };
// const handleDeleteMember = async (id: string) => {
//   if (confirm('Are you sure you want to delete this member?')) {
//     const { error } = await supabase.from('members').delete().eq('memberId', id);
//     if (error) {
//       console.error('Failed to delete member:', error.message);
//       toast.error('Failed to delete member');
//     } else {
//       onDeleteMember(id); // update local UI
//       toast.success('Member deleted successfully');
//     }
//   }
// };

//   const handleDeleteTrainer = (id: string) => {
//     if (confirm('Are you sure you want to delete this trainer?')) {
//       onDeleteTrainer(id);
//       toast.success('Trainer deleted successfully');
//     }
//   };

//   const handleMessage = (phone: string, name: string, joinDate?: string, membershipId?: string) => {
//     let message = `Hi ${name}`;
//     if (joinDate && membershipId) {
//       const membership = memberships.find((m) => String(m.id) === String(membershipId));
//       if (membership) {
//         const join = new Date(joinDate);
//         const dueDate = new Date(join);
//         dueDate.setDate(dueDate.getDate() + Number(membership.duration || 0));

//         const expiryDate = dueDate.toLocaleDateString('en-GB', {
//           day: 'numeric',
//           month: 'long',
//           year: 'numeric',
//         });

//         message += `,
// Just a quick reminder — your gym membership is set to expire on ${expiryDate}. Stay on track with your fitness goals by renewing your plan today! 💪
// We’d love to see you continue your journey with us! 🏋️‍♂️✨`;
//       }
//     }

//     const whatsappLink = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
//     window.open(whatsappLink, '_blank');
//   };

//   return (
//     <div className="space-y-4 animate-enter">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <Input
//           placeholder="Search by name, email, phone or ID..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           leftIcon={<Search size={18} />}
//           className="sm:max-w-xs"
//         />
//       </div>

//       {/* Members Table */}
//       <div className="bg-white shadow rounded-lg border border-gray-200 mb-8">
//         <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//           <h2 className="text-lg font-semibold">Members List</h2>
//           <Link to="/members/new">
//             <Button variant="primary" leftIcon={<UserPlus size={16} />}>
//               Add Member
//             </Button>
//           </Link>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membership</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredMembers.map((member) => (
//                 <tr key={member.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.memberId}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="h-10 w-10 flex-shrink-0">
//                         <img
//                           className="h-10 w-10 rounded-full"
//                           src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
//                           alt={member.name}
//                         />
//                       </div>
//                       <div className="ml-4">
//                         <div className="font-medium text-gray-900">{member.name}</div>
//                         <div className="text-gray-500">{member.email}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {getMembershipName(member.membershipId)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {formatDate(member.joinDate)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <Badge variant={getStatusBadgeVariant(member.status)}>
//                       {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
//                     </Badge>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex justify-end space-x-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() =>
//                           handleMessage(member.phone, member.name, member.joinDate, member.membershipId)
//                         }
//                       >
//                         <MessageCircle size={16} />
//                       </Button>
//                       <Link to={`/members/${member.id}`}>
//                         <Button variant="outline" size="sm">
//                           <Edit size={16} />
//                         </Button>
//                       </Link>
//                       <Button variant="outline" size="sm" onClick={() => handleDeleteMember(member.id)}>
//                         <Trash2 size={16} className="text-red-500" />
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Trainers Table */}
//       <div className="bg-white shadow rounded-lg border border-gray-200">
//         <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//           <h2 className="text-lg font-semibold">Trainers List</h2>
//           <Link to="/trainers/new">
//             <Button variant="primary" leftIcon={<UserPlus size={16} />}>
//               Add Trainer
//             </Button>
//           </Link>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredTrainers.map((trainer) => (
//                 <tr key={trainer.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainer.trainerId}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="h-10 w-10 flex-shrink-0">
//                         <img
//                           className="h-10 w-10 rounded-full"
//                           src={trainer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(trainer.name)}&background=0EA5E9&color=fff`}
//                           alt={trainer.name}
//                         />
//                       </div>
//                       <div className="ml-4">
//                         <div className="font-medium text-gray-900">{trainer.name}</div>
//                         <div className="text-gray-500">{trainer.email}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainer.specialization}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainer.experience}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <Badge variant={getStatusBadgeVariant(trainer.status)}>
//                       {trainer.status.charAt(0).toUpperCase() + trainer.status.slice(1)}
//                     </Badge>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex justify-end space-x-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleMessage(trainer.phone, trainer.name)}
//                       >
//                         <MessageCircle size={16} />
//                       </Button>
//                       <Link to={`/trainers/${trainer.id}`}>
//                         <Button variant="outline" size="sm">
//                           <Edit size={16} />
//                         </Button>
//                       </Link>
//                       <Button variant="outline" size="sm" onClick={() => handleDeleteTrainer(trainer.id)}>
//                         <Trash2 size={16} className="text-red-500" />
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemberList;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Edit, Trash2, UserPlus, MessageCircle } from 'lucide-react';
import { Member, Trainer } from '../../types';
import { formatDate } from '../../lib/utils';
import { supabase } from '../../context/supabaseClient';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import toast from 'react-hot-toast';

interface MemberListProps {
  members: Member[];
  trainers: Trainer[];
  onDeleteMember: (id: string) => void;
  onDeleteTrainer: (id: string) => void;
}

const MemberList: React.FC<MemberListProps> = ({
  members,
  trainers,
  onDeleteMember,
  onDeleteTrainer,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [memberships, setMemberships] = useState<{ id: string; name: string; duration?: number }[]>([]);

  useEffect(() => {
    const fetchMemberships = async () => {
      const { data, error } = await supabase.from('memberships').select('id, name, duration');
      if (error) {
        console.error('Error fetching memberships:', error.message);
        toast.error('Failed to load membership plans');
      } else {
        setMemberships(data || []);
      }
    };

    fetchMemberships();
  }, []);

  const getMembershipName = (id: string | undefined | null) => {
    if (!id || id.toLowerCase() === 'unknown') return 'Unknown';
    const membership = memberships.find((m) => String(m.id) === String(id));
    return membership?.name || 'Unknown';
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'danger';
      case 'pending':
        return 'warning';
      case 'upcoming':
        return 'warning';
      case 'expired':
        return 'danger';
      default:
        return 'default';
    }
  };

  const enrichedMembers = members.map((member) => {
    const membership = memberships.find((m) => String(m.id) === String(member.membershipId));
    if (!membership || !member.joinDate) {
      return member;
    }

    const join = new Date(member.joinDate);
    const dueDate = new Date(join);
    dueDate.setDate(dueDate.getDate() + Number(membership.duration || 0));

    const today = new Date();
    const timeDiff = dueDate.getTime() - today.getTime();
    const remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    let dynamicStatus = 'expired';
    if (remainingDays > 15) {
      dynamicStatus = 'active';
    } else if (remainingDays >= 0 && remainingDays <= 15) {
      dynamicStatus = 'upcoming';
    }

    return {
      ...member,
      status: dynamicStatus,
    };
  });

  const filteredMembers = enrichedMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm) ||
      member.memberId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? member.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSearch =
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.phone.includes(searchTerm) ||
      trainer.trainerId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? trainer.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  const handleDeleteMember = async (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      const { error } = await supabase.from('members').delete().eq('memberId', id);
      if (error) {
        console.error('Failed to delete member:', error.message);
        toast.error('Failed to delete member');
      } else {
        onDeleteMember(id);
        toast.success('Member deleted successfully');
      }
    }
  };

  const handleDeleteTrainer = (id: string) => {
    if (confirm('Are you sure you want to delete this trainer?')) {
      onDeleteTrainer(id);
      toast.success('Trainer deleted successfully');
    }
  };

  const handleMessage = (phone: string, name: string, joinDate?: string, membershipId?: string) => {
    let message = `Hi ${name}`;
    if (joinDate && membershipId) {
      const membership = memberships.find((m) => String(m.id) === String(membershipId));
      if (membership) {
        const join = new Date(joinDate);
        const dueDate = new Date(join);
        dueDate.setDate(dueDate.getDate() + Number(membership.duration || 0));

        const expiryDate = dueDate.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });

        message += `,
Just a quick reminder — your gym membership is set to expire on ${expiryDate}. Stay on track with your fitness goals by renewing your plan today! 💪
We’d love to see you continue your journey with us! 🏋️‍♂️✨`;
      }
    }

    const whatsappLink = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  const renderAvatar = (imageUrl: string | null | undefined, name: string) => {
    if (imageUrl) {
      return (
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={imageUrl}
          alt={name}
        />
      );
    }

    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    return (
      <div className="h-10 w-10 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-medium">
        {initials}
      </div>
    );
  };

  return (
    <div className="space-y-4 animate-enter">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Input
          placeholder="Search by name, email, phone or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<Search size={18} />}
          className="sm:max-w-xs"
        />
      </div>

      {/* Members Table */}
      <div className="bg-white shadow rounded-lg border border-gray-200 mb-8">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Members List</h2>
          <Link to="/members/new">
            <Button variant="primary" leftIcon={<UserPlus size={16} />}>
              Add Member
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membership</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">{member.memberId}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {renderAvatar(member.profileImage, member.name)}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {getMembershipName(member.membershipId)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(member.joinDate)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getStatusBadgeVariant(member.status)}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() =>
                        handleMessage(member.phone, member.name, member.joinDate, member.membershipId)
                      }>
                        <MessageCircle size={16} />
                      </Button>
                      <Link to={`/members/${member.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit size={16} />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteMember(member.id)}>
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trainers Table */}
      <div className="bg-white shadow rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Trainers List</h2>
          <Link to="/trainers/new">
            <Button variant="primary" leftIcon={<UserPlus size={16} />}>
              Add Trainer
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTrainers.map((trainer) => (
                <tr key={trainer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">{trainer.trainerId}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                       {renderAvatar(trainer.imageUrl, trainer.name)}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{trainer.name}</div>
                        <div className="text-gray-500">{trainer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{trainer.specialization}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{trainer.experience}</td>
                  <td className="px-6 py-4">
                    <Badge variant={getStatusBadgeVariant(trainer.status)}>
                      {trainer.status.charAt(0).toUpperCase() + trainer.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleMessage(trainer.phone, trainer.name)}>
                        <MessageCircle size={16} />
                      </Button>
                      <Link to={`/trainers/${trainer.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit size={16} />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteTrainer(trainer.id)}>
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemberList;

