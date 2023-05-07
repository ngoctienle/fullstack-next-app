import Image from 'next/image'
import type { ImageProps } from 'next/image'

interface InterCImage extends ImageProps {
  display?: 'responsive' | 'intrinsic'
  alt: string
}

export default function CImage({
  src,
  alt,
  width,
  height,
  display = 'intrinsic',
  ...props
}: InterCImage) {
  if (display === 'responsive') {
    return (
      <Image
        fill
        src={src}
        alt={alt}
        title={alt}
        loading='lazy'
        placeholder='blur'
        blurDataURL={props.blurDataURL ?? '/blur.svg'}
        {...props}
      />
    )
  }

  if (Number(width) < 40 || Number(height) < 40) {
    return <Image src={src} alt={alt} title={alt} width={width} height={height} {...props} />
  }
  return (
    <Image
      src={src}
      alt={alt}
      title={alt}
      width={width}
      height={height}
      loading='lazy'
      placeholder='blur'
      blurDataURL={props.blurDataURL ?? '/blur.svg'}
      {...props}
    />
  )
}
