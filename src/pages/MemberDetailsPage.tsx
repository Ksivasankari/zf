// import React, { useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { ArrowLeft, User, Calendar, Clock, CreditCard, Mail, Phone, Dumbbell } from 'lucide-react';
// import { memberships, trainers } from '../data/mockData';
// import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
// import Badge from '../components/ui/Badge';
// import Button from '../components/ui/Button';
// import Input from '../components/ui/Input';
// import { formatDate } from '../lib/utils';
// import { useMemberContext } from '../context/MemberContext';
// import toast from 'react-hot-toast';

// const MemberDetailsPage: React.FC = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { members, updateMember } = useMemberContext();
//   const member = members.find(m => m.id === id);
//   const membership = memberships.find(m => m.id === member?.membershipId);
//   const assignedTrainer = trainers.find(t => t.id === member?.trainerId);

//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: member?.name || '',
//     email: member?.email || '',
//     phone: member?.phone || '',
//     membershipId: member?.membershipId || '',
//     trainerId: member?.trainerId || '',
//   });

//   if (!member) {
//     return (
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900">Member not found</h2>
//           <p className="mt-2 text-gray-600">The member you're looking for doesn't exist.</p>
//           <Link to="/members" className="mt-4 inline-block">
//             <Button variant="primary" leftIcon={<ArrowLeft size={16} />}>
//               Back to Members
//             </Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const handleSave = () => {
//     const updatedMember = {
//       ...member,
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       membershipId: formData.membershipId,
//       trainerId: formData.trainerId || undefined,
//     };

//     updateMember(updatedMember);
//     setIsEditing(false);
//     toast.success('Member details updated successfully');
//   };

//   // Calculate membership due date
//   const joinDate = new Date(member.joinDate);
//   const dueDate = new Date(joinDate);
//   dueDate.setDate(dueDate.getDate() + (membership?.duration || 0));

//   const daysLeft = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

//   return (
//     <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-6">
//         <Link to="/members" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Members
//         </Link>
//       </div>

//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <img
//                 src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
//                 alt={member.name}
//                 className="h-16 w-16 rounded-full"
//               />
//               <div className="ml-4">
//                 {isEditing ? (
//                   <Input
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     className="font-bold text-xl"
//                   />
//                 ) : (
//                   <h1 className="text-2xl font-bold text-gray-900">{member.name}</h1>
//                 )}
//                 <div className="mt-1 flex items-center">
//                   <Badge variant={member.status === 'active' ? 'success' : member.status === 'pending' ? 'warning' : 'danger'}>
//                     {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
//                   </Badge>
//                   <span className="ml-2 text-sm text-gray-500">Member ID: {member.memberId}</span>
//                 </div>
//               </div>
//             </div>
//             {isEditing ? (
//               <div className="flex gap-2">
//                 <Button variant="outline" onClick={() => setIsEditing(false)}>
//                   Cancel
//                 </Button>
//                 <Button variant="primary" onClick={handleSave}>
//                   Save Changes
//                 </Button>
//               </div>
//             ) : (
//               <Button variant="outline" onClick={() => setIsEditing(true)}>
//                 Edit Details
//               </Button>
//             )}
//           </div>
//         </div>

