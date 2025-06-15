// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';
// import Input from '../../components/ui/Input';
// import Button from '../../components/ui/Button';
// import { Card } from '../../components/ui/Card';

// const AddGymOwnerPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     gymName: '',
//     location: '',
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Basic validation
//     const newErrors: Record<string, string> = {};
//     if (!formData.name) newErrors.name = 'Name is required';
//     if (!formData.email) newErrors.email = 'Email is required';
//     if (!formData.phone) newErrors.phone = 'Phone is required';
//     if (!formData.gymName) newErrors.gymName = 'Gym name is required';
//     if (!formData.location) newErrors.location = 'Location is required';

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     // Here you would normally make an API call to create the gym owner
//     // For demo purposes, we'll just navigate back
//     navigate('/admin/gym-owners');
//   };

//   return (
//     <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-6">
//         <Link to="/admin/gym-owners" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Gym Owners
//         </Link>
//       </div>

//       <Card className="p-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Gym Owner</h1>
        
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

//           <Input
//             label="Gym Name"
//             value={formData.gymName}
//             onChange={(e) => setFormData({ ...formData, gymName: e.target.value })}
//             error={errors.gymName}
//             placeholder="FitnessHub Elite"
//           />

//           <Input
//             label="Location"
//             value={formData.location}
//             onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//             error={errors.location}
//             placeholder="New York, NY"
//           />

//           <div className="flex justify-end space-x-4">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => navigate('/admin/gym-owners')}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant="primary">
//               Add Gym Owner
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default AddGymOwnerPage;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { supabase } from '../../context/supabaseClient'; // adjust the import path

const AddGymOwnerPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gymName: '',
    location: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.gymName) newErrors.gymName = 'Gym name is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.password || formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);

      // Step 1: Create the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError || !authData?.user) {
        alert('Auth Error: ' + authError?.message);
        return;
      }

      // Step 2: Insert profile in users table
      const { error: dbError } = await supabase.from('users').insert([
        {
          id: authData.user.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          gym_name: formData.gymName,
          location: formData.location,
          role: 'client',
        },
      ]);

      if (dbError) {
        alert('Database Error: ' + dbError.message);
        return;
      }

      alert('Gym Owner added successfully!');
      navigate('/admin/gym-owners');
    } catch (err) {
      console.error('Unexpected Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/admin/gym-owners" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gym Owners
        </Link>
      </div>

      <Card className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Gym Owner</h1>

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

          <Input
            label="Gym Name"
            value={formData.gymName}
            onChange={(e) => setFormData({ ...formData, gymName: e.target.value })}
            error={errors.gymName}
            placeholder="FitnessHub Elite"
          />

          <Input
            label="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            error={errors.location}
            placeholder="New York, NY"
          />

          <Input
            type="password"
            label="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
            placeholder="Minimum 6 characters"
          />

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/gym-owners')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Gym Owner'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddGymOwnerPage;
