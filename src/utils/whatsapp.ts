import toast from 'react-hot-toast';

export const sendMembershipExpiryMessage = (
  phone: string,
  name: string,
  joinDate?: string,
  membershipId?: string,
  memberships: any[] = []
) => {
  const membership = memberships.find((m) => String(m.id) === String(membershipId));

  if (!membership || !joinDate) {
    toast.error('Unable to generate message. Membership or join date missing.');
    return;
  }

  const join = new Date(joinDate);
  const dueDate = new Date(join);
  dueDate.setDate(dueDate.getDate() + Number(membership.duration || 0));

  const expiryDate = dueDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const message = `Hi ${name},
Just a quick reminder — your gym membership is set to expire on ${expiryDate}. Stay on track with your fitness goals by renewing your plan today! 💪
We’d love to see you continue your journey with us! 🏋️‍♂️✨`;
  const whatsappLink = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;

  window.open(whatsappLink, '_blank');
  toast.success(`Opening WhatsApp chat with ${name}`);
};