//         <div className="px-4 py-5 sm:p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Personal Information</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <dl className="space-y-4">
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <Mail className="h-4 w-4 mr-2" />
//                       Email
//                     </dt>
//                     <dd className="text-sm text-gray-900">
//                       {isEditing ? (
//                         <Input
//                           value={formData.email}
//                           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                         />
//                       ) : (
//                         member.email
//                       )}
//                     </dd>
//                   </div>
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <Phone className="h-4 w-4 mr-2" />
//                       Phone
//                     </dt>
//                     <dd className="text-sm text-gray-900">
//                       {isEditing ? (
//                         <Input
//                           value={formData.phone}
//                           onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                         />
//                       ) : (
//                         member.phone
//                       )}
//                     </dd>
//                   </div>
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <Calendar className="h-4 w-4 mr-2" />
//                       Joined
//                     </dt>
//                     <dd className="text-sm text-gray-900">{formatDate(member.joinDate)}</dd>
//                   </div>
//                 </dl>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Membership Details</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <dl className="space-y-4">
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <CreditCard className="h-4 w-4 mr-2" />
//                       Plan
//                     </dt>
//                     <dd className="text-sm text-gray-900">
//                       {isEditing ? (
//                         <select
//                           value={formData.membershipId}
//                           onChange={(e) => setFormData({ ...formData, membershipId: e.target.value })}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
//                         >
//                           {memberships.map((m) => (
//                             <option key={m.id} value={m.id}>
//                               {m.name}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         membership?.name
//                       )}
//                     </dd>
//                   </div>
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <Clock className="h-4 w-4 mr-2" />
//                       Duration
//                     </dt>
//                     <dd className="text-sm text-gray-900">{membership?.duration} days</dd>
//                   </div>
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <Calendar className="h-4 w-4 mr-2" />
//                       Due Date
//                     </dt>
//                     <dd className="text-sm text-gray-900">
//                       {formatDate(dueDate)}
//                       <span className={`ml-2 text-xs ${
//                         daysLeft <= 7 ? 'text-red-600' : daysLeft <= 30 ? 'text-amber-600' : 'text-green-600'
//                       }`}>
//                         ({daysLeft} days left)
//                       </span>
//                     </dd>
//                   </div>
//                 </dl>
//               </CardContent>
//             </Card>

//             <Card className="md:col-span-2">
//               <CardHeader>
//                 <CardTitle>Assigned Trainer</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {isEditing ? (
//                   <select
//                     value={formData.trainerId}
//                     onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
//                   >
//                     <option value="">No trainer assigned</option>
//                     {trainers.map((trainer) => (
//                       <option key={trainer.id} value={trainer.id}>
//                         {trainer.name} - {trainer.specialization}
//                       </option>
//                     ))}
//                   </select>
//                 ) : assignedTrainer ? (
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <img
//                         src={assignedTrainer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(assignedTrainer.name)}&background=0EA5E9&color=fff`}
//                         alt={assignedTrainer.name}
//                         className="h-12 w-12 rounded-full"
//                       />
//                       <div className="ml-4">
//                         <p className="text-sm font-medium text-gray-900">{assignedTrainer.name}</p>
//                         <p className="text-sm text-gray-500">{assignedTrainer.specialization}</p>
//                       </div>
//                     </div>
//                     <Link to={`/trainers/${assignedTrainer.id}`}>
//                       <Button variant="outline" size="sm">
//                         View Trainer Profile
//                       </Button>
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="text-center py-4">
//                     <Dumbbell className="mx-auto h-12 w-12 text-gray-400" />
//                     <p className="mt-2 text-sm text-gray-500">No trainer assigned</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemberDetailsPage;

// import React, { useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { ArrowLeft, User, Calendar, Clock, CreditCard, Mail, Phone, Dumbbell } from 'lucide-react';
// import { memberships, trainers } from '../data/mockData';
// import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
// import Badge from '../components/ui/Badge';
// import Button from '../components/ui/Button';
// import Input from '../components/ui/Input';
// import { formatDate } from '../lib/utils';
// import { useMemberContext } from '../context/MemberContext';
// import toast from 'react-hot-toast';

// const MemberDetailsPage: React.FC = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { members, updateMember } = useMemberContext();
//   const member = members.find(m => String(m.id) === id);
//   // const membership = memberships.find(m => m.id === member?.membershipId);
//   const membership = memberships.find(m => String(m.id) === String(member?.membershipId));

//   const assignedTrainer = trainers.find(t => t.id === member?.trainerId);

