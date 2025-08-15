interface RescueItemType {
  name: string;
  img: string;
  description: string;
}

const rescues: RescueItemType[] = [
  {
    name: '猫猫 1',
    img: 'https://daoinsights.com/wp-content/webp-express/webp-images/uploads/2022/03/anoir-chafik-2_3c4dIFYFU-unsplash-1870x1169.jpg.webp',
    description: 'asda',
  },
  {
    name: ' 狗子 2',
    img: 'https://d.newsweek.com/en/full/2050102/stray-cats.jpg?w=1200&f=7d728c9cbd5cd73470c100ff9cd51d59',
    description: 'asda',
  },
  {
    name: ' 老虎 3',
    img: 'https://media.4-paws.org/1/b/1/4/1b14c5ffc386210e11c20c5dd139b772af045503/VIER%20PFOTEN_2023-10-19_00181-3801x2534-3662x2534-1920x1329.jpg',
    description: 'asda',
  },
];
const RescueItem = (item: RescueItemType) => {
  return (
    <div className="p-4 mb-4 border-1 border-border rounded-md">
      <img
        src={item?.img}
        alt={item?.name}
        className="rounded-md w-full h-[80%] mb-3"
      />
      <p>{item?.name}</p>
      <p>{item?.description}</p>
    </div>
  );
};

const RecentRescue = () => {
  return (
    <div className="px-10 lg:px-20">
      <p className="mb-4">最佳救助</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {rescues?.map((item) => (
          <RescueItem {...item} key={item?.name} />
        ))}
      </div>
    </div>
  );
};

export default RecentRescue;
