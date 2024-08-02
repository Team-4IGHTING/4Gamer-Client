import { Text } from '@mantine/core';

import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { PageFrame } from '../components/Common/PageFrame/PageFrame.tsx';
// import { FeaturesCards } from '../components/FeaturesCards/FeaturesCards';

export function HomePage() {
  const homeBody = (
    <>
      <Welcome />
      {/* <FeaturesCards /> */}
      <ColorSchemeToggle />
    </>
  );

  const homeFooter = (
    <>
      <Text>4Gamer: From the gamer, Of the gamer, By the gamer, For the gamer.</Text>
    </>
  );

  return (
    <>
      <PageFrame
        bodyContent={homeBody}
        footerContent={homeFooter}
      />
    </>
  );
}
