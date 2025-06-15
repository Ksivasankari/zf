// import React, { useState } from 'react';
// import { Users, Activity, AlertCircle, Clock, X } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import PageHeader from '../components/layout/PageHeader';
// import StatCard from '../components/dashboard/StatCard';
// import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
// import { dashboardSummary } from '../data/mockData';
// import { formatDate, formatTime } from '../lib/utils';
// import Button from '../components/ui/Button';
// import { Link } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { useMemberContext } from '../context/MemberContext';

// const DashboardPage: React.FC = () => {
//   const { user } = useAuth();
//   const { members } = useMemberContext();
//   const [showModal, setShowModal] = useState<'all' | 'checkedIn' | 'expired' | 'expiring' | null>(null);

//   const handleWhatsAppMessage = (phone: string, name: string) => {
//     toast.success(`Message sent to ${name}`);
//   };

//   const Modal = ({ title, children }: { title: string; children: React.ReactNode }) => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">{title}</h3>
//           <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-gray-700">
//             <X size={20} />
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );

//   const MemberList = ({ members }: { members: any[] }) => (
//     <div className="divide-y divide-gray-200">
//       {members.map((member) => (
//         <div key={member.id} className="py-3 flex items-center justify-between">
//           <div className="flex items-center">
//             <img
//               className="h-10 w-10 rounded-full"
//               src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
//               alt={member.name}
//             />
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-900">{member.name}</p>
//               <p className="text-xs text-gray-500">{member.email}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => handleWhatsAppMessage(member.phone, member.name)}
//             >
//               Message
//             </Button>
//             <Link to={`/members/${member.id}`}>
//               <Button variant="outline" size="sm">View</Button>
//             </Link>
//           </div>
//         </div>
//       ))}
//       {members.length === 0 && (
//         <p className="text-center py-4 text-gray-500">No members found</p>
//       )}
//     </div>
//   );
  
//   return (
//     <div>
//       <PageHeader 
//         title={`Welcome back, ${user?.name?.split(' ')[0] || 'User'}`} 
//         description="Here's what's happening at your gym today."
//       />
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <div onClick={() => setShowModal('all')} className="cursor-pointer">
//           <StatCard
//             title="Total Members"
//             value={dashboardSummary.totalMembers}
//             icon={<Users className="h-full w-full" />}
//             change={{ value: 4.5, isPositive: true }}
//           />
//         </div>
        
//         <div onClick={() => setShowModal('checkedIn')} className="cursor-pointer">
//           <StatCard
//             title="Checked In Today"
//             value={dashboardSummary.checkedInToday}
//             icon={<Activity className="h-full w-full" />}
//             change={{ value: 1.2, isPositive: false }}
//             iconColor="text-secondary-600"
//             iconBackground="bg-secondary-100"
//           />
//         </div>

//         <div onClick={() => setShowModal('expired')} className="cursor-pointer">
//           <StatCard
//             title="Expired Members"
//             value={dashboardSummary.expiredMembers}
//             icon={<AlertCircle className="h-full w-full" />}
//             iconColor="text-red-600"
//             iconBackground="bg-red-100"
//           />
//         </div>

//         <div onClick={() => setShowModal('expiring')} className="cursor-pointer">
//           <StatCard
//             title="Expiring Soon"
//             value={dashboardSummary.expiringMembers}
//             icon={<Clock className="h-full w-full" />}
//             iconColor="text-amber-600"
//             iconBackground="bg-amber-100"
//           />
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>Expired Memberships</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <MemberList members={dashboardSummary.expiredMembersList} />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Expiring Soon</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <MemberList members={dashboardSummary.expiringMembersList} />
//           </CardContent>
//         </Card>
//       </div>

//       {showModal === 'all' && (
//         <Modal title="All Members">
//           <MemberList members={members} />
//         </Modal>
//       )}

//       {showModal === 'checkedIn' && (
//         <Modal title="Members Checked In Today">
//           <MemberList 
//             members={members.filter(member => 
//               dashboardSummary.recentAttendance.some(
//                 attendance => 
//                   attendance.memberId === member.id && 
//                   new Date(attendance.checkIn).toDateString() === new Date().toDateString()
//               )
//             )} 
//           />
//         </Modal>
//       )}

