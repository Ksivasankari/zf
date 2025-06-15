// import React, { createContext, useContext, useState } from 'react';
// import { Member, Trainer, Membership } from '../types';
// import { members as initialMembers, trainers as initialTrainers, memberships as initialMemberships } from '../data/mockData';

// interface MemberContextType {
//   members: Member[];
//   trainers: Trainer[];
//   memberships: Membership[];
//   addMember: (member: Member) => void;
//   updateMember: (member: Member) => void;
//   deleteMember: (id: string) => void;
//   addTrainer: (trainer: Trainer) => void;
//   updateTrainer: (trainer: Trainer) => void;
//   deleteTrainer: (id: string) => void;
//   addMembership: (membership: Membership) => void;
//   updateMembership: (membership: Membership) => void;
//   deleteMembership: (id: string) => void;
// }

// const MemberContext = createContext<MemberContextType | undefined>(undefined);

// export const useMemberContext = () => {
//   const context = useContext(MemberContext);
//   if (!context) {
//     throw new Error('useMemberContext must be used within a MemberProvider');
//   }
//   return context;
// };

// export const MemberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [members, setMembers] = useState<Member[]>(initialMembers);
//   const [trainers, setTrainers] = useState<Trainer[]>(initialTrainers);
//   const [memberships, setMemberships] = useState<Membership[]>(initialMemberships);

//   const addMember = (member: Member) => {
//     setMembers(prev => [...prev, member]);
//   };

//   const updateMember = (updatedMember: Member) => {
//     setMembers(prev => prev.map(member => 
//       member.id === updatedMember.id ? updatedMember : member
//     ));
//   };

//   const deleteMember = (id: string) => {
//     setMembers(prev => prev.filter(member => member.id !== id));
//   };

//   const addTrainer = (trainer: Trainer) => {
//     setTrainers(prev => [...prev, trainer]);
//   };

//   const updateTrainer = (updatedTrainer: Trainer) => {
//     setTrainers(prev => prev.map(trainer => 
//       trainer.id === updatedTrainer.id ? updatedTrainer : trainer
//     ));
//   };

//   const deleteTrainer = (id: string) => {
//     setTrainers(prev => prev.filter(trainer => trainer.id !== id));
//   };

//   const addMembership = (membership: Membership) => {
//     setMemberships(prev => [...prev, membership]);
//   };

//   const updateMembership = (updatedMembership: Membership) => {
//     setMemberships(prev => prev.map(membership =>
//       membership.id === updatedMembership.id ? updatedMembership : membership
//     ));
//   };

//   const deleteMembership = (id: string) => {
//     setMemberships(prev => prev.filter(membership => membership.id !== id));
//   };

//   return (
//     <MemberContext.Provider value={{
//       members,
//       trainers,
//       memberships,
//       addMember,
//       updateMember,
//       deleteMember,
//       addTrainer,
//       updateTrainer,
//       deleteTrainer,
//       addMembership,
//       updateMembership,
//       deleteMembership,
//     }}>
//       {children}
//     </MemberContext.Provider>
//   );
// };

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { Member, Trainer, Membership } from '../types';
// import { trainers as initialTrainers, memberships as initialMemberships } from '../data/mockData';
// import { supabase } from './supabaseClient';

// interface MemberContextType {
//   members: Member[];
//   trainers: Trainer[];
//   memberships: Membership[];
//   addMember: (member: Member) => void;
//   updateMember: (member: Member) => void;
//   deleteMember: (id: string) => void;
//   addTrainer: (trainer: Trainer) => void;
//   updateTrainer: (trainer: Trainer) => void;
//   deleteTrainer: (id: string) => void;
//   addMembership: (membership: Membership) => void;
//   updateMembership: (membership: Membership) => void;
//   deleteMembership: (id: string) => void;
// }

// const MemberContext = createContext<MemberContextType | undefined>(undefined);

// export const useMemberContext = () => {
//   const context = useContext(MemberContext);
//   if (!context) {
//     throw new Error('useMemberContext must be used within a MemberProvider');
//   }
//   return context;
// };

// export const MemberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [members, setMembers] = useState<Member[]>([]);
//   const [trainers, setTrainers] = useState<Trainer[]>(initialTrainers);
//   const [memberships, setMemberships] = useState<Membership[]>(initialMemberships);