//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: member?.name || '',
//     email: member?.email || '',
//     phone: member?.phone || '',
//     membershipId: String(member?.membershipId || ''),
//     trainerId: String(member?.trainerId || ''),
//   });

//   if (!member) {
//     return (
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900">Member not found</h2>
//           <p className="mt-2 text-gray-600">The member you're looking for doesn't exist.</p>
//           <Link to="/members" className="mt-4 inline-block">
//             <Button variant="primary" leftIcon={<ArrowLeft size={16} />}>
//               Back to Members
//             </Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const handleSave = () => {
//     if (!formData.name || !formData.email || !formData.phone) {
//       toast.error('Name, email, and phone are required');
//       return;
//     }

//     const updatedMember = {
//       ...member,
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       membershipId: parseInt(formData.membershipId),
//       trainerId: formData.trainerId ? parseInt(formData.trainerId) : undefined,
//     };

//     updateMember(updatedMember);
//     setIsEditing(false);
//     toast.success('Member details updated successfully');
//   };

//   const joinDate = new Date(member.joinDate);
//   const dueDate = new Date(joinDate);
//   dueDate.setDate(dueDate.getDate() + (membership?.duration || 0));

//   const daysLeft = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

//   return (
//     <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-6">
//         <Link to="/members" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Members
//         </Link>
//       </div>

//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <img
//                 src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
//                 alt={member.name}
//                 className="h-16 w-16 rounded-full"
//               />
//               <div className="ml-4">
//                 {isEditing ? (
//                   <Input
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     className="font-bold text-xl"
//                   />
//                 ) : (
//                   <h1 className="text-2xl font-bold text-gray-900">{member.name}</h1>
//                 )}
//                 <div className="mt-1 flex items-center">
//                   <Badge variant={member.status === 'active' ? 'success' : member.status === 'pending' ? 'warning' : 'danger'}>
//                     {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
//                   </Badge>
//                   <span className="ml-2 text-sm text-gray-500">Member ID: {member.memberId}</span>
//                 </div>
//               </div>
//             </div>
//             {isEditing ? (
//               <div className="flex gap-2">
//                 <Button variant="outline" onClick={() => setIsEditing(false)}>
//                   Cancel
//                 </Button>
//                 <Button variant="primary" onClick={handleSave}>
//                   Save Changes
//                 </Button>
//               </div>
//             ) : (
//               <Button variant="outline" onClick={() => setIsEditing(true)}>
//                 Edit Details
//               </Button>
//             )}
//           </div>
//         </div>

//         <div className="px-4 py-5 sm:p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Personal Information</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <dl className="space-y-4">
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <Mail className="h-4 w-4 mr-2" />
//                       Email
//                     </dt>
//                     <dd className="text-sm text-gray-900">
//                       {isEditing ? (
//                         <Input
//                           value={formData.email}
//                           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                         />
//                       ) : (
//                         member.email
//                       )}
//                     </dd>
//                   </div>
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <Phone className="h-4 w-4 mr-2" />
//                       Phone
//                     </dt>
//                     <dd className="text-sm text-gray-900">
//                       {isEditing ? (
//                         <Input
//                           value={formData.phone}
//                           onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                         />
//                       ) : (
//                         member.phone
//                       )}
//                     </dd>
//                   </div>
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <Calendar className="h-4 w-4 mr-2" />
//                       Joined
//                     </dt>
//                     <dd className="text-sm text-gray-900">{formatDate(member.joinDate)}</dd>
//                   </div>
//                 </dl>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Membership Details</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <dl className="space-y-4">
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <CreditCard className="h-4 w-4 mr-2" />
//                       Plan
//                     </dt>
//                     <dd className="text-sm text-gray-900">
//                       {isEditing ? (
//                         <select
//                           value={formData.membershipId || ''}
//                           onChange={(e) => setFormData({ ...formData, membershipId: e.target.value })}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
//                         >
//                           {memberships
//                             .sort((a, b) => a.name.localeCompare(b.name))
//                             .map((m) => (
//                               <option key={m.id} value={m.id}>
//                                 {m.name}
//                               </option>
//                             ))}
//                         </select>
//                       ) : (
//                         membership?.name
//                       )}
//                     </dd>
//                   </div>
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <Clock className="h-4 w-4 mr-2" />
//                       Duration
//                     </dt>
//                     <dd className="text-sm text-gray-900">{membership?.duration} days</dd>
//                   </div>
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <Calendar className="h-4 w-4 mr-2" />
//                       Due Date
//                     </dt>
//                     <dd className="text-sm text-gray-900">
//                       {formatDate(dueDate)}
//                       <span
//                         className={`ml-2 text-xs ${
//                           daysLeft <= 7 ? 'text-red-600' : daysLeft <= 30 ? 'text-amber-600' : 'text-green-600'
//                         }`}
//                       >
//                         ({daysLeft} days left)
//                       </span>
//                     </dd>
//                   </div>
//                 </dl>
//               </CardContent>
//             </Card>

