import {BRAND_LOGO, BRAND_NAME} from '@/lib/brand';

export default function Head() {
  return (
    <>
      <title>{BRAND_NAME}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="icon" href={BRAND_LOGO}/>
    </>
  );
}
