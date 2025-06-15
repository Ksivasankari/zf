// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ArrowLeft, Mail, Phone, Calendar, Award, Users, X } from 'lucide-react';
// import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
// import Badge from '../components/ui/Badge';
// import Button from '../components/ui/Button';
// import { formatDate } from '../lib/utils';
// import { useMemberContext } from '../context/MemberContext';
// import { supabase } from '../context/supabaseClient';
// import toast from 'react-hot-toast';

// const TrainerDetailsPage: React.FC = () => {
//   const { id } = useParams();
//   const { trainers, members: allMembers, updateTrainer } = useMemberContext();

//   const trainer = trainers.find(t => t.id.toString() === id);
//   const [formData, setFormData] = useState<any>({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [showMemberModal, setShowMemberModal] = useState(false);
//   const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
//   const [newImageFile, setNewImageFile] = useState<File | null>(null);

//   useEffect(() => {
//     if (trainer) {
//       setFormData(trainer);
//       setSelectedMembers((trainer.assignedMembers || []).map(id => id.toString()));
//     }
//   }, [trainer]);

//   const assignedMembers = allMembers.filter(m => selectedMembers.includes(m.id.toString()));
//   const availableMembers = allMembers.filter(m => !selectedMembers.includes(m.id.toString()));

//   const handleChange = (field: string, value: string) => {
//     setFormData((prev: any) => ({ ...prev, [field]: value }));
//   };

//   const uploadImageAndGetUrl = async (file: File, trainerId: string): Promise<string | null> => {
//     const fileExt = file.name.split('.').pop();
//     const fileName = `${trainerId}_${Date.now()}.${fileExt}`;
//     const filePath = `${fileName}`;

//     const { error: uploadError } = await supabase.storage
//       .from('trainer photo')
//       .upload(filePath, file, {
//         upsert: true,
//       });

//     if (uploadError) {
//       console.error('Upload error:', uploadError.message);
//       toast.error('Failed to upload image');
//       return null;
//     }

//     const { data: imageUrlData } = supabase.storage
//       .from('trainer photo')
//       .getPublicUrl(filePath);

//     return imageUrlData?.publicUrl || null;
//   };

//   const handleSave = async () => {
//   if (!trainer) return; // ✅ Add this guard clause

//   if (!formData?.name || !formData?.email || !formData?.phone) {
//     toast.error('Name, email, and phone are required');
//     return;
//   }

//   let avatarUrl = formData.avatar;

//   if (newImageFile) {
//     const uploadedUrl = await uploadImageAndGetUrl(newImageFile, trainer.id.toString()); // ✅ safe now
//     if (uploadedUrl) {
//       avatarUrl = uploadedUrl;
//     }
//   }

//   const updatedTrainer = {
//     ...trainer,
//     name: formData.name,
//     email: formData.email,
//     phone: formData.phone,
//     experience: formData.experience,
//     specialization: formData.specialization,
//     assignedMembers: selectedMembers,
//     avatar: avatarUrl,
//     status: formData.status || trainer.status,
//   };

//   const error = await updateTrainer(updatedTrainer);
//   if (error) {
//     toast.error('Failed to update trainer');
//     return;
//   }

//   setIsEditing(false);
//   setNewImageFile(null);
//   toast.success('Trainer details updated successfully');
// };


//   const handleRemoveMember = async (memberId: string) => {
//     if (!trainer) return;

//     const updatedAssignedMembers = selectedMembers.filter(id => id !== memberId);
//     const updatedTrainer = {
//       ...trainer,
//       assignedMembers: updatedAssignedMembers,
//     };

//     const error = await updateTrainer(updatedTrainer);
//     if (!error) {
//       setSelectedMembers(updatedAssignedMembers);
//       setFormData(updatedTrainer);
//       toast.success('Member removed from trainer');
//     } else {
//       toast.error('Failed to remove member from trainer');
//     }
//   };

//   const handleAddMember = (memberId: string) => {
//     if (!selectedMembers.includes(memberId)) {
//       setSelectedMembers(prev => [...prev, memberId]);
//       toast.success('Member assigned to trainer');
//     }
//   };