//   // ✅ Load members from Supabase on mount
//   useEffect(() => {
//     const fetchMembers = async () => {
//       const { data, error } = await supabase.from('members').select('*');
//       if (error) {
//         console.error('Failed to fetch members:', error);
//       } else {
//         setMembers(data as Member[]);
//       }
//     };
//     fetchMembers();
//   }, []);

//   const addMember = (member: Member) => {
//     setMembers(prev => [...prev, member]);
//   };

//   const updateMember = (updatedMember: Member) => {
//     setMembers(prev =>
//       prev.map(member =>
//         member.id === updatedMember.id ? updatedMember : member
//       )
//     );
//   };

//   const deleteMember = (id: string) => {
//     setMembers(prev => prev.filter(member => member.id !== id));
//   };

//   const addTrainer = (trainer: Trainer) => {
//     setTrainers(prev => [...prev, trainer]);
//   };

//   const updateTrainer = (updatedTrainer: Trainer) => {
//     setTrainers(prev =>
//       prev.map(trainer =>
//         trainer.id === updatedTrainer.id ? updatedTrainer : trainer
//       )
//     );
//   };

//   const deleteTrainer = (id: string) => {
//     setTrainers(prev => prev.filter(trainer => trainer.id !== id));
//   };

//   const addMembership = (membership: Membership) => {
//     setMemberships(prev => [...prev, membership]);
//   };

//   const updateMembership = (updatedMembership: Membership) => {
//     setMemberships(prev =>
//       prev.map(membership =>
//         membership.id === updatedMembership.id ? updatedMembership : membership
//       )
//     );
//   };

//   const deleteMembership = (id: string) => {
//     setMemberships(prev => prev.filter(membership => membership.id !== id));
//   };

//   return (
//     <MemberContext.Provider
//       value={{
//         members,
//         trainers,
//         memberships,
//         addMember,
//         updateMember,
//         deleteMember,
//         addTrainer,
//         updateTrainer,
//         deleteTrainer,
//         addMembership,
//         updateMembership,
//         deleteMembership,
//       }}
//     >
//       {children}
//     </MemberContext.Provider>
//   );
// };


// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { Member, Trainer, Membership } from '../types';
// import { supabase } from './supabaseClient';

// interface MemberContextType {
//   members: Member[];
//   trainers: Trainer[];
//   memberships: Membership[];
//   addMember: (member: Member) => Promise<Error | null>;
//   updateMember: (member: Member) => Promise<Error | null>;
//   deleteMember: (id: string) => Promise<Error | null>;
//   addTrainer: (trainer: Trainer) => Promise<Error | null>;
//   updateTrainer: (trainer: Trainer) => Promise<Error | null>;
//   deleteTrainer: (id: string) => Promise<Error | null>;
//   addMembership: (membership: Membership) => Promise<Error | null>;
//   updateMembership: (membership: Membership) => Promise<Error | null>;
//   deleteMembership: (id: string) => Promise<Error | null>;
// }

// const MemberContext = createContext<MemberContextType | undefined>(undefined);

// export const useMemberContext = () => {
//   const context = useContext(MemberContext);
//   if (!context) {
//     throw new Error('useMemberContext must be used within a MemberProvider');
//   }
//   return context;
// };

// export const MemberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [members, setMembers] = useState<Member[]>([]);
//   const [trainers, setTrainers] = useState<Trainer[]>([]);
//   const [memberships, setMemberships] = useState<Membership[]>([]);

//   // Fetch all data on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       const { data: membersData, error: membersError } = await supabase.from('members').select('*');
//       if (!membersError && membersData) setMembers(membersData);

//       const { data: trainersData, error: trainersError } = await supabase.from('trainers').select('*');
//       if (!trainersError && trainersData) setTrainers(trainersData);

//       const { data: membershipsData, error: membershipsError } = await supabase.from('memberships').select('*');
//       if (!membershipsError && membershipsData) setMemberships(membershipsData);
//     };
//     fetchData();
//   }, []);

//   // Members CRUD
//   const addMember = async (member: Member): Promise<Error | null> => {
//     const { error } = await supabase.from('members').insert([member]);
//     if (error) {
//       console.error('Failed to add member:', error);
//       return error;
//     }
//     setMembers(prev => [...prev, member]);
//     return null;
//   };

