// import React, { useState } from 'react';
// import { Search, Clock } from 'lucide-react';
// import { Attendance } from '../../types';
// import { recentAttendance, members } from '../../data/mockData';
// import { formatDate, formatTime } from '../../lib/utils';
// import Input from '../ui/Input';

// const AttendanceList: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>(recentAttendance);
  
//   const filteredAttendance = attendanceRecords.filter(record =>
//     record.memberName.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
//   const getMemberAvatar = (id: string) => {
//     const member = members.find(m => m.id === id);
//     return member?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member?.name || 'User')}&background=0EA5E9&color=fff`;
//   };
  
//   const getDuration = (record: Attendance) => {
//     if (record.duration) {
//       const hours = Math.floor(record.duration / 60);
//       const minutes = record.duration % 60;
//       return `${hours}h ${minutes}m`;
//     }
    
//     if (!record.checkOut) {
//       return 'Still checked in';
//     }
    
//     const checkIn = new Date(record.checkIn);
//     const checkOut = new Date(record.checkOut);
//     const durationMinutes = Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60));
    
//     const hours = Math.floor(durationMinutes / 60);
//     const minutes = durationMinutes % 60;
    
//     return `${hours}h ${minutes}m`;
//   };

//   return (
//     <div className="space-y-4 animate-enter">
//       <Input
//         placeholder="Search attendance records..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         leftIcon={<Search size={18} />}
//         className="max-w-md"
//       />
      
//       <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
//         <table className="min-w-full divide-y divide-gray-300">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
//                 Member
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Check In
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Check Out
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Duration
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 bg-white">
//             {filteredAttendance.map((record) => (
//               <tr key={record.id} className="hover:bg-gray-50">
//                 <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
//                   <div className="flex items-center">
//                     <div className="h-10 w-10 flex-shrink-0">
//                       <img
//                         className="h-10 w-10 rounded-full"
//                         src={getMemberAvatar(record.memberId)}
//                         alt={record.memberName}
//                       />
//                     </div>
//                     <div className="ml-4">
//                       <div className="font-medium text-gray-900">{record.memberName}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                   <div>{formatDate(record.checkIn)}</div>
//                   <div className="text-gray-400">{formatTime(record.checkIn)}</div>
//                 </td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                   {record.checkOut ? (
//                     <>
//                       <div>{formatDate(record.checkOut)}</div>
//                       <div className="text-gray-400">{formatTime(record.checkOut)}</div>
//                     </>
//                   ) : (
//                     <span className="text-amber-600 font-medium flex items-center">
//                       <Clock size={16} className="mr-1" /> In progress
//                     </span>
//                   )}
//                 </td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                   {getDuration(record)}
//                 </td>
//               </tr>
//             ))}
            
//             {filteredAttendance.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
//                   No attendance records found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AttendanceList;

// import React, { useState, useEffect } from 'react';
// import { Search, Clock } from 'lucide-react';
// import { supabase } from '../../context/supabaseClient';
// import { formatDate, formatTime } from '../../lib/utils';
// import Input from '../ui/Input';

// interface AttendanceRecord {
//   id: string;
//   checkIn: string;
//   checkOut: string | null;
//   duration: number | null;
//   memberName: string;
//   avatar?: string;
// }

// const AttendanceList: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       const { data, error } = await supabase
//         .from('attendance')
//         .select(`
//           id,
//           check_in,
//           check_out,
//           duration,
//           members (
//             name,
//             avatar
//           )
//         `)
//         .order('check_in', { ascending: false });

//       if (error) {
//         console.error('Error fetching attendance:', error.message);
//         return;
//       }

//       const formatted = data.map((record: any) => ({
//         id: record.id,
//         checkIn: record.check_in,
//         checkOut: record.check_out,
//         duration: record.duration,
//         memberName: record.members?.name || 'Unknown',
//         avatar: record.members?.avatar,
//       }));

//       setAttendanceRecords(formatted);
//     };

//     fetchAttendance();
//   }, []);

//   const filteredAttendance = attendanceRecords.filter(record =>
//     record.memberName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getMemberAvatar = (record: AttendanceRecord) => {
//     return (
//       record.avatar ||
//       `https://ui-avatars.com/api/?name=${encodeURIComponent(record.memberName)}&background=0EA5E9&color=fff`
//     );
//   };