//   const MemberAssignmentModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Assign New Members</h3>
//           <button onClick={() => setShowMemberModal(false)} className="text-gray-500 hover:text-gray-700">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="space-y-4">
//           {availableMembers.length === 0 && (
//             <p className="text-center text-gray-500 py-4">No available members to assign</p>
//           )}
//           {availableMembers.map(member => (
//             <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
//               <div className="flex items-center">
//                 <img
//                   src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
//                   alt={member.name}
//                   className="h-10 w-10 rounded-full"
//                 />
//                 <div className="ml-3">
//                   <p className="font-medium">{member.name}</p>
//                   <p className="text-sm text-gray-500">{member.email}</p>
//                 </div>
//               </div>
//               <Button variant="outline" size="sm" onClick={() => handleAddMember(member.id.toString())}>
//                 Assign
//               </Button>
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 flex justify-end">
//           <Button variant="outline" onClick={() => setShowMemberModal(false)}>
//             Close
//           </Button>
//         </div>
//       </div>
//     </div>
//   );

//   if (!trainer) {
//     return (
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900">Trainer not found</h2>
//           <p className="mt-2 text-gray-600">The trainer you're looking for doesn't exist.</p>
//           <Link to="/members" className="mt-4 inline-block">
//             <Button variant="primary" leftIcon={<ArrowLeft size={16} />}>
//               Back to Members
//             </Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <Link to="/members" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Members
//         </Link>
//         <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
//           {isEditing ? 'Cancel Edit' : 'Edit Trainer'}
//         </Button>
//       </div>

//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//           <div className="flex items-center">
//             <img
//               src={formData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(trainer.name)}&background=0EA5E9&color=fff`}
//               alt={trainer.name}
//               className="h-16 w-16 rounded-full"
//             />
//             <div className="ml-4">
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={formData?.name || ''}
//                   onChange={(e) => handleChange('name', e.target.value)}
//                   className="text-2xl font-bold text-gray-900 border rounded px-2 py-1"
//                 />
//               ) : (
//                 <h1 className="text-2xl font-bold text-gray-900">{trainer.name}</h1>
//               )}
//               <div className="mt-1 flex items-center">
//                 <Badge variant={trainer.status === 'active' ? 'success' : 'danger'}>
//                   {trainer.status.charAt(0).toUpperCase() + trainer.status.slice(1)}
//                 </Badge>
//                 <span className="ml-2 text-sm text-gray-500">Trainer ID: {trainer.trainerId}</span>
//               </div>

//               {isEditing && (
//                 <div className="mt-2">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file) {
//                         setNewImageFile(file);
//                       }
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="px-4 py-5 sm:p-6">
//           <div className="grid grid-cols-1 gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Personal Information</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <Mail className="h-4 w-4 mr-2" />
//                       Email
//                     </dt>
//                     <dd className="text-sm text-gray-900">
//                       {isEditing ? (
//                         <input
//                           type="email"
//                           className="border border-gray-300 rounded px-2 py-1 w-full"
//                           value={formData?.email || ''}
//                           onChange={(e) => handleChange('email', e.target.value)}
//                         />
//                       ) : (
//                         trainer.email
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
//                         <input
//                           type="text"
//                           className="border border-gray-300 rounded px-2 py-1 w-full"
//                           value={formData?.phone || ''}
//                           onChange={(e) => handleChange('phone', e.target.value)}
//                         />
//                       ) : (
//                         trainer.phone
//                       )}
//                     </dd>
//                   </div>

//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <Calendar className="h-4 w-4 mr-2" />
//                       Joined
//                     </dt>
//                     <dd className="text-sm text-gray-900">{formatDate(trainer.joinDate)}</dd>
//                   </div>

//                   <div className="flex items-center">
//                     <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
//                       <Award className="h-4 w-4 mr-2" />
//                       Experience
//                     </dt>
//                     <dd className="text-sm text-gray-900">
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           className="border border-gray-300 rounded px-2 py-1 w-full"
//                           value={formData?.experience || ''}
//                           onChange={(e) => handleChange('experience', e.target.value)}
//                         />
//                       ) : (
//                         trainer.experience
//                       )}
//                     </dd>
//                   </div>
//                 </dl>

