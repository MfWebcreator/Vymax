import Image from 'next/image';
import Link from 'next/link';

interface LogoComponentProps {
  className?: string;
  width?: number;
  height?: number;
  showLink?: boolean;
}

export function LogoComponent({
  className = '',
  width = 120,
  height = 120,
  showLink = true,
}: LogoComponentProps) {
  const logoContent = (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <Image
        src="/brand/logo.png"
        alt="VeyroMax Official Logo"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  );

  if (showLink) {
    return (
      <Link href="/" className="inline-block transition-opacity hover:opacity-90">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