//   const updateMember = async (member: Member): Promise<Error | null> => {
//     const { error } = await supabase.from('members').update(member).eq('id', member.id);
//     if (error) {
//       console.error('Failed to update member:', error);
//       return error;
//     }
//     setMembers(prev => prev.map(m => (m.id === member.id ? member : m)));
//     return null;
//   };

//   const deleteMember = async (id: string): Promise<Error | null> => {
//     const { error } = await supabase.from('members').delete().eq('id', id);
//     if (error) {
//       console.error('Failed to delete member:', error);
//       return error;
//     }
//     setMembers(prev => prev.filter(m => m.id !== id));
//     return null;
//   };

//   // Trainers CRUD
//   // const addTrainer = async (trainer: Trainer): Promise<Error | null> => {
//   //   const { error } = await supabase.from('trainers').insert([trainer]);
//   //   if (error) {
//   //     console.error('Failed to add trainer:', error);
//   //     return error;
//   //   }
//   //   setTrainers(prev => [...prev, trainer]);
//   //   return null;
//   // };
// const addTrainer = async (trainer: Omit<Trainer, 'id' | 'trainerId'>): Promise<Error | null> => {
//   // Step 1: Fetch existing trainers to determine the last trainerId
//   const { data: existingTrainers, error: fetchError } = await supabase
//     .from('trainers')
//     .select('trainerId')
//     .order('trainerId', { ascending: false });

//   if (fetchError) return fetchError;

//   let nextTrainerId = 'TR001';
//   if (existingTrainers && existingTrainers.length > 0) {
//     const lastId = existingTrainers[0].trainerId; // e.g., "TR005"
//     const numberPart = parseInt(lastId.replace('TR', '')) + 1;
//     nextTrainerId = `TR${String(numberPart).padStart(3, '0')}`; // => "TR006"
//   }

//   // Step 2: Insert new trainer with the generated trainerId
//   const { data, error } = await supabase
//     .from('trainers')
//     .insert([{ ...trainer, trainerId: nextTrainerId }])
//     .select()
//     .single();

//   if (error) return error;

//   // Step 3: Update local state with new trainer
//   setTrainers(prev => [...prev, data as Trainer]);
//   return null;
// };

//   // const updateTrainer = async (trainer: Trainer): Promise<Error | null> => {
//   //   const { error } = await supabase.from('trainers').update(trainer).eq('id', trainer.id);
//   //   if (error) {
//   //     console.error('Failed to update trainer:', error);
//   //     return error;
//   //   }
//   //   setTrainers(prev => prev.map(t => (t.id === trainer.id ? trainer : t)));
//   //   return null;
//   // };

//   const updateTrainer = async (trainer: Trainer): Promise<Error | null> => {
//   const { error } = await supabase
//     .from('trainers')
//     .update({
//       name: trainer.name,
//       email: trainer.email,
//       phone: trainer.phone,
//       experience: trainer.experience,
//       specialization: trainer.specialization,
//       status: trainer.status,
//       assignedMembers: trainer.assignedMembers,  // ✅ make sure this is included
//     })
//     .eq('id', trainer.id);

//   if (error) {
//     console.error('Failed to update trainer:', error);
//     return error;
//   }

//   setTrainers(prev =>
//     prev.map(t => (t.id === trainer.id ? trainer : t))
//   );

//   return null;
// };


//   const deleteTrainer = async (id: string): Promise<Error | null> => {
//     const { error } = await supabase.from('trainers').delete().eq('id', id);
//     if (error) {
//       console.error('Failed to delete trainer:', error);
//       return error;
//     }
//     setTrainers(prev => prev.filter(t => t.id !== id));
//     return null;
//   };

//   // Memberships CRUD
//   const addMembership = async (membership: Membership): Promise<Error | null> => {
//     const { error } = await supabase.from('memberships').insert([membership]);
//     if (error) {
//       console.error('Failed to add membership:', error);
//       return error;
//     }
//     setMemberships(prev => [...prev, membership]);
//     return null;
//   };

//   // const updateMembership = async (membership: Membership): Promise<Error | null> => {
//   //   const { error } = await supabase.from('memberships').update(membership).eq('id', membership.id);
//   //   if (error) {
//   //     console.error('Failed to update membership:', error);
//   //     return error;
//   //   }
//   //   setMemberships(prev => prev.map(m => (m.id === membership.id ? membership : m)));
//   //   return null;
//   // };