//                 {isEditing && (
//                   <div className="mt-4">
//                     <Button variant="primary" onClick={handleSave}>
//                       Save Changes
//                     </Button>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Specialization</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {isEditing ? (
//                   <textarea
//                     className="border border-gray-300 rounded px-2 py-1 w-full"
//                     rows={2}
//                     value={formData?.specialization || ''}
//                     onChange={(e) => handleChange('specialization', e.target.value)}
//                   />
//                 ) : (
//                   <p className="text-gray-700">{trainer.specialization}</p>
//                 )}
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center justify-between">
//                   <span>Assigned Members</span>
//                   <Button variant="outline" size="sm" onClick={() => setShowMemberModal(true)}>
//                     Assign New Member
//                   </Button>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="divide-y divide-gray-200">
//                   {assignedMembers.length === 0 && (
//                     <div className="text-center py-4">
//                       <Users className="mx-auto h-12 w-12 text-gray-400" />
//                       <p className="mt-2 text-sm text-gray-500">No members assigned</p>
//                     </div>
//                   )}
//                   {assignedMembers.map((member) => (
//                     <div key={member.id} className="py-3 flex items-center justify-between">
//                       <div className="flex items-center">
//                         <img
//                           src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
//                           alt={member.name}
//                           className="h-10 w-10 rounded-full"
//                         />
//                         <div className="ml-3">
//                           <p className="text-sm font-medium text-gray-900">{member.name}</p>
//                           <p className="text-sm text-gray-500">{member.email}</p>
//                         </div>
//                       </div>
//                       <div className="flex gap-2">
//                         <Link to={`/members/${member.id}`}>
//                           <Button variant="outline" size="sm">
//                             View Profile
//                           </Button>
//                         </Link>
//                         <Button variant="outline" size="sm" onClick={() => handleRemoveMember(member.id.toString())}>
//                           Remove
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {showMemberModal && <MemberAssignmentModal />}
//     </div>
//   );
// };

// export default TrainerDetailsPage;


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, Award, Users, X, Upload } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { formatDate } from '../lib/utils';
import { useMemberContext } from '../context/MemberContext';
import toast from 'react-hot-toast';
import { supabase } from '../context/supabaseClient';

const TrainerDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { trainers, members: allMembers, updateTrainer } = useMemberContext();

  const trainer = trainers.find(t => t.id.toString() === id);

  const [formData, setFormData] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (trainer) {
      setFormData(trainer);
      setSelectedMembers((trainer.assignedMembers || []).map(id => id.toString()));
      setImagePreview(trainer.imageUrl || '');
    }
  }, [trainer]);

  const assignedMembers = allMembers.filter(m => selectedMembers.includes(m.id.toString()));
  const availableMembers = allMembers.filter(m => !selectedMembers.includes(m.id.toString()));

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
  if (!formData.name || !formData.email || !formData.phone) {
    toast.error('Name, email, and phone are required');
    return;
  }

  let imageUrl = formData.imageUrl;

  if (selectedImage) {
    const fileExt = selectedImage.name.split('.').pop();
    const filePath = `${formData.name.replace(/\s/g, '_')}_${Date.now()}.${fileExt}`;
    const { data, error: uploadError } = await supabase.storage
      .from('trainer-photos')
      .upload(filePath, selectedImage, { upsert: true });

    if (uploadError) {
      toast.error('Failed to upload image');
      return;
    }

    const { data: publicUrlData } = supabase
      .storage
      .from('trainer-photos')
      .getPublicUrl(filePath);

    imageUrl = publicUrlData?.publicUrl || imageUrl;
  }

  const updatedTrainer = {
    ...trainer!, // Non-null assertion here
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    experience: formData.experience,
    specialization: formData.specialization,
    assignedMembers: selectedMembers,
    status: formData.status || trainer!.status,
    imageUrl,
  };

  const error = await updateTrainer(updatedTrainer);
  if (error) {
    toast.error('Failed to update trainer');
    return;
  }

  setIsEditing(false);
  toast.success('Trainer details updated successfully');
};


  const handleRemoveMember = async (memberId: string) => {
  const updatedAssignedMembers = selectedMembers.filter(id => id !== memberId);

  const updatedTrainer = {
    ...trainer!, // Non-null assertion here
    assignedMembers: updatedAssignedMembers,
  };

  const error = await updateTrainer(updatedTrainer);
  if (!error) {
    setSelectedMembers(updatedAssignedMembers);
    setFormData(updatedTrainer);
    toast.success('Member removed from trainer');
  } else {
    toast.error('Failed to remove member');
  }
};


  const handleAddMember = (memberId: string) => {
    if (!selectedMembers.includes(memberId)) {
      setSelectedMembers(prev => [...prev, memberId]);
      toast.success('Member assigned to trainer');
    }
  };

  const MemberAssignmentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Assign New Members</h3>
          <button onClick={() => setShowMemberModal(false)} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {availableMembers.length === 0 && (
            <p className="text-center text-gray-500 py-4">No available members to assign</p>
          )}
          {availableMembers.map(member => (
            <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                <img
                  src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
                  alt={member.name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleAddMember(member.id.toString())}>
                Assign
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={() => setShowMemberModal(false)}>Close</Button>
        </div>
      </div>
    </div>
  );

  if (!trainer) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Trainer not found</h2>
          <p className="mt-2 text-gray-600">The trainer you're looking for doesn't exist.</p>
          <Link to="/members">
            <Button variant="primary" leftIcon={<ArrowLeft size={16} />}>Back to Members</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link to="/members" className="text-sm text-gray-500 hover:text-gray-700 inline-flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Link>
        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel Edit' : 'Edit Trainer'}
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 border-b">
          <div className="flex items-center">
            <div className="relative">
              <img
                src={imagePreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(trainer.name)}&background=0EA5E9&color=fff`}
                alt={trainer.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer">
                  <Upload size={16} />
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              )}
            </div>
            <div className="ml-4">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="text-2xl font-bold text-gray-900 border rounded px-2 py-1"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-900">{trainer.name}</h1>
              )}
              <div className="mt-1 flex items-center">
                <Badge variant={trainer.status === 'active' ? 'success' : 'danger'}>
                  {trainer.status.charAt(0).toUpperCase() + trainer.status.slice(1)}
                </Badge>
                <span className="ml-2 text-sm text-gray-500">Trainer ID: {trainer.trainerId}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-5">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-gray-500" />
                    {isEditing ? (
                      <input
                        type="email"
                        className="border rounded px-2 py-1 w-full"
                        value={formData.email || ''}
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                    ) : (
                      <span>{trainer.email}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-gray-500" />
                    {isEditing ? (
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        value={formData.phone || ''}
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    ) : (
                      <span>{trainer.phone}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{formatDate(trainer.joinDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="mr-2 h-4 w-4 text-gray-500" />
                    {isEditing ? (
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        value={formData.experience || ''}
                        onChange={(e) => handleChange('experience', e.target.value)}
                      />
                    ) : (
                      <span>{trainer.experience}</span>
                    )}
                  </div>
                </dl>
                {isEditing && (
                  <div className="mt-4">
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Specialization</CardTitle></CardHeader>
              <CardContent>
                {isEditing ? (
                  <textarea
                    className="border rounded px-2 py-1 w-full"
                    rows={2}
                    value={formData.specialization || ''}
                    onChange={(e) => handleChange('specialization', e.target.value)}
                  />
                ) : (
                  <p>{trainer.specialization}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Assigned Members</span>
                  <Button variant="outline" size="sm" onClick={() => setShowMemberModal(true)}>Assign New Member</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {assignedMembers.length === 0 ? (
                  <div className="text-center py-4">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="text-sm text-gray-500">No members assigned</p>
                  </div>
                ) : (
                  assignedMembers.map(member => (
                    <div key={member.id} className="py-3 flex justify-between items-center border-b">
                      <div className="flex items-center">
                        <img
                          src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
                          alt={member.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="ml-3">
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/members/${member.id}`}>
                          <Button variant="outline" size="sm">View</Button>
                        </Link>
                        <Button variant="outline" size="sm" onClick={() => handleRemoveMember(member.id.toString())}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showMemberModal && <MemberAssignmentModal />}
    </div>
  );
};

export default TrainerDetailsPage;

