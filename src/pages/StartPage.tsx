import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { useAppStore } from '@/state';
import { Button } from '@/components/library';
import { useProfile } from '@/query/queryHooks';
import { MiniCard } from '@/components/card';

import img from '@public/img/intervals.png';

export const StartPage: React.FC = () => {
  const { profile } = useProfile();
  const showLoginWindow = useAppStore((state) => state.showLoginWindow);
  const { t } = useTranslation();

  return (
    <div className="vstack text-o-black rounded-md">
      <div className="full center vstack">
        {/* {profile && <Redirect to={routes.profile.getUrl()} />}{' '} */}

        <div className="h-screen pt-28">
          <MiniCard
            className="bg-lime-200 ring-4"
            onClick={() =>
              document
                .getElementById('description')
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
          >
            <h1 className="text-4xl lg:text-6xl text-center my-6 font-bold">
              {t('startPage.title')}
            </h1>
          </MiniCard>
        </div>

        <div
          className={clsx(
            'h-screen pt-16 gap-6',
            'grid grid-cols-1 md:grid-cols-2',
            ''
          )}
        >
          <img
            className="rounded-lg shadow-lg"
            src={img}
            alt=""
            id="description"
          />
          <div className="vstack items-center justify-center">
            <p className="text-md lg:text-2xl text-center my-4 font-medium">
              {t('startPage.p1')}
            </p>
            <div className="around gap-x-2">
              <Button
                variant="plate-green"
                className={clsx(
                  'font-medium text-xl lg:text-2xl',
                  'px-4 py-1 md:py-2 md:px-6',
                  'rounded-3xl'
                )}
                onClick={showLoginWindow}
                title={t('startPage.join')}
                withShadow
                shadowBoxClassName="my-2 md:my-4 w-fit"
              >
                {t('startPage.join')}
              </Button>
              <Button
                variant="plate-yellow"
                className={clsx(
                  'font-medium text-xl lg:text-2xl',
                  'px-2 py-1 md:py-2 md:px-3',
                  'rounded-3xl'
                )}
                onClick={() =>
                  document
                    .getElementById('features')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                withShadow
                title={t('startPage.why')}
                shadowBoxClassName="my-2 md:my-4 w-fit"
              >
                {t('startPage.why')}
              </Button>
            </div>
          </div>
        </div>
        <div className="h-screen pt-40 w-full">
          <h2
            className="text-2xl lg:text-4xl text-center mb-10 font-bold"
            id="features"
          >
            Наши фишки
          </h2>
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <MiniCard className="bg-lime-200 ring-4">
              <span className="text-2xl lg:text-4xl font-semibold">
                Разметка
              </span>
            </MiniCard>
            <MiniCard className="bg-lime-200 ring-4">
              <span className="text-2xl lg:text-4xl font-semibold">Видео</span>
            </MiniCard>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MiniCard className="bg-lime-200 ring-4">
              <span className="text-2xl lg:text-4xl font-semibold">Фото</span>
            </MiniCard>
            <MiniCard className="bg-lime-200 ring-4">
              <span className="text-2xl lg:text-4xl font-semibold">Аудио</span>
            </MiniCard>
            <MiniCard className="bg-lime-200 ring-4">
              <span className="text-2xl lg:text-4xl font-semibold">
                Формулы
              </span>
            </MiniCard>
          </div>
        </div>
      </div>
    </div>
  );
};