//       {showModal === 'expired' && (
//         <Modal title="Expired Memberships">
//           <MemberList members={dashboardSummary.expiredMembersList} />
//         </Modal>
//       )}

//       {showModal === 'expiring' && (
//         <Modal title="Memberships Expiring Soon">
//           <MemberList members={dashboardSummary.expiringMembersList} />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default DashboardPage;

// import React, { useState, useEffect } from 'react';
// import { Users, Activity, AlertCircle, Clock, X } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import PageHeader from '../components/layout/PageHeader';
// import StatCard from '../components/dashboard/StatCard';
// import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
// import Button from '../components/ui/Button';
// import { Link } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { useMemberContext } from '../context/MemberContext';
// import { supabase } from '../context/supabaseClient';

// interface AttendanceRecord {
//   memberId: string;
//   checkIn: string;
// }

// interface Membership {
//   id: string;
//   name: string;
//   price: number;
//   duration: string; // e.g. "30 days"
//   description: string;
//   features: string[];
// }

// interface Member {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   avatar?: string;
//   joinDate: string;
//   membershipID: string;
// }

// const DashboardPage: React.FC = () => {
//   const { user } = useAuth();
//   const { members } = useMemberContext();
//   const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
//   const [memberships, setMemberships] = useState<Record<string, Membership>>({});
//   const [showModal, setShowModal] = useState<'all' | 'checkedIn' | 'expired' | 'expiring' | null>(null);

//   useEffect(() => {
//     supabase.from('attendance').select('memberId, checkIn')
//       .then(({ data }) => data && setAttendance(data));

//     supabase.from('membership').select('*')
//       .then(({ data }) => {
//         if (data) {
//           const map: Record<string, Membership> = {};
//           data.forEach((m: Membership) => map[m.id] = m);
//           setMemberships(map);
//         }
//       });
//   }, []);

//   const today = new Date();

//   const parseDurationDays = (str?: string): number => {
//     if (!str) return 0;
//     const match = str.match(/(\d+)/);
//     return match ? parseInt(match[1], 10) : 0;
//   };

//   const memberWithDates = members.map(member => {
//     const plan = memberships[member.membershipId];
//     const durationDays = parseDurationDays(plan?.duration);
//     const join = new Date(member.joinDate);
//     const endDate = new Date(join.getTime() + durationDays * 86400000);
//     return { ...member, endDate };
//   });

//   const checkedInToday = memberWithDates.filter(m =>
//     attendance.some(a =>
//       a.memberId === m.id &&
//       new Date(a.checkIn).toDateString() === today.toDateString()
//     )
//   );

//   const expired = memberWithDates.filter(m => m.endDate < today);

//   const expiringSoon = memberWithDates.filter(m => {
//     const diff = (m.endDate.getTime() - today.getTime()) / 86400000;
//     return diff >= 0 && diff <= 3;
//   });

//   const handleWhatsAppMessage = (phone: string, name: string) =>
//     toast.success(`Message sent to ${name}`);

//   const Modal = ({ title, children }: { title: string; children: React.ReactNode }) => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">{title}</h3>
//           <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-gray-700">
//             <X size={20} />
//           </button>
//         </div>{children}
//       </div>
//     </div>
//   );

//   const MemberList = ({ members }: { members: typeof memberWithDates }) => (
//     <div className="divide-y divide-gray-200">
//       {members.map(m => (
//         <div key={m.id} className="py-3 flex items-center justify-between">
//           <div className="flex items-center">
//             <img
//               src={m.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=0EA5E9&color=fff`}
//               className="h-10 w-10 rounded-full" alt={m.name}
//             />
//             <div className="ml-4">
//               <p className="text-sm font-medium">{m.name}</p>
//               <p className="text-xs text-gray-500">{m.email}</p>
//               <p className="text-xs text-gray-400">
//                 Expires: {m.endDate.toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <Button variant="outline" size="sm" onClick={() => handleWhatsAppMessage(m.phone, m.name)}>
//               Message
//             </Button>
//             <Link to={`/members/${m.id}`}>
//               <Button variant="outline" size="sm">View</Button>
//             </Link>
//           </div>
//         </div>
//       ))}
//       {members.length === 0 && <p className="text-center py-4 text-gray-500">No members found</p>}
//     </div>
//   );

