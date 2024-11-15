import Image from 'next/image';
import { CSSProperties, useEffect, useState } from 'react';
import { Icons } from '../icons';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

const noImage = require('@lynx/assets/images/NoImage.svg').default;

export interface ILoaderImageProps {
  width?: number;
  height?: number;
  key?: string;
  src?: string | StaticImport;
  priority?: boolean;
  alt: string;
  className?: string;
  style?: CSSProperties;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  objectPosition?: string;
  sizes?: string;
  loadingType?: 'spin' | 'skeleton';
  cover?: boolean;
  round?: boolean;
  fill?: boolean;
  responsive?: boolean;
  onClick?: () => void;
}

export default function LoaderImages(props: ILoaderImageProps) {
  const { loadingType, cover, round, ...others } = props;
  const [images, setImage] = useState<string | StaticImport>(others.src || noImage);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    setImage(others.src || noImage);
  }, [others.src]);

  const styles: CSSProperties = {
    ...props.style,
    ...(cover ? { objectFit: 'cover' } : {}),
    ...(round ? { borderRadius: '50%' } : {}),
  };

  if (!mount) return <div />;

  return (
    <Image
      {...others}
      width={others.width || 0}
      height={others.height || 0}
      src={images}
      quality={50}
      alt={others.alt}
      {...(props.responsive ? { layout: 'responsive' } : {})}
      className={`${others.className} opacity-5 duration-[.5s]`}
      style={styles}
      onLoadingComplete={(image) => {
        image.classList.remove('opacity-5');
      }}
      onError={() => {
        setImage(noImage?.src);
      }}
    />
  );
}