//   const updateMembership = async (membership: Membership): Promise<Error | null> => {
//   const { data, error } = await supabase
//     .from('memberships')
//     .update(membership)
//     .eq('id', membership.id)
//     .select()
//     .single();

//   if (error) {
//     console.error('Failed to update membership:', error);
//     return error;
//   }

//   setMemberships(prev =>
//     prev.map(m => (m.id === membership.id ? data : m))
//   );
//   return null;
// };

//   const deleteMembership = async (id: string): Promise<Error | null> => {
//     const { error } = await supabase.from('memberships').delete().eq('id', id);
//     if (error) {
//       console.error('Failed to delete membership:', error);
//       return error;
//     }
//     setMemberships(prev => prev.filter(m => m.id !== id));
//     return null;
//   };

//   return (
//     <MemberContext.Provider
//       value={{
//         members,
//         trainers,
//         memberships,
//         addMember,
//         updateMember,
//         deleteMember,
//         addTrainer,
//         updateTrainer,
//         deleteTrainer,
//         addMembership,
//         updateMembership,
//         deleteMembership,
//       }}
//     >
//       {children}
//     </MemberContext.Provider>
//   );
// };

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Member, Trainer, Membership } from '../types';
import { supabase } from './supabaseClient';

interface MemberContextType {
  members: Member[];
  trainers: Trainer[];
  memberships: Membership[];
  addMember: (member: Member) => Promise<Error | null>;
  updateMember: (member: Member) => Promise<Error | null>;
  deleteMember: (id: string) => Promise<Error | null>;
  addTrainer: (trainer: Trainer) => Promise<Error | null>;
  updateTrainer: (trainer: Trainer) => Promise<Error | null>;
  deleteTrainer: (id: string) => Promise<Error | null>;
  addMembership: (membership: Membership) => Promise<Error | null>;
  updateMembership: (membership: Membership) => Promise<Error | null>;
  deleteMembership: (id: string) => Promise<Error | null>;

  // New function to remove a member from assignedMembers array of a trainer
  removeMemberFromTrainer: (trainerId: string, memberId: string) => Promise<Error | null>;
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export const useMemberContext = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMemberContext must be used within a MemberProvider');
  }
  return context;
};