//   return (
//     <div>
//       <PageHeader
//         title={`Welcome back, ${user?.name?.split(' ')[0] || 'User'}`}
//         description="Here's what's happening at your gym today."
//       />
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         {[
//           { key: 'all', title: 'Total Members', icon: <Users className="h-full w-full" />, value: members.length },
//           { key: 'checkedIn', title: 'Checked In Today', icon: <Activity className="h-full w-full" />, value: checkedInToday.length },
//           { key: 'expired', title: 'Expired Members', icon: <AlertCircle className="h-full w-full" />, value: expired.length },
//           { key: 'expiring', title: 'Expiring Soon', icon: <Clock className="h-full w-full" />, value: expiringSoon.length },
//         ].map(({ key, title, icon, value }) => (
//           <div key={key} onClick={() => setShowModal(key as any)} className="cursor-pointer">
//             <StatCard
//               title={title}
//               value={value}
//               icon={icon}
//               change={{ value: 0, isPositive: true /* or calculate change if needed */ }}
//             />
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <Card><CardHeader><CardTitle>Expired</CardTitle></CardHeader><CardContent><MemberList members={expired} /></CardContent></Card>
//         <Card><CardHeader><CardTitle>Expiring Soon</CardTitle></CardHeader><CardContent><MemberList members={expiringSoon} /></CardContent></Card>
//       </div>

//       {showModal === 'all' && <Modal title="All Members"><MemberList members={memberWithDates} /></Modal>}
//       {showModal === 'checkedIn' && <Modal title="Checked In Today"><MemberList members={checkedInToday} /></Modal>}
//       {showModal === 'expired' && <Modal title="Expired Members"><MemberList members={expired} /></Modal>}
//       {showModal === 'expiring' && <Modal title="Expiring Soon"><MemberList members={expiringSoon} /></Modal>}
//     </div>
//   );
// };

// export default DashboardPage;

// import React, { useState, useEffect } from 'react';
// import { Users, Activity, AlertCircle, Clock, X } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import PageHeader from '../components/layout/PageHeader';
// import StatCard from '../components/dashboard/StatCard';
// import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
// import Button from '../components/ui/Button';
// import { Link } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { useMemberContext } from '../context/MemberContext';
// import { supabase } from '../context/supabaseClient';

// const DashboardPage: React.FC = () => {
//   const { user } = useAuth();
//   const { members } = useMemberContext();
//   const [attendance, setAttendance] = useState<any[]>([]);
//   const [memberships, setMemberships] = useState<any[]>([]);
//   const [showModal, setShowModal] = useState<'all' | 'checkedIn' | 'expired' | 'expiring' | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const { data: attendanceData } = await supabase.from('attendance').select('*');
//       const { data: membershipData } = await supabase.from('memberships').select('*');
//       setAttendance(attendanceData || []);
//       setMemberships(membershipData || []);
//     };
//     fetchData();
//   }, []);

//   const getMembershipById = (id: string) => memberships.find((m) => m.id === id);

//   const getExpiryDate = (joinDate: string, membershipId: string) => {
//     const membership = getMembershipById(membershipId);
//     const durationDays = membership ? parseInt(membership.duration) : 0;
//     const join = new Date(joinDate);
//     return new Date(join.getTime() + durationDays * 24 * 60 * 60 * 1000);
//   };

//   const today = new Date().toDateString();

//   const checkedInToday = attendance.filter(
//     (a) => new Date(a.checkIn).toDateString() === today
//   ).map((a) => a.memberId);

//   const expiredMembersList = members.filter((member) => {
//     const expiryDate = getExpiryDate(member.joinDate, member.membershipId);
//     return expiryDate < new Date();
//   });

//   const expiringMembersList = members.filter((member) => {
//     const expiryDate = getExpiryDate(member.joinDate, member.membershipId);
//     const daysLeft = (expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
//     return daysLeft > 0 && daysLeft <= 3;
//   });

//   const handleWhatsAppMessage = (phone: string, name: string) => {
//     toast.success(`Message sent to ${name}`);
//   };

//   const Modal = ({ title, children }: { title: string; children: React.ReactNode }) => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">{title}</h3>
//           <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-gray-700">
//             <X size={20} />
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );

//   const MemberList = ({ members }: { members: any[] }) => (
//     <div className="divide-y divide-gray-200">
//       {members.map((member) => (
//         <div key={member.id} className="py-3 flex items-center justify-between">
//           <div className="flex items-center">
//             <img
//               className="h-10 w-10 rounded-full"
//               src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
//               alt={member.name}
//             />
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-900">{member.name}</p>
//               <p className="text-xs text-gray-500">{member.email}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => handleWhatsAppMessage(member.phone, member.name)}
//             >
//               Message
//             </Button>
//             <Link to={`/members/${member.id}`}>
//               <Button variant="outline" size="sm">View</Button>
//             </Link>
//           </div>
//         </div>
//       ))}
//       {members.length === 0 && (
//         <p className="text-center py-4 text-gray-500">No members found</p>
//       )}
//     </div>
//   );

//   return (
//     <div>
//       <PageHeader 
//         title={`Welcome back, ${user?.name?.split(' ')[0] || 'User'}`} 
//         description="Here's what's happening at your gym today."
//       />

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <div onClick={() => setShowModal('all')} className="cursor-pointer">
//           <StatCard
//             title="Total Members"
//             value={members.length}
//             icon={<Users className="h-full w-full" />}
//             change={{ value: 4.5, isPositive: true }}
//           />
//         </div>

//         <div onClick={() => setShowModal('checkedIn')} className="cursor-pointer">
//           <StatCard
//             title="Checked In Today"
//             value={checkedInToday.length}
//             icon={<Activity className="h-full w-full" />}
//             change={{ value: 1.2, isPositive: false }}
//             iconColor="text-secondary-600"
//             iconBackground="bg-secondary-100"
//           />
//         </div>

//         <div onClick={() => setShowModal('expired')} className="cursor-pointer">
//           <StatCard
//             title="Expired Members"
//             value={expiredMembersList.length}
//             icon={<AlertCircle className="h-full w-full" />}
//             iconColor="text-red-600"
//             iconBackground="bg-red-100"
//           />
//         </div>

//         <div onClick={() => setShowModal('expiring')} className="cursor-pointer">
//           <StatCard
//             title="Expiring Soon"
//             value={expiringMembersList.length}
//             icon={<Clock className="h-full w-full" />}
//             iconColor="text-amber-600"
//             iconBackground="bg-amber-100"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>Expired Memberships</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <MemberList members={expiredMembersList} />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Expiring Soon</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <MemberList members={expiringMembersList} />
//           </CardContent>
//         </Card>
//       </div>

//       {showModal === 'all' && (
//         <Modal title="All Members">
//           <MemberList members={members} />
//         </Modal>
//       )}

//       {showModal === 'checkedIn' && (
//         <Modal title="Members Checked In Today">
//           <MemberList members={members.filter((m) => checkedInToday.includes(m.id))} />
//         </Modal>
//       )}

//       {showModal === 'expired' && (
//         <Modal title="Expired Memberships">
//           <MemberList members={expiredMembersList} />
//         </Modal>
//       )}

//       {showModal === 'expiring' && (
//         <Modal title="Memberships Expiring Soon">
//           <MemberList members={expiringMembersList} />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default DashboardPage;

// import React, { useEffect, useState } from 'react';
// import { Users, Activity, AlertCircle, Clock, X } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import PageHeader from '../components/layout/PageHeader';
// import StatCard from '../components/dashboard/StatCard';
// import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
// import Button from '../components/ui/Button';
// import { Link } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { useMemberContext } from '../context/MemberContext';
// import { supabase } from '../context/supabaseClient';

// const DashboardPage: React.FC = () => {
//   const { user } = useAuth();
//   const { members } = useMemberContext();
//   const [showModal, setShowModal] = useState<'all' | 'checkedIn' | 'expired' | 'expiring' | null>(null);

//   const [attendance, setAttendance] = useState<any[]>([]);
//   const [memberships, setMemberships] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       const { data, error } = await supabase.from('attendance').select('*');
//       if (error) console.error(error);
//       else setAttendance(data);
//     };

//     const fetchMemberships = async () => {
//       const { data, error } = await supabase.from('memberships').select('*');
//       if (error) console.error(error);
//       else setMemberships(data);
//     };

//     fetchAttendance();
//     fetchMemberships();
//   }, []);

//   const getMemberPlanDays = (membershipId: string) => {
//     const membership = memberships.find(m => m.id === membershipId);
//     return membership ? parseInt(membership.duration) : 0;
//   };

//   const today = new Date();

//   const checkedInToday = attendance.filter(att => {
//     const checkInDate = new Date(att.checkIn);
//     return checkInDate.toDateString() === today.toDateString();
//   });

//   const expiredMembers = members.filter(member => {
//     const joinDate = new Date(member.joinDate);
//     const planDays = getMemberPlanDays(member.membershipId);
//     const expiryDate = new Date(joinDate);
//     expiryDate.setDate(expiryDate.getDate() + planDays);
//     return today > expiryDate;
//   });

//   const expiringSoonMembers = members.filter(member => {
//     const joinDate = new Date(member.joinDate);
//     const planDays = getMemberPlanDays(member.membershipId);
//     const expiryDate = new Date(joinDate);
//     expiryDate.setDate(expiryDate.getDate() + planDays);

//     const diffInDays = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
//     return diffInDays > 0 && diffInDays <= 3;
//   });

//   const handleWhatsAppMessage = (phone: string, name: string) => {
//     toast.success(`Message sent to ${name}`);
//   };

//   const Modal = ({ title, children }: { title: string; children: React.ReactNode }) => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">{title}</h3>
//           <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-gray-700">
//             <X size={20} />
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );

//   const MemberList = ({ members }: { members: any[] }) => (
//     <div className="divide-y divide-gray-200">
//       {members.map((member) => (
//         <div key={member.id} className="py-3 flex items-center justify-between">
//           <div className="flex items-center">
//             <img
//               className="h-10 w-10 rounded-full"
//               src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
//               alt={member.name}
//             />
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-900">{member.name}</p>
//               <p className="text-xs text-gray-500">{member.email}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <Button variant="outline" size="sm" onClick={() => handleWhatsAppMessage(member.phone, member.name)}>
//               Message
//             </Button>
//             <Link to={`/members/${member.id}`}>
//               <Button variant="outline" size="sm">View</Button>
//             </Link>
//           </div>
//         </div>
//       ))}
//       {members.length === 0 && (
//         <p className="text-center py-4 text-gray-500">No members found</p>
//       )}
//     </div>
//   );

//   return (
//     <div>
//       <PageHeader 
//         title={`Welcome back, ${user?.name?.split(' ')[0] || 'User'}`} 
//         description="Here's what's happening at your gym today."
//       />

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <div onClick={() => setShowModal('all')} className="cursor-pointer">
//           <StatCard
//             title="Total Members"
//             value={members.length}
//             icon={<Users className="h-full w-full" />}
//             change={{ value: 4.5, isPositive: true }}
//           />
//         </div>