//   const getDuration = (record: AttendanceRecord) => {
//     if (record.duration != null) {
//       const hours = Math.floor(record.duration / 60);
//       const minutes = record.duration % 60;
//       return `${hours}h ${minutes}m`;
//     }

//     if (!record.checkOut) return 'Still checked in';

//     const checkIn = new Date(record.checkIn);
//     const checkOut = new Date(record.checkOut);
//     const durationMinutes = Math.round((checkOut.getTime() - checkIn.getTime()) / 60000);
//     const hours = Math.floor(durationMinutes / 60);
//     const minutes = durationMinutes % 60;

//     return `${hours}h ${minutes}m`;
//   };

//   return (
//     <div className="space-y-4 animate-enter">
//       <Input
//         placeholder="Search attendance records..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         leftIcon={<Search size={18} />}
//         className="max-w-md"
//       />

//       <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
//         <table className="min-w-full divide-y divide-gray-300">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
//                 Member
//               </th>
//               <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Check In
//               </th>
//               <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Check Out
//               </th>
//               <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Duration
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 bg-white">
//             {filteredAttendance.map((record) => (
//               <tr key={record.id} className="hover:bg-gray-50">
//                 <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
//                   <div className="flex items-center">
//                     <div className="h-10 w-10 flex-shrink-0">
//                       <img
//                         className="h-10 w-10 rounded-full"
//                         src={getMemberAvatar(record)}
//                         alt={record.memberName}
//                       />
//                     </div>
//                     <div className="ml-4">
//                       <div className="font-medium text-gray-900">{record.memberName}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                   <div>{formatDate(record.checkIn)}</div>
//                   <div className="text-gray-400">{formatTime(record.checkIn)}</div>
//                 </td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                   {record.checkOut ? (
//                     <>
//                       <div>{formatDate(record.checkOut)}</div>
//                       <div className="text-gray-400">{formatTime(record.checkOut)}</div>
//                     </>
//                   ) : (
//                     <span className="text-amber-600 font-medium flex items-center">
//                       <Clock size={16} className="mr-1" /> In progress
//                     </span>
//                   )}
//                 </td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                   {getDuration(record)}
//                 </td>
//               </tr>
//             ))}
//             {filteredAttendance.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
//                   No attendance records found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AttendanceList;

// import React, { useState, useEffect } from 'react';
// import { Search, Clock } from 'lucide-react';
// import { formatDate, formatTime } from '../../lib/utils';
// import Input from '../ui/Input';
// import { supabase } from '../../context/supabaseClient';

// interface AttendanceRecord {
//   id: string;
//   checkIn: string;
//   checkOut: string | null;
//   duration: number | null;
//   memberId: string;
//   memberName: string;
//   avatar?: string;
// }

// const AttendanceList: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

//   // useEffect(() => {
//   //   const fetchAttendance = async () => {
//   //     const { data: attendanceData, error: attendanceError } = await supabase
//   //       .from('attendance')
//   //       .select('*')
//   //       .order('checkIn', { ascending: false });

//   //     if (attendanceError) {
//   //       console.error('Error fetching attendance:', attendanceError.message);
//   //       return;
//   //     }

//   //     const { data: membersData, error: membersError } = await supabase
//   //       .from('members')
//   //       .select('id, name');

//   //     if (membersError) {
//   //       console.error('Error fetching members:', membersError.message);
//   //       return;
//   //     }

//   //     const formatted = (attendanceData || []).map((record) => {
//   //       const member = membersData?.find((m) => String(m.id) === String(record.memberId));
//   //       return {
//   //         id: record.id,
//   //         checkIn: record.checkIn,
//   //         checkOut: record.checkOut,
//   //         duration: record.duration,
//   //         memberId: record.memberId,
//   //         memberName: member?.name || 'Unknown',
//   //         // avatar: member?.avatar,
//   //       };
//   //     });

//   //     // ✅ Sort by latest and keep only 5
//   //     const latestFive = formatted
//   //       .sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime())
//   //       .slice(0, 5);

//   //     setAttendanceRecords(latestFive);
//   //   };

//   //   fetchAttendance();
//   // }, []);
// useEffect(() => {
//   const fetchAttendance = async () => {
//     const { data: attendanceData, error: attendanceError } = await supabase
//       .from('attendance')
//       .select('*')
//       .order('checkIn', { ascending: false });

