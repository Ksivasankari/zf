// import React, { useState, useEffect } from 'react';
// import { Search, UserCheck, UserX } from 'lucide-react';
// import Input from '../ui/Input';
// import Button from '../ui/Button';
// import { members } from '../../data/mockData';
// import { Member } from '../../types';
// import toast from 'react-hot-toast';

// const CheckInOutForm: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState<Member[]>([]);
//   const [selectedMember, setSelectedMember] = useState<Member | null>(null);
//   const [mode, setMode] = useState<'check-in' | 'check-out' | null>(null);

//   useEffect(() => {
//     if (searchTerm.length >= 2) {
//       const filtered = members.filter(
//         (member) =>
//           member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           member.phone.includes(searchTerm) ||
//           member.memberId.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setSearchResults(filtered);
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchTerm]);

//   const handleSelectMember = (member: Member) => {
//     setSelectedMember(member);
//     setSearchTerm('');
//     setSearchResults([]);
//   };

//   const handleCheckInOut = () => {
//     if (!selectedMember || !mode) return;

//     toast.success(
//       `${selectedMember.name} (ID: ${selectedMember.memberId}) has been ${mode === 'check-in' ? 'checked in' : 'checked out'} successfully!`
//     );

//     setSelectedMember(null);
//     setSearchTerm('');
//     setMode(null);
//   };

//   return (
//     <div className="space-y-6">
//       {!mode ? (
//         <div className="flex gap-4">
//           <Button
//             variant="primary"
//             className="flex-1"
//             leftIcon={<UserCheck size={18} />}
//             onClick={() => setMode('check-in')}
//           >
//             Check In
//           </Button>
//           <Button
//             variant="secondary"
//             className="flex-1"
//             leftIcon={<UserX size={18} />}
//             onClick={() => setMode('check-out')}
//           >
//             Check Out
//           </Button>
//         </div>
//       ) : (
//         <div className="animate-fade-in">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-medium text-gray-900">
//               {mode === 'check-in' ? 'Check In Member' : 'Check Out Member'}
//             </h3>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => {
//                 setMode(null);
//                 setSelectedMember(null);
//                 setSearchTerm('');
//               }}
//             >
//               Cancel
//             </Button>
//           </div>

//           <div className="relative">
//             <Input
//               placeholder="Search by member ID or name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               leftIcon={<Search size={18} />}
//             />

//             {searchResults.length > 0 && (
//               <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto ring-1 ring-black ring-opacity-5">
//                 <ul className="py-1\" role="listbox">
//                   {searchResults.map((member) => (
//                     <li
//                       key={member.id}
//                       onClick={() => handleSelectMember(member)}
//                       className="cursor-pointer px-4 py-2 hover:bg-gray-100 transition"
//                     >
//                       <div className="flex items-center">
//                         <img
//                           src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
//                           alt={member.name}
//                           className="h-8 w-8 rounded-full mr-3"
//                         />
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">
//                             {member.name} <span className="text-gray-500">({member.memberId})</span>
//                           </p>
//                           <p className="text-xs text-gray-500">{member.email}</p>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {selectedMember && (
//             <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4 animate-scale-in">
//               <div className="flex items-center">
//                 <img
//                   src={selectedMember.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember.name)}&background=0EA5E9&color=fff`}
//                   alt={selectedMember.name}
//                   className="h-12 w-12 rounded-full mr-4"
//                 />
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900">
//                     {selectedMember.name}
//                     <span className="ml-2 text-sm text-gray-500">
//                       (ID: {selectedMember.memberId})
//                     </span>
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     {selectedMember.email} • {selectedMember.phone}
//                   </p>
//                 </div>
//               </div>

//               <Button
//                 onClick={handleCheckInOut}
//                 variant={mode === 'check-in' ? 'primary' : 'secondary'}
//                 className="w-full mt-4"
//                 leftIcon={mode === 'check-in' ? <UserCheck size={18} /> : <UserX size={18} />}
//               >
//                 {mode === 'check-in' ? 'Check In' : 'Check Out'}
//               </Button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CheckInOutForm;

// import React, { useState, useEffect } from 'react';
// import { Search, UserCheck, UserX } from 'lucide-react';
// import Input from '../ui/Input';
// import Button from '../ui/Button';
// import toast from 'react-hot-toast';
// import { supabase } from '../../context/supabaseClient'; // Make sure this points to your supabase client

// interface Member {
//   id: string;
//   memberId: string;
//   name: string;
//   email: string;
//   phone: string;
//   avatar?: string;
// }

// const CheckInOutForm: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState<Member[]>([]);
//   const [selectedMember, setSelectedMember] = useState<Member | null>(null);
//   const [mode, setMode] = useState<'check-in' | 'check-out' | null>(null);
//   const [allMembers, setAllMembers] = useState<Member[]>([]);