//         <div onClick={() => setShowModal('checkedIn')} className="cursor-pointer">
//           <StatCard
//             title="Checked In Today"
//             value={checkedInToday.length}
//             icon={<Activity className="h-full w-full" />}
//             change={{ value: 1.2, isPositive: false }}
//             iconColor="text-secondary-600"
//             iconBackground="bg-secondary-100"
//           />
//         </div>

//         <div onClick={() => setShowModal('expired')} className="cursor-pointer">
//           <StatCard
//             title="Expired Members"
//             value={expiredMembers.length}
//             icon={<AlertCircle className="h-full w-full" />}
//             iconColor="text-red-600"
//             iconBackground="bg-red-100"
//           />
//         </div>

//         <div onClick={() => setShowModal('expiring')} className="cursor-pointer">
//           <StatCard
//             title="Expiring Soon"
//             value={expiringSoonMembers.length}
//             icon={<Clock className="h-full w-full" />}
//             iconColor="text-amber-600"
//             iconBackground="bg-amber-100"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>Expired Memberships</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <MemberList members={expiredMembers} />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Expiring Soon</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <MemberList members={expiringSoonMembers} />
//           </CardContent>
//         </Card>
//       </div>

//       {showModal === 'all' && (
//         <Modal title="All Members">
//           <MemberList members={members} />
//         </Modal>
//       )}