//             <Card className="md:col-span-2">
//               <CardHeader>
//                 <CardTitle>Assigned Trainer</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {isEditing ? (
//                   <select
//                     value={formData.trainerId || ''}
//                     onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
//                   >
//                     <option value="">No trainer assigned</option>
//                     {trainers
//                       .sort((a, b) => a.name.localeCompare(b.name))
//                       .map((trainer) => (
//                         <option key={trainer.id} value={trainer.id}>
//                           {trainer.name} - {trainer.specialization}
//                         </option>
//                       ))}
//                   </select>
//                 ) : assignedTrainer ? (
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <img
//                         src={
//                           assignedTrainer.avatar ||
//                           `https://ui-avatars.com/api/?name=${encodeURIComponent(assignedTrainer.name)}&background=0EA5E9&color=fff`
//                         }
//                         alt={assignedTrainer.name}
//                         className="h-12 w-12 rounded-full"
//                       />
//                       <div className="ml-4">
//                         <p className="text-sm font-medium text-gray-900">{assignedTrainer.name}</p>
//                         <p className="text-sm text-gray-500">{assignedTrainer.specialization}</p>
//                       </div>
//                     </div>
//                     <Link to={`/trainers/${assignedTrainer.id}`}>
//                       <Button variant="outline" size="sm">
//                         View Trainer Profile
//                       </Button>
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="text-center py-4">
//                     <Dumbbell className="mx-auto h-12 w-12 text-gray-400" />
//                     <p className="mt-2 text-sm text-gray-500">No trainer assigned</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemberDetailsPage;

// import React, { useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { ArrowLeft, User, Calendar, Clock, CreditCard, Mail, Phone, Dumbbell } from 'lucide-react';
// import { memberships, trainers } from '../data/mockData';
// import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
// import Badge from '../components/ui/Badge';
// import Button from '../components/ui/Button';
// import Input from '../components/ui/Input';
// import { formatDate } from '../lib/utils';
// import { useMemberContext } from '../context/MemberContext';
// import toast from 'react-hot-toast';

// const MemberDetailsPage: React.FC = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { members, updateMember } = useMemberContext();
//   const member = members.find(m => String(m.id) === id);

//   const membership = memberships.find(m => String(m.id) === String(member?.membershipId));
//   const assignedTrainer = trainers.find(t => String(t.id) === String(member?.trainerId));

//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: member?.name || '',
//     email: member?.email || '',
//     phone: member?.phone || '',
//     membershipId: member?.membershipId ? String(member.membershipId) : '',
//     trainerId: member?.trainerId ? String(member.trainerId) : '',
//   });

