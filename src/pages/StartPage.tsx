import React from 'react';

export const StartPage: React.FC = () => {
  const paragraphs: Array<JSX.Element> = [];
  for (let i = 0; i < 10; ++i) {
    paragraphs.push(
      <p key={i}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum
        non ligula vel iaculis. Integer varius, sapien in elementum pulvinar,
        felis diam vulputate magna, sed ultricies urna enim quis quam.
        Pellentesque quis tincidunt ligula, a aliquet urna. Aenean tincidunt
        vestibulum pretium. Nullam augue nisi, sodales non nibh quis,
        consectetur commodo odio. Nam sagittis felis purus, molestie hendrerit
        ante vulputate ut. Sed sed arcu leo. Vestibulum lobortis leo at massa
        placerat consectetur. Duis ornare eros arcu, eget vulputate ligula
        consectetur eget. Etiam efficitur elit nec justo venenatis vulputate.
      </p>
    );
  }

  return (
    <div className="vstack m-2 md:m-10 p-2 md:p-5 bg-1-8 text-o-black rounded-md">
      <h1 className="font-bold">Make engrams for everything you want</h1>
      {paragraphs}
    </div>
  );
};