//   // Fetch members once on mount
//   useEffect(() => {
//     const fetchMembers = async () => {
//       const { data, error } = await supabase
//         .from('members')
//         .select('id, memberId, name, email, phone');
//       if (error) {
//         toast.error('Failed to fetch members');
//         return;
//       }
//       setAllMembers(data || []);
//     };
//     fetchMembers();
//   }, []);

//   // Filter members when searchTerm changes
//   useEffect(() => {
//     if (searchTerm.length >= 2) {
//       const filtered = allMembers.filter(
//         (member) =>
//           member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           member.phone.includes(searchTerm) ||
//           member.memberId.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setSearchResults(filtered);
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchTerm, allMembers]);

//   const handleSelectMember = (member: Member) => {
//     setSelectedMember(member);
//     setSearchTerm('');
//     setSearchResults([]);
//   };

//   const handleCheckInOut = async () => {
//     if (!selectedMember || !mode) return;

//     if (mode === 'check-in') {
//       // Insert new attendance record
//       const { error } = await supabase.from('attendance').insert({
//         memberId: selectedMember.memberId,
//         checkIn: new Date().toISOString(),
//         checkOut: null,
//         duration: null,
//       });
//       if (error) {
//         toast.error('Failed to check in');
//         return;
//       }
//       toast.success(`${selectedMember.name} has been checked in successfully.`);
//     } else {
//       // Check out: find latest record with null checkOut for this member
//       const { data, error } = await supabase
//         .from('attendance')
//         .select('*')
//         .eq('memberId', selectedMember.memberId)
//         .is('checkOut', null)
//         .order('checkIn', { ascending: false })
//         .limit(1)
//         .single();

//       if (error || !data) {
//         toast.error('No active check-in found for this member.');
//         return;
//       }

//       const checkInTime = new Date(data.checkIn);
//       const checkOutTime = new Date();
//       const duration = Math.round((checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60)); // minutes

//       const { error: updateError } = await supabase
//         .from('attendance')
//         .update({
//           checkOut: checkOutTime.toISOString(),
//           duration,
//         })
//         .eq('id', data.id);

//       if (updateError) {
//         toast.error('Failed to check out');
//         return;
//       }
//       toast.success(`${selectedMember.name} has been checked out successfully.`);
//     }

//     setSelectedMember(null);
//     setSearchTerm('');
//     setMode(null);
//   };

//   return (
//     <div className="space-y-6">
//       {!mode ? (
//         <div className="flex gap-4">
//           <Button
//             variant="primary"
//             className="flex-1"
//             leftIcon={<UserCheck size={18} />}
//             onClick={() => setMode('check-in')}
//           >
//             Check In
//           </Button>
//           <Button
//             variant="secondary"
//             className="flex-1"
//             leftIcon={<UserX size={18} />}
//             onClick={() => setMode('check-out')}
//           >
//             Check Out
//           </Button>
//         </div>
//       ) : (
//         <div className="animate-fade-in">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-medium text-gray-900">
//               {mode === 'check-in' ? 'Check In Member' : 'Check Out Member'}
//             </h3>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => {
//                 setMode(null);
//                 setSelectedMember(null);
//                 setSearchTerm('');
//               }}
//             >
//               Cancel
//             </Button>
//           </div>

//           <div className="relative">
//             <Input
//               placeholder="Search by member ID or name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               leftIcon={<Search size={18} />}
//             />

//             {searchResults.length > 0 && (
//               <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto ring-1 ring-black ring-opacity-5">
//                 <ul className="py-1" role="listbox">
//                   {searchResults.map((member) => (
//                     <li
//                       key={member.id}
//                       onClick={() => handleSelectMember(member)}
//                       className="cursor-pointer px-4 py-2 hover:bg-gray-100 transition"
//                     >
//                       <div className="flex items-center">
//                         <img
//                           src={
//                             member.avatar ||
//                             `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                               member.name
//                             )}&background=0EA5E9&color=fff`
//                           }
//                           alt={member.name}
//                           className="h-8 w-8 rounded-full mr-3"
//                         />
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">
//                             {member.name} <span className="text-gray-500">({member.memberId})</span>
//                           </p>
//                           <p className="text-xs text-gray-500">{member.email}</p>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {selectedMember && (
//             <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4 animate-scale-in">
//               <div className="flex items-center">
//                 <img
//                   src={
//                     selectedMember.avatar ||
//                     `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember.name)}&background=0EA5E9&color=fff`
//                   }
//                   alt={selectedMember.name}
//                   className="h-12 w-12 rounded-full mr-4"
//                 />
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900">
//                     {selectedMember.name}
//                     <span className="ml-2 text-sm text-gray-500">(ID: {selectedMember.memberId})</span>
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     {selectedMember.email} • {selectedMember.phone}
//                   </p>
//                 </div>
//               </div>

