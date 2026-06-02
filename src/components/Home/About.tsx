import { HomeStyles } from '@/styles';
import Link from 'next/link';

const About = () => {
  return (
    <div className={HomeStyles.card}>
      <h3 className={HomeStyles.heading}>About Us</h3>
      <p className={HomeStyles.text}>
        Since 2003, our family has brought an iconic piece of Mediterranean culture to Northern California. From the Bosphorus to the Golden Gate, our journey has always been a symbol of East meets West — bringing people together, one piece of baklava at a time.
      </p>
      <Link href="/about" className={HomeStyles.cta}>
        Our Story
      </Link>
    </div>
  );
};

export default About;