//   if (!member) {
//     return (
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900">Member not found</h2>
//           <p className="mt-2 text-gray-600">The member you're looking for doesn't exist.</p>
//           <Link to="/members" className="mt-4 inline-block">
//             <Button variant="primary" leftIcon={<ArrowLeft size={16} />}>
//               Back to Members
//             </Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const handleSave = () => {
//     if (!formData.name || !formData.email || !formData.phone) {
//       toast.error('Name, email, and phone are required');
//       return;
//     }

//     const updatedMember = {
//       ...member,
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       membershipId: parseInt(formData.membershipId),
//       trainerId: formData.trainerId ? parseInt(formData.trainerId) : undefined,
//     };

//     updateMember(updatedMember);
//     setIsEditing(false);
//     toast.success('Member details updated successfully');
//   };

//   const joinDate = new Date(member.joinDate);
//   const dueDate = new Date(joinDate);
//   dueDate.setDate(dueDate.getDate() + (membership?.duration || 0));
//   const daysLeft = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

//   return (
//     <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-6">
//         <Link to="/members" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Members
//         </Link>
//       </div>

//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <img
//                 src={
//                   member.avatar ||
//                   `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`
//                 }
//                 alt={member.name}
//                 className="h-16 w-16 rounded-full"
//               />
//               <div className="ml-4">
//                 {isEditing ? (
//                   <Input
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     className="font-bold text-xl"
//                   />
//                 ) : (
//                   <h1 className="text-2xl font-bold text-gray-900">{member.name}</h1>
//                 )}
//                 <div className="mt-1 flex items-center">
//                   <Badge variant={member.status === 'active' ? 'success' : member.status === 'pending' ? 'warning' : 'danger'}>
//                     {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
//                   </Badge>
//                   <span className="ml-2 text-sm text-gray-500">Member ID: {member.memberId}</span>
//                 </div>
//               </div>
//             </div>
//             {isEditing ? (
//               <div className="flex gap-2">
//                 <Button variant="outline" onClick={() => setIsEditing(false)}>
//                   Cancel
//                 </Button>
//                 <Button variant="primary" onClick={handleSave}>
//                   Save Changes
//                 </Button>
//               </div>
//             ) : (
//               <Button variant="outline" onClick={() => setIsEditing(true)}>
//                 Edit Details
//               </Button>
//             )}
//           </div>
//         </div>

//         <div className="px-4 py-5 sm:p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Personal Info */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Personal Information</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <dl className="space-y-4">
//                   {/* Email */}
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <Mail className="h-4 w-4 mr-2" /> Email
//                     </dt>
//                     <dd className="text-sm text-gray-900">
//                       {isEditing ? (
//                         <Input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//                       ) : (
//                         member.email
//                       )}
//                     </dd>
//                   </div>

//                   {/* Phone */}
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <Phone className="h-4 w-4 mr-2" /> Phone
//                     </dt>
//                     <dd className="text-sm text-gray-900">
//                       {isEditing ? (
//                         <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
//                       ) : (
//                         member.phone
//                       )}
//                     </dd>
//                   </div>

//                   {/* Join Date */}
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <Calendar className="h-4 w-4 mr-2" /> Joined
//                     </dt>
//                     <dd className="text-sm text-gray-900">{formatDate(member.joinDate)}</dd>
//                   </div>
//                 </dl>
//               </CardContent>
//             </Card>

//             {/* Membership Info */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Membership Details</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <dl className="space-y-4">
//                   {/* Plan */}
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <CreditCard className="h-4 w-4 mr-2" /> Plan
//                     </dt>
//                     <dd className="text-sm text-gray-900">
//                       {isEditing ? (
//                         <select
//                           value={formData.membershipId}
//                           onChange={(e) => setFormData({ ...formData, membershipId: e.target.value })}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
//                         >
//                           {memberships.sort((a, b) => a.name.localeCompare(b.name)).map((m) => (
//                             <option key={m.id} value={String(m.id)}>
//                               {m.name}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         membership?.name
//                       )}
//                     </dd>
//                   </div>

