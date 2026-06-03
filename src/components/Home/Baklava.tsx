import { HomeStyles } from '@/styles';
import Link from 'next/link';

const Baklava = () => {
  return (
    <div className={HomeStyles.card}>
      <h3 className={HomeStyles.heading}>Our Baklava</h3>
      <p className={HomeStyles.textSubtitle}>
        Love baklava but find it too sweet? So did we.
      </p>
      <p className={HomeStyles.text}>
       We craft our baklava with a delicate touch — made fresh and never too sweet. Our best kept secret: we let premium ingredients speak for themselves. The result is a baklava even non-believers reach for twice.
      </p>
      <Link href="/baklava" className={HomeStyles.cta}>
        Baklava
      </Link>
    </div>
  );
};

export default Baklava;