//       {showModal === 'checkedIn' && (
//         <Modal title="Members Checked In Today">
//           <MemberList
//             members={members.filter(member =>
//               checkedInToday.some(att => att.memberId === member.id)
//             )}
//           />
//         </Modal>
//       )}

//       {showModal === 'expired' && (
//         <Modal title="Expired Memberships">
//           <MemberList members={expiredMembers} />
//         </Modal>
//       )}

//       {showModal === 'expiring' && (
//         <Modal title="Memberships Expiring Soon">
//           <MemberList members={expiringSoonMembers} />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default DashboardPage;


// import React, { useEffect, useState } from 'react';
// import { Users, Activity, AlertCircle, Clock, X } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import PageHeader from '../components/layout/PageHeader';
// import StatCard from '../components/dashboard/StatCard';
// import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
// import Button from '../components/ui/Button';
// import { Link } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { useMemberContext } from '../context/MemberContext';
// import { supabase } from '../context/supabaseClient';
// import { sendMembershipExpiryMessage } from '../utils/whatsapp';

// const DashboardPage: React.FC = () => {
//   const { user } = useAuth();
//   const { members } = useMemberContext();
//   const [showModal, setShowModal] = useState<'all' | 'checkedIn' | 'expired' | 'expiring' | null>(null);

//   const [attendance, setAttendance] = useState<any[]>([]);
//   const [memberships, setMemberships] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       const { data, error } = await supabase.from('attendance').select('*');
//       if (error) console.error(error);
//       else setAttendance(data);
//     };

//     const fetchMemberships = async () => {
//       const { data, error } = await supabase.from('memberships').select('*');
//       if (error) console.error(error);
//       else setMemberships(data);
//     };

//     fetchAttendance();
//     fetchMemberships();
//   }, []);

//   const getMemberPlanDays = (membershipId: string) => {
//     const membership = memberships.find(m => String(m.id) === String(membershipId));
//     return membership ? parseInt(membership.duration) : 0;
//   };

//   const today = new Date();

//   const checkedInToday = attendance.filter(att => {
//     const checkInDate = new Date(att.checkIn);
//     return checkInDate.toDateString() === today.toDateString();
//   });

//   const expiredMembers = members.filter(member => {
//     const joinDate = new Date(member.joinDate);
//     const planDays = getMemberPlanDays(member.membershipId);
//     const expiryDate = new Date(joinDate);
//     expiryDate.setDate(expiryDate.getDate() + planDays);
//     return today > expiryDate;
//   });

//   const expiringSoonMembers = members.filter(member => {
//     const joinDate = new Date(member.joinDate);
//     const planDays = getMemberPlanDays(member.membershipId);
//     const expiryDate = new Date(joinDate);
//     expiryDate.setDate(expiryDate.getDate() + planDays);

//     const diffInDays = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
//     return diffInDays > 0 && diffInDays <= 3;
//   });

//   const handleWhatsAppMessage = (phone: string, name: string) => {
//     toast.success(`Message sent to ${name}`);
//   };

//   const Modal = ({ title, children }: { title: string; children: React.ReactNode }) => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">{title}</h3>
//           <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-gray-700">
//             <X size={20} />
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );

