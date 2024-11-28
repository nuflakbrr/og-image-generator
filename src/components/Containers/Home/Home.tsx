import { FC } from 'react';

import FormOgImage from './components/Form';

const ContainerHome: FC = () => {
  const year = new Date().getFullYear();

  return (
    <section className="max-w-3xl w-full mx-auto flex flex-col items-center justify-center min-h-screen gap-3">
      <FormOgImage />

      <span>
        &copy; {year} - Build with &#10084; by{' '}
        <a
          href="https://nuflakbrr.github.io/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Naufal Akbar Nugroho
        </a>
        .
      </span>
    </section>
  );
};

export default ContainerHome;