//                   {/* Duration */}
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <Clock className="h-4 w-4 mr-2" /> Duration
//                     </dt>
//                     <dd className="text-sm text-gray-900">{membership?.duration} days</dd>
//                   </div>

//                   {/* Due Date */}
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <Calendar className="h-4 w-4 mr-2" /> Due Date
//                     </dt>
//                     <dd className="text-sm text-gray-900">
//                       {formatDate(dueDate)}
//                       <span className={`ml-2 text-xs ${daysLeft <= 7 ? 'text-red-600' : daysLeft <= 30 ? 'text-amber-600' : 'text-green-600'}`}>
//                         ({daysLeft} days left)
//                       </span>
//                     </dd>
//                   </div>
//                 </dl>
//               </CardContent>
//             </Card>

//             {/* Trainer Info */}
//             <Card className="md:col-span-2">
//               <CardHeader>
//                 <CardTitle>Assigned Trainer</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {isEditing ? (
//                   <select
//                     value={formData.trainerId}
//                     onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
//                   >
//                     <option value="">No trainer assigned</option>
//                     {trainers.sort((a, b) => a.name.localeCompare(b.name)).map((trainer) => (
//                       <option key={trainer.id} value={String(trainer.id)}>
//                         {trainer.name} - {trainer.specialization}
//                       </option>
//                     ))}
//                   </select>
//                 ) : assignedTrainer ? (
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <img
//                         src={
//                           assignedTrainer.avatar ||
//                           `https://ui-avatars.com/api/?name=${encodeURIComponent(assignedTrainer.name)}&background=0EA5E9&color=fff`
//                         }
//                         alt={assignedTrainer.name}
//                         className="h-12 w-12 rounded-full"
//                       />
//                       <div className="ml-4">
//                         <p className="text-sm font-medium text-gray-900">{assignedTrainer.name}</p>
//                         <p className="text-sm text-gray-500">{assignedTrainer.specialization}</p>
//                       </div>
//                     </div>
//                     <Link to={`/trainers/${assignedTrainer.id}`}>
//                       <Button variant="outline" size="sm">
//                         View Trainer Profile
//                       </Button>
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="text-center py-4">
//                     <Dumbbell className="mx-auto h-12 w-12 text-gray-400" />
//                     <p className="mt-2 text-sm text-gray-500">No trainer assigned</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemberDetailsPage;



// import React, { useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import {
//   ArrowLeft, User, Calendar, Clock, CreditCard, Mail, Phone, Dumbbell,
// } from 'lucide-react';
// import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
// import Badge from '../components/ui/Badge';
// import Button from '../components/ui/Button';
// import Input from '../components/ui/Input';
// import { formatDate } from '../lib/utils';
// import { useMemberContext } from '../context/MemberContext';
// import toast from 'react-hot-toast';

// const MemberDetailsPage: React.FC = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { members, memberships, trainers, updateMember } = useMemberContext();

//   const member = members.find(m => String(m.id) === id);

//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: member?.name || '',
//     email: member?.email || '',
//     phone: member?.phone || '',
//     membershipId: member?.membershipId ? String(member.membershipId) : '',
//     trainerId: member?.trainerId ? String(member.trainerId) : '',
//   });

//   if (!member) {
//     return (
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900">Member not found</h2>
//           <Link to="/members" className="mt-4 inline-block">
//             <Button variant="primary" leftIcon={<ArrowLeft size={16} />}>
//               Back to Members
//             </Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const handleSave = () => {
//     if (!formData.name || !formData.email || !formData.phone) {
//       toast.error('Name, email, and phone are required');
//       return;
//     }

//     const updatedMember = {
//       ...member,
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       membershipId: parseInt(formData.membershipId),
//       trainerId: formData.trainerId ? parseInt(formData.trainerId) : undefined,
//     };

//     updateMember(updatedMember);
//     setIsEditing(false);
//     toast.success('Member details updated successfully');
//   };