//               <Button
//                 onClick={handleCheckInOut}
//                 variant={mode === 'check-in' ? 'primary' : 'secondary'}
//                 className="w-full mt-4"
//                 leftIcon={mode === 'check-in' ? <UserCheck size={18} /> : <UserX size={18} />}
//               >
//                 {mode === 'check-in' ? 'Check In' : 'Check Out'}
//               </Button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CheckInOutForm;

import React, { useState, useEffect } from 'react';
import { Search, UserCheck, UserX } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import toast from 'react-hot-toast';
import { supabase } from '../../context/supabaseClient';

interface Member {
  id: string;
  memberId: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

const CheckInOutForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [mode, setMode] = useState<'check-in' | 'check-out' | null>(null);
  const [allMembers, setAllMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from('members')
        .select('id, memberId, name, email, phone');
      if (error) {
        toast.error('Failed to fetch members');
        return;
      }
      setAllMembers(data || []);
    };
    fetchMembers();
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filtered = allMembers.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.phone.includes(searchTerm) ||
          member.memberId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, allMembers]);

  const handleSelectMember = (member: Member) => {
    setSelectedMember(member);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleCheckInOut = async () => {
  if (!selectedMember || !mode) return;

  if (mode === 'check-in') {
    const { error } = await supabase.from('attendance').insert({
      memberId: selectedMember.id,          
      checkIn: new Date().toISOString(),     
      checkOut: null,                       
      duration: null,
    });

    if (error) {
      console.error(error); 
      toast.error('Failed to check in');
      return;
    }

    toast.success(`${selectedMember.name} has been checked in successfully.`);
  } else {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('memberId', selectedMember.id)      
      .is('checkOut', null)                  
      .order('checkIn', { ascending: false }) 
      .limit(1)
      .single();

    if (error || !data) {
      console.error(error);
      toast.error('No active check-in found for this member.');
      return;
    }

    const checkInTime = new Date(data.checkIn); 
    const checkOutTime = new Date();
    const duration = Math.round((checkOutTime.getTime() - checkInTime.getTime()) / 60000);

    const { error: updateError } = await supabase
      .from('attendance')
      .update({
        checkOut: checkOutTime.toISOString(), 
        duration,
      })
      .eq('id', data.id);

    if (updateError) {
      console.error(updateError);
      toast.error('Failed to check out');
      return;
    }

    toast.success(`${selectedMember.name} has been checked out successfully.`);
  }

  setSelectedMember(null);
  setSearchTerm('');
  setMode(null);
};

  return (
    <div className="space-y-6">
      {!mode ? (
        <div className="flex gap-4">
          <Button
            variant="primary"
            className="flex-1"
            leftIcon={<UserCheck size={18} />}
            onClick={() => setMode('check-in')}
          >
            Check In
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            leftIcon={<UserX size={18} />}
            onClick={() => setMode('check-out')}
          >
            Check Out
          </Button>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {mode === 'check-in' ? 'Check In Member' : 'Check Out Member'}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMode(null);
                setSelectedMember(null);
                setSearchTerm('');
              }}
            >
              Cancel
            </Button>
          </div>

          <div className="relative">
            <Input
              placeholder="Search by member ID or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search size={18} />}
            />

            {searchResults.length > 0 && (
              <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto ring-1 ring-black ring-opacity-5">
                <ul className="py-1" role="listbox">
                  {searchResults.map((member) => (
                    <li
                      key={member.id}
                      onClick={() => handleSelectMember(member)}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center">
                        <img
                          src={
                            member.avatar ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              member.name
                            )}&background=0EA5E9&color=fff`
                          }
                          alt={member.name}
                          className="h-8 w-8 rounded-full mr-3"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {member.name}{' '}
                            <span className="text-gray-500">({member.memberId})</span>
                          </p>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {selectedMember && (
            <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4 animate-scale-in">
              <div className="flex items-center">
                <img
                  src={
                    selectedMember.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      selectedMember.name
                    )}&background=0EA5E9&color=fff`
                  }
                  alt={selectedMember.name}
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedMember.name}
                    <span className="ml-2 text-sm text-gray-500">
                      (ID: {selectedMember.memberId})
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedMember.email} • {selectedMember.phone}
                  </p>
                </div>
              </div>

              <Button
                onClick={handleCheckInOut}
                variant={mode === 'check-in' ? 'primary' : 'secondary'}
                className="w-full mt-4"
                leftIcon={mode === 'check-in' ? <UserCheck size={18} /> : <UserX size={18} />}
              >
                {mode === 'check-in' ? 'Check In' : 'Check Out'}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckInOutForm;