//   const MemberList = ({ members }: { members: any[] }) => (
//     <div className="divide-y divide-gray-200">
//       {members.map((member) => (
//         <div key={member.id} className="py-3 flex items-center justify-between">
//           <div className="flex items-center">
//             <img
//               className="h-10 w-10 rounded-full"
//               src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
//               alt={member.name}
//             />
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-900">{member.name}</p>
//               <p className="text-xs text-gray-500">{member.email}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <Button variant="outline" size="sm" onClick={() => handleWhatsAppMessage(member.phone, member.name)}>
//               Message
//             </Button>
//             <Link to={`/members/${member.id}`}>
//               <Button variant="outline" size="sm">View</Button>
//             </Link>
//           </div>
//         </div>
//       ))}
//       {members.length === 0 && (
//         <p className="text-center py-4 text-gray-500">No members found</p>
//       )}
//     </div>
//   );

//   const checkedInMemberList = members.filter(member =>
//     checkedInToday.some(att => Number(att.memberId) === member.id)
//   );

//   return (
//     <div>
//       <PageHeader 
//         title={`Welcome back, ${user?.name?.split(' ')[0] || 'User'}`} 
//         description="Here's what's happening at your gym today."
//       />

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <div onClick={() => setShowModal('all')} className="cursor-pointer">
//           <StatCard title="Total Members" value={members.length} icon={<Users />} change={{ value: 4.5, isPositive: true }} />
//         </div>

//         <div onClick={() => setShowModal('checkedIn')} className="cursor-pointer">
//           <StatCard
//             title="Checked In Today"
//             value={checkedInMemberList.length}
//             icon={<Activity />}
//             change={{ value: 1.2, isPositive: false }}
//             iconColor="text-secondary-600"
//             iconBackground="bg-secondary-100"
//           />
//         </div>

//         <div onClick={() => setShowModal('expired')} className="cursor-pointer">
//           <StatCard
//             title="Expired Members"
//             value={expiredMembers.length}
//             icon={<AlertCircle />}
//             iconColor="text-red-600"
//             iconBackground="bg-red-100"
//           />
//         </div>

//         <div onClick={() => setShowModal('expiring')} className="cursor-pointer">
//           <StatCard
//             title="Expiring Soon"
//             value={expiringSoonMembers.length}
//             icon={<Clock />}
//             iconColor="text-amber-600"
//             iconBackground="bg-amber-100"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <Card>
//           <CardHeader><CardTitle>Expired Memberships</CardTitle></CardHeader>
//           <CardContent><MemberList members={expiredMembers} /></CardContent>
          
//         </Card>

//         <Card>
//           <CardHeader><CardTitle>Expiring Soon</CardTitle></CardHeader>
//           <CardContent><MemberList members={expiringSoonMembers} /></CardContent>
//         </Card>
//       </div>

//       {showModal === 'all' && <Modal title="All Members"><MemberList members={members} /></Modal>}
//       {showModal === 'checkedIn' && <Modal title="Members Checked In Today"><MemberList members={checkedInMemberList} /></Modal>}
//       {showModal === 'expired' && <Modal title="Expired Memberships"><MemberList members={expiredMembers} /></Modal>}
//       {showModal === 'expiring' && <Modal title="Memberships Expiring Soon"><MemberList members={expiringSoonMembers} /></Modal>}
//     </div>
//   );
// };

// export default DashboardPage;