export const MemberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      const { data: membersData, error: membersError } = await supabase.from('members').select('*');
      if (!membersError && membersData) setMembers(membersData);

      const { data: trainersData, error: trainersError } = await supabase.from('trainers').select('*');
      if (!trainersError && trainersData) setTrainers(trainersData);

      const { data: membershipsData, error: membershipsError } = await supabase.from('memberships').select('*');
      if (!membershipsError && membershipsData) setMemberships(membershipsData);
    };
    fetchData();
  }, []);

  // Members CRUD
  const addMember = async (member: Member): Promise<Error | null> => {
    const { error } = await supabase.from('members').insert([member]);
    if (error) {
      console.error('Failed to add member:', error);
      return error;
    }
    setMembers(prev => [...prev, member]);
    return null;
  };

  const updateMember = async (member: Member): Promise<Error | null> => {
    const { error } = await supabase.from('members').update(member).eq('id', member.id);
    if (error) {
      console.error('Failed to update member:', error);
      return error;
    }
    setMembers(prev => prev.map(m => (m.id === member.id ? member : m)));
    return null;
  };

  const deleteMember = async (id: string): Promise<Error | null> => {
    const { error } = await supabase.from('members').delete().eq('id', id);
    if (error) {
      console.error('Failed to delete member:', error);
      return error;
    }
    setMembers(prev => prev.filter(m => m.id !== id));
    return null;
  };

  // Trainers CRUD
  const addTrainer = async (trainer: Omit<Trainer, 'id' | 'trainerId'>): Promise<Error | null> => {
    const { data: existingTrainers, error: fetchError } = await supabase
      .from('trainers')
      .select('trainerId')
      .order('trainerId', { ascending: false });

    if (fetchError) return fetchError;

    let nextTrainerId = 'TR001';
    if (existingTrainers && existingTrainers.length > 0) {
      const lastId = existingTrainers[0].trainerId;
      const numberPart = parseInt(lastId.replace('TR', '')) + 1;
      nextTrainerId = `TR${String(numberPart).padStart(3, '0')}`;
    }

    const { data, error } = await supabase
      .from('trainers')
      .insert([{ ...trainer, trainerId: nextTrainerId }])
      .select()
      .single();

    if (error) return error;

    setTrainers(prev => [...prev, data as Trainer]);
    return null;
  };

  // const updateTrainer = async (trainer: Trainer): Promise<Error | null> => {
  //   const { error } = await supabase
  //     .from('trainers')
  //     .update({
  //       name: trainer.name,
  //       email: trainer.email,
  //       phone: trainer.phone,
  //       experience: trainer.experience,
  //       specialization: trainer.specialization,
  //       status: trainer.status,
  //       assignedMembers: trainer.assignedMembers,
  //     })
  //     .eq('id', trainer.id);

  //   if (error) {
  //     console.error('Failed to update trainer:', error);
  //     return error;
  //   }

  //   setTrainers(prev =>
  //     prev.map(t => (t.id === trainer.id ? trainer : t))
  //   );

  //   return null;
  // };
  const updateTrainer = async (trainer: Trainer): Promise<Error | null> => {
  const { error } = await supabase
    .from('trainers')
    .update({
      name: trainer.name,
      email: trainer.email,
      phone: trainer.phone,
      experience: trainer.experience,
      specialization: trainer.specialization,
      status: trainer.status,
      assignedMembers: trainer.assignedMembers,
      imageUrl: trainer.imageUrl, // ✅ Use imageUrl instead of avatar
    })
    .eq('id', trainer.id);

  if (error) {
    console.error('Failed to update trainer:', error);
    return error;
  }

  setTrainers(prev =>
    prev.map(t => (t.id === trainer.id ? trainer : t))
  );

  return null;
};


  const deleteTrainer = async (id: string): Promise<Error | null> => {
    const { error } = await supabase.from('trainers').delete().eq('id', id);
    if (error) {
      console.error('Failed to delete trainer:', error);
      return error;
    }
    setTrainers(prev => prev.filter(t => t.id !== id));
    return null;
  };

  // Memberships CRUD
  const addMembership = async (membership: Membership): Promise<Error | null> => {
    const { error } = await supabase.from('memberships').insert([membership]);
    if (error) {
      console.error('Failed to add membership:', error);
      return error;
    }
    setMemberships(prev => [...prev, membership]);
    return null;
  };

  const updateMembership = async (membership: Membership): Promise<Error | null> => {
    const { data, error } = await supabase
      .from('memberships')
      .update(membership)
      .eq('id', membership.id)
      .select()
      .single();

    if (error) {
      console.error('Failed to update membership:', error);
      return error;
    }

    setMemberships(prev =>
      prev.map(m => (m.id === membership.id ? data : m))
    );
    return null;
  };

  const deleteMembership = async (id: string): Promise<Error | null> => {
    const { error } = await supabase.from('memberships').delete().eq('id', id);
    if (error) {
      console.error('Failed to delete membership:', error);
      return error;
    }
    setMemberships(prev => prev.filter(m => m.id !== id));
    return null;
  };

  // *** New: Remove member from trainer's assignedMembers list ***
  const removeMemberFromTrainer = async (trainerId: string, memberId: string): Promise<Error | null> => {
    const trainer = trainers.find(t => t.id === trainerId);
    if (!trainer) {
      const err = new Error('Trainer not found');
      console.error(err);
      return err;
    }

    const updatedAssignedMembers = (trainer.assignedMembers || []).filter(id => id !== memberId);

    const { error } = await supabase
      .from('trainers')
      .update({ assignedMembers: updatedAssignedMembers })
      .eq('id', trainerId);

    if (error) {
      console.error('Failed to update assignedMembers:', error);
      return error;
    }

    setTrainers(prev =>
      prev.map(t =>
        t.id === trainerId ? { ...t, assignedMembers: updatedAssignedMembers } : t
      )
    );

    return null;
  };

  return (
    <MemberContext.Provider
      value={{
        members,
        trainers,
        memberships,
        addMember,
        updateMember,
        deleteMember,
        addTrainer,
        updateTrainer,
        deleteTrainer,
        addMembership,
        updateMembership,
        deleteMembership,
        removeMemberFromTrainer,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};