//   const membership = memberships.find(m => String(m.id) === String(member.membershipId));
//   const assignedTrainer = trainers.find(t => String(t.id) === String(member.trainerId));

//   const joinDate = new Date(member.joinDate);
//   const dueDate = new Date(joinDate);
//   dueDate.setDate(dueDate.getDate() + (membership?.duration || 0));
//   const daysLeft = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

//   return (
//     <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-6">
//         <Link to="/members" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Members
//         </Link>
//       </div>

//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <img
//                 src={
//                   member.avatar ||
//                   `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`
//                 }
//                 alt={member.name}
//                 className="h-16 w-16 rounded-full"
//               />
//               <div className="ml-4">
//                 {isEditing ? (
//                   <Input
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     className="font-bold text-xl"
//                   />
//                 ) : (
//                   <h1 className="text-2xl font-bold text-gray-900">{member.name}</h1>
//                 )}
//                 <div className="mt-1 flex items-center">
//                   <Badge
//                     variant={
//                       member.status === 'active'
//                         ? 'success'
//                         : member.status === 'pending'
//                         ? 'warning'
//                         : 'danger'
//                     }
//                   >
//                     {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
//                   </Badge>
//                   <span className="ml-2 text-sm text-gray-500">Member ID: {member.memberId}</span>
//                 </div>
//               </div>
//             </div>
//             {isEditing ? (
//               <div className="flex gap-2">
//                 <Button variant="outline" onClick={() => setIsEditing(false)}>
//                   Cancel
//                 </Button>
//                 <Button variant="primary" onClick={handleSave}>
//                   Save Changes
//                 </Button>
//               </div>
//             ) : (
//               <Button variant="outline" onClick={() => setIsEditing(true)}>
//                 Edit Details
//               </Button>
//             )}
//           </div>
//         </div>

//         <div className="px-4 py-5 sm:p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Personal Information</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="flex items-center">
//                     <Mail className="h-4 w-4 mr-2" />
//                     {isEditing ? (
//                       <Input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//                     ) : (
//                       <span>{member.email}</span>
//                     )}
//                   </div>
//                   <div className="flex items-center">
//                     <Phone className="h-4 w-4 mr-2" />
//                     {isEditing ? (
//                       <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
//                     ) : (
//                       <span>{member.phone}</span>
//                     )}
//                   </div>
//                   <div className="flex items-center">
//                     <Calendar className="h-4 w-4 mr-2" />
//                     <span>{formatDate(member.joinDate)}</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Membership Details</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="flex items-center">
//                     <CreditCard className="h-4 w-4 mr-2" />
//                     {isEditing ? (
//                       <select
//                         value={formData.membershipId}
//                         onChange={(e) => setFormData({ ...formData, membershipId: e.target.value })}
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
//                       >
//                         {memberships.map((m) => (
//                           <option key={m.id} value={String(m.id)}>
//                             {m.name}
//                           </option>
//                         ))}
//                       </select>
//                     ) : (
//                       <span>{membership?.name || 'Unknown'}</span>
//                     )}
//                   </div>
//                   <div className="flex items-center">
//                     <Clock className="h-4 w-4 mr-2" />
//                     <span>{membership?.duration ? `${membership.duration} days` : 'Unknown'}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Dumbbell className="h-4 w-4 mr-2" />
//                     {isEditing ? (
//                       <select
//                         value={formData.trainerId}
//                         onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
//                       >
//                         <option value="">None</option>
//                         {trainers.map((t) => (
//                           <option key={t.id} value={String(t.id)}>
//                             {t.name}
//                           </option>
//                         ))}
//                       </select>
//                     ) : (
//                       <span>{assignedTrainer?.name || 'No trainer assigned'}</span>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemberDetailsPage;

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Mail, Phone, Calendar, CreditCard, Clock, Dumbbell
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { formatDate } from '../lib/utils';
import { useMemberContext } from '../context/MemberContext';
import toast from 'react-hot-toast';
import { supabase } from '../context/supabaseClient'; // ⬅️ make sure this is your Supabase client

const MemberDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { members, memberships, trainers, updateMember } = useMemberContext();

  const member = members.find(m => String(m.id) === id);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: member?.name || '',
    email: member?.email || '',
    phone: member?.phone || '',
    membershipId: member?.membershipId ? String(member.membershipId) : '',
    trainerId: member?.trainerId ? String(member.trainerId) : '',
    imageUrl: member?.profileImage || '',
  });

  if (!member) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Member not found</h2>
        <Link to="/members" className="mt-4 inline-block">
          <Button variant="primary" leftIcon={<ArrowLeft size={16} />}>
            Back to Members
          </Button>
        </Link>
      </div>
    );
  }

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Name, email, and phone are required');
      return;
    }

    const updatedMember = {
      ...member,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      profileImage: formData.imageUrl,
      membershipId: formData.membershipId, // string
      trainerId: formData.trainerId || undefined, // string or undefined
    };

    updateMember(updatedMember);
    setIsEditing(false);
    toast.success('Member details updated successfully');
  };

  const handleImageUpload = async (file: File | undefined) => {
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `member-images/${fileName}`;

    const { error } = await supabase.storage
      .from('member-photos') // ⬅️ REPLACE with your Supabase bucket name
      .upload(filePath, file);

    if (error) {
      toast.error('Image upload failed');
      return;
    }

    const { data: urlData } = supabase.storage
      .from('member-photos')
      .getPublicUrl(filePath);

    if (urlData?.publicUrl) {
      setFormData((prev) => ({ ...prev, imageUrl: urlData.publicUrl }));
      toast.success('Image uploaded');
    }
  };

  const membership = memberships.find(m => String(m.id) === String(member.membershipId));
  const assignedTrainer = trainers.find(t => String(t.id) === String(member.trainerId));

  const joinDate = new Date(member.joinDate);
  const dueDate = new Date(joinDate);
  dueDate.setDate(dueDate.getDate() + Number(membership?.duration || 0));

  const daysLeft = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/members" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={
                  formData.imageUrl?.trim()
                    ? formData.imageUrl
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`
                }
                alt={member.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="ml-4">
                {isEditing ? (
                  <>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="font-bold text-xl"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files?.[0])}
                      className="mt-2 text-sm"
                    />
                  </>
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">{member.name}</h1>
                )}
                <div className="mt-1 flex items-center">
                  <Badge
                    variant={
                      member.status === 'active'
                        ? 'success'
                        : member.status === 'pending'
                        ? 'warning'
                        : 'danger'
                    }
                  >
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </Badge>
                  <span className="ml-2 text-sm text-gray-500">Member ID: {member.memberId}</span>
                </div>
              </div>
            </div>
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit Details
              </Button>
            )}
          </div>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {isEditing ? (
                      <Input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    ) : (
                      <span>{member.email}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {isEditing ? (
                      <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    ) : (
                      <span>{member.phone}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(member.joinDate)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Membership Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    {isEditing ? (
                      <select
                        value={formData.membershipId}
                        onChange={(e) => setFormData({ ...formData, membershipId: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      >
                        {memberships.map((m) => (
                          <option key={m.id} value={String(m.id)}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span>{membership?.name || 'Unknown'}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{membership?.duration ? `${membership.duration} days` : 'Unknown'}</span>
                  </div>
                  <div className="flex items-center">
                    <Dumbbell className="h-4 w-4 mr-2" />
                    {isEditing ? (
                      <select
                        value={formData.trainerId}
                        onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      >
                        <option value="">None</option>
                        {trainers.map((t) => (
                          <option key={t.id} value={String(t.id)}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span>{assignedTrainer?.name || 'No trainer assigned'}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsPage;