//     if (attendanceError) {
//       console.error('Error fetching attendance:', attendanceError.message);
//       return;
//     }

//     const { data: membersData, error: membersError } = await supabase
//       .from('members')
//       .select('id, name');

//     if (membersError) {
//       console.error('Error fetching members:', membersError.message);
//       return;
//     }

//     const formatted = (attendanceData || []).map((record) => {
//       const member = membersData?.find((m) => String(m.id) === String(record.memberId));
//       return {
//         id: record.id,
//         checkIn: record.checkIn,
//         checkOut: record.checkOut,
//         duration: record.duration,
//         memberId: record.memberId,
//         memberName: member?.name || 'Unknown',
//         // avatar: member?.avatar,
//       };
//     });

//     const latestFive = formatted
//       .sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime())
//       .slice(0, 5);

//     setAttendanceRecords(latestFive);
//   };

//   fetchAttendance(); // Initial fetch

//   // 👇 Subscribe to changes in attendance table
//   const channel = supabase
//     .channel('attendance-list')
//     .on('postgres_changes', { event: '*', schema: 'public', table: 'attendance' }, () => {
//       fetchAttendance(); // Refetch on any insert/update/delete
//     })
//     .subscribe();

//   return () => {
//     supabase.removeChannel(channel);
//   };
// }, []);

//   const filteredAttendance = attendanceRecords.filter((record) =>
//     record.memberName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getDuration = (record: AttendanceRecord) => {
//     if (record.duration) {
//       const hours = Math.floor(record.duration / 60);
//       const minutes = record.duration % 60;
//       return `${hours}h ${minutes}m`;
//     }

//     if (!record.checkOut) {
//       return 'Still checked in';
//     }

//     const checkIn = new Date(record.checkIn);
//     const checkOut = new Date(record.checkOut);
//     const durationMinutes = Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60));
//     const hours = Math.floor(durationMinutes / 60);
//     const minutes = durationMinutes % 60;

//     return `${hours}h ${minutes}m`;
//   };

//   return (
//     <div className="space-y-4 animate-enter">
//       <Input
//         placeholder="Search attendance records..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         leftIcon={<Search size={18} />}
//         className="max-w-md"
//       />

//       <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
//         <table className="min-w-full divide-y divide-gray-300">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
//                 Member
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Check In
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Check Out
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Duration
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 bg-white">
//             {filteredAttendance.map((record) => (
//               <tr key={record.id} className="hover:bg-gray-50">
//                 <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
//                   <div className="flex items-center">
//                     <div className="h-10 w-10 flex-shrink-0">
//                       <img
//                         className="h-10 w-10 rounded-full"
//                         src={
//                           record.avatar ||
//                           `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                             record.memberName
//                           )}&background=0EA5E9&color=fff`
//                         }
//                         alt={record.memberName}
//                       />
//                     </div>
//                     <div className="ml-4">
//                       <div className="font-medium text-gray-900">{record.memberName}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                   <div>{formatDate(record.checkIn)}</div>
//                   <div className="text-gray-400">{formatTime(record.checkIn)}</div>
//                 </td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                   {record.checkOut ? (
//                     <>
//                       <div>{formatDate(record.checkOut)}</div>
//                       <div className="text-gray-400">{formatTime(record.checkOut)}</div>
//                     </>
//                   ) : (
//                     <span className="text-amber-600 font-medium flex items-center">
//                       <Clock size={16} className="mr-1" /> In progress
//                     </span>
//                   )}
//                 </td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                   {getDuration(record)}
//                 </td>
//               </tr>
//             ))}

//             {filteredAttendance.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
//                   No attendance records found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AttendanceList;

import React, { useState, useEffect } from 'react';
import { Search, Clock } from 'lucide-react';
import { formatDate, formatTime } from '../../lib/utils';
import Input from '../ui/Input';
import { supabase } from '../../context/supabaseClient';

interface AttendanceRecord {
  id: string;
  checkIn: string;
  checkOut: string | null;
  duration: number | null;
  memberId: string;
  memberName: string;
  avatar?: string;
}