import React, { useEffect, useState } from 'react';
import { Users, Activity, AlertCircle, Clock, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/layout/PageHeader';
import StatCard from '../components/dashboard/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useMemberContext } from '../context/MemberContext';
import { supabase } from '../context/supabaseClient';
import { sendMembershipExpiryMessage } from '../utils/whatsapp';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { members } = useMemberContext();
  const [showModal, setShowModal] = useState<'all' | 'checkedIn' | 'expired' | 'expiring' | null>(null);

  const [attendance, setAttendance] = useState<any[]>([]);
  const [memberships, setMemberships] = useState<any[]>([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const { data, error } = await supabase.from('attendance').select('*');
      if (error) console.error(error);
      else setAttendance(data);
    };

    const fetchMemberships = async () => {
      const { data, error } = await supabase.from('memberships').select('*');
      if (error) console.error(error);
      else setMemberships(data);
    };

    fetchAttendance();
    fetchMemberships();
  }, []);

  const getMemberPlanDays = (membershipId: string) => {
    const membership = memberships.find(m => String(m.id) === String(membershipId));
    return membership ? parseInt(membership.duration) : 0;
  };

  const today = new Date();

  const checkedInToday = attendance.filter(att => {
    const checkInDate = new Date(att.checkIn);
    return checkInDate.toDateString() === today.toDateString();
  });

  const expiredMembers = members.filter(member => {
    const joinDate = new Date(member.joinDate);
    const planDays = getMemberPlanDays(member.membershipId);
    const expiryDate = new Date(joinDate);
    expiryDate.setDate(expiryDate.getDate() + planDays);
    return today > expiryDate;
  });

  const expiringSoonMembers = members.filter(member => {
    const joinDate = new Date(member.joinDate);
    const planDays = getMemberPlanDays(member.membershipId);
    const expiryDate = new Date(joinDate);
    expiryDate.setDate(expiryDate.getDate() + planDays);

    const diffInDays = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays > 0 && diffInDays <= 3;
  });

  const handleWhatsAppMessage = (phone: string, name: string, joinDate?: string, membershipId?: string) => {
    sendMembershipExpiryMessage(phone, name, joinDate, membershipId, memberships);
  };

  const Modal = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  const MemberList = ({ members }: { members: any[] }) => (
    <div className="divide-y divide-gray-200">
      {members.map((member) => (
        <div key={member.id} className="py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full"
              src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
              alt={member.name}
            />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">{member.name}</p>
              <p className="text-xs text-gray-500">{member.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleWhatsAppMessage(member.phone, member.name, member.joinDate, member.membershipId)}
            >
              Message
            </Button>
            <Link to={`/members/${member.id}`}>
              <Button variant="outline" size="sm">View</Button>
            </Link>
          </div>
        </div>
      ))}
      {members.length === 0 && (
        <p className="text-center py-4 text-gray-500">No members found</p>
      )}
    </div>
  );

  const checkedInMemberList = members.filter(member =>
    checkedInToday.some(att => Number(att.memberId) === member.id)
  );

  return (
    <div>
      <PageHeader 
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'User'}`} 
        description="Here's what's happening at your gym today."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div onClick={() => setShowModal('all')} className="cursor-pointer">
          <StatCard title="Total Members" value={members.length} icon={<Users />} change={{ value: 4.5, isPositive: true }} />
        </div>

        <div onClick={() => setShowModal('checkedIn')} className="cursor-pointer">
          <StatCard
            title="Checked In Today"
            value={checkedInMemberList.length}
            icon={<Activity />}
            change={{ value: 1.2, isPositive: false }}
            iconColor="text-secondary-600"
            iconBackground="bg-secondary-100"
          />
        </div>

        <div onClick={() => setShowModal('expired')} className="cursor-pointer">
          <StatCard
            title="Expired Members"
            value={expiredMembers.length}
            icon={<AlertCircle />}
            iconColor="text-red-600"
            iconBackground="bg-red-100"
          />
        </div>

        <div onClick={() => setShowModal('expiring')} className="cursor-pointer">
          <StatCard
            title="Expiring Soon"
            value={expiringSoonMembers.length}
            icon={<Clock />}
            iconColor="text-amber-600"
            iconBackground="bg-amber-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Expired Memberships</CardTitle></CardHeader>
          <CardContent><MemberList members={expiredMembers} /></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Expiring Soon</CardTitle></CardHeader>
          <CardContent><MemberList members={expiringSoonMembers} /></CardContent>
        </Card>
      </div>

      {showModal === 'all' && <Modal title="All Members"><MemberList members={members} /></Modal>}
      {showModal === 'checkedIn' && <Modal title="Members Checked In Today"><MemberList members={checkedInMemberList} /></Modal>}
      {showModal === 'expired' && <Modal title="Expired Memberships"><MemberList members={expiredMembers} /></Modal>}
      {showModal === 'expiring' && <Modal title="Memberships Expiring Soon"><MemberList members={expiringSoonMembers} /></Modal>}
    </div>
  );
};

export default DashboardPage;
