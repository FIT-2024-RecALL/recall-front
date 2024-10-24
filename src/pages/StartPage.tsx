import { Card } from '@/components/Card';
import React from 'react';
import { Link } from 'wouter';

export const StartPage: React.FC = () => {
  return (
    <div className="vstack m-2 md:m-10 p-2 md:p-5 bg-1-8 text-o-black rounded-md">
      <h1 className="text-4xl text-center m-2 font-bold">
        Make engrams for everything you want
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2 center vstack">
          <p className="text-xl m-2">
            Товарищ! Ты вступаешь на путь знаний, где ошибка стоит дорого, а
            забывчивость — враг. Этот веб-приложение — не просто инструмент, а
            твой строгий учитель в освоении материала. Интервальные повторения —
            система, проверенная временем, и она не потерпит лености. Здесь
            каждый забытый факт — шаг к поражению, а регулярная работа — залог
            победы.
          </p>
          <p className="text-xl m-2">
            Запомни: здесь нет места хаосу и слабости. Приложение точно
            рассчитает, когда и что тебе нужно повторить, чтобы знания
            закрепились в твоей голове навечно. Неукоснительное следование
            рекомендациям — это твой долг.
          </p>
        </div>
        <img
          className="my-2 md:mx-2"
          src="https://avatars.dzeninfra.ru/get-zen_brief/7731634/pub_63204e7cc0fd3557a72bae3c_632070daa32fa40d99e6362a/scale_1200"
          alt="А ты уже?.."
        />
      </div>

      <Link className="text-2xl underline" to="/collections/edit/1">
        К карточкам!
      </Link>
    </div>
  );
};