const AttendanceList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  // const fetchAttendance = async () => {
  //   const { data: attendanceData, error: attendanceError } = await supabase
  //     .from('attendance')
  //     .select('*')
  //     .order('checkIn', { ascending: false });

  //   if (attendanceError) {
  //     console.error('Error fetching attendance:', attendanceError.message);
  //     return;
  //   }

  //   const { data: membersData, error: membersError } = await supabase
  //     .from('members')
  //     .select('id, name');

  //   if (membersError) {
  //     console.error('Error fetching members:', membersError.message);
  //     return;
  //   }

  //   const formatted = (attendanceData || []).map((record) => {
  //     const member = membersData?.find((m) => String(m.id) === String(record.memberId));
  //     return {
  //       id: record.id,
  //       checkIn: record.checkIn,
  //       checkOut: record.checkOut,
  //       duration: record.duration,
  //       memberId: record.memberId,
  //       memberName: member?.name || 'Unknown',
  //     };
  //   });

  //   const latestFive = formatted
  //     .sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime())
  //     .slice(0, 5);

  //   setAttendanceRecords(latestFive);
  // };

  const fetchAttendance = async () => {
  const user = supabase.auth.getUser ? (await supabase.auth.getUser()).data.user : null;
  const gymOwnerUUID = user?.id;

  if (!gymOwnerUUID) {
    console.error('Gym owner UUID not found.');
    return;
  }

  // ✅ Step 1: Fetch attendance records only for this gym owner
  const { data: attendanceData, error: attendanceError } = await supabase
    .from('attendance')
    .select('*')
    .eq('created_by', gymOwnerUUID) // ✅ FILTER
    .order('checkIn', { ascending: false });

  if (attendanceError) {
    console.error('Error fetching attendance:', attendanceError.message);
    return;
  }

  // ✅ Step 2: Fetch members only for this gym owner
  const { data: membersData, error: membersError } = await supabase
    .from('members')
    .select('id, name')
    .eq('created_by', gymOwnerUUID); // ✅ FILTER

  if (membersError) {
    console.error('Error fetching members:', membersError.message);
    return;
  }

  // ✅ Step 3: Format and match member names
  const formatted = (attendanceData || []).map((record) => {
    const member = membersData?.find((m) => String(m.id) === String(record.memberId));
    return {
      id: record.id,
      checkIn: record.checkIn,
      checkOut: record.checkOut,
      duration: record.duration,
      memberId: record.memberId,
      memberName: member?.name || 'Unknown',
    };
  });

  // ✅ Step 4: Take the latest 5 records
  const latestFive = formatted
    .sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime())
    .slice(0, 5);

  setAttendanceRecords(latestFive);
};


  useEffect(() => {
  fetchAttendance(); // Initial fetch

  const channel = supabase
    .channel('attendance-updates')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'attendance' },
      (payload) => {
        console.log('Realtime update:', payload);
        fetchAttendance(); // Refresh list on insert/update/delete
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  const filteredAttendance = attendanceRecords.filter((record) =>
    record.memberName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDuration = (record: AttendanceRecord) => {
    if (record.duration) {
      const hours = Math.floor(record.duration / 60);
      const minutes = record.duration % 60;
      return `${hours}h ${minutes}m`;
    }

    if (!record.checkOut) {
      return 'Still checked in';
    }

    const checkIn = new Date(record.checkIn);
    const checkOut = new Date(record.checkOut);
    const durationMinutes = Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60));
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-4 animate-enter">
      <Input
        placeholder="Search attendance records..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        leftIcon={<Search size={18} />}
        className="max-w-md"
      />

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Member
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Check In
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Check Out
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Duration
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredAttendance.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={
                          record.avatar ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            record.memberName
                          )}&background=0EA5E9&color=fff`
                        }
                        alt={record.memberName}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{record.memberName}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div>{formatDate(record.checkIn)}</div>
                  <div className="text-gray-400">{formatTime(record.checkIn)}</div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {record.checkOut ? (
                    <>
                      <div>{formatDate(record.checkOut)}</div>
                      <div className="text-gray-400">{formatTime(record.checkOut)}</div>
                    </>
                  ) : (
                    <span className="text-amber-600 font-medium flex items-center">
                      <Clock size={16} className="mr-1" /> In progress
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {getDuration(record)}
                </td>
              </tr>
            ))}

            {filteredAttendance.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceList;
