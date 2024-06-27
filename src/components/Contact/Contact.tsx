'use client';

import { useAppSelector, useAppDispatch } from '@/lib';

const Contact = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData> ({
    firstName: '';
    lastName: '';
    email: '';
    phoneNumber: '';
    subject: '';
    description: '';
  })



  return <div>Hello Contact</div>;
};

export default Contact;
